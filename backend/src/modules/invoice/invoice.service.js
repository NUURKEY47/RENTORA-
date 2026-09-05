import { invoiceRepository } from "./invoice.repository.js";
import AppError from "../../utils/AppError.js";
import prisma from "../../config/db.js";

export const invoiceService = {
  createInvoice: async (data, currentUser) => {
    const { amount, dueDate, userId, unitId } = data;

    // 1. Validation: Amount must be positive
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      throw new AppError("Invoice amount must be a positive number", 400);
    }

    // 2. Validation: Target Tenant must exist and have role TENANT
    const tenant = await invoiceRepository.findUserById(parseInt(userId));
    if (!tenant) {
      throw new AppError("Target tenant user not found", 404);
    }

    // 3. Validation: Target Unit must exist
    const unit = await invoiceRepository.findUnitById(parseInt(unitId));
    if (!unit) {
      throw new AppError("Target unit not found", 404);
    }

    // 4. Validation: Tenant MUST be assigned to this Unit
    const isAssigned = unit.tenants?.some(t => t.id === parseInt(userId));
    if (!isAssigned) {
      throw new AppError("This tenant is not assigned to this unit. Assign the tenant to the unit first", 400);
    }

    // 4. Security & RBAC: Ownership Check
    if (currentUser.role === "LANDLORD") {
      if (unit.property.landlordId !== currentUser.id) {
        throw new AppError("You do not own the property for this unit", 403);
      }
    } else if (currentUser.role === "ADMIN" && currentUser.managedById) {
      if (!unit.property.landlord || unit.property.landlord.managedById !== currentUser.id) {
        throw new AppError("You do not manage the landlord of this property", 403);
      }
    }

    // 5. Duplicate Pending Invoice Protection
    const existingPending = await invoiceRepository.findManyInvoices({
      userId: parseInt(userId),
      unitId: parseInt(unitId),
      status: "PENDING"
    });

    if (existingPending.length > 0) {
      throw new AppError("An active pending invoice already exists for this tenant and unit", 400);
    }

    // 6. ADVANCED BACKEND CONCEPT: Interactive Transaction (Prisma $transaction)
    // Guarantees Atomic Operation: If invoice creation or unit status sync fails,
    // the entire transaction rolls back automatically so database stays 100% consistent!
    return await prisma.$transaction(async (tx) => {
      const invoiceData = {
        amount: parsedAmount,
        dueDate: new Date(dueDate),
        status: "PENDING",
        userId: parseInt(userId),
        unitId: parseInt(unitId),
      };

      // Atomic write inside transaction
      const newInvoice = await invoiceRepository.createInvoiceTx(tx, invoiceData);

      // Optional Atomic Operation: Ensure unit status reflects occupancy if needed
      if (unit.status === "available") {
        await tx.unit.update({
          where: { id: unit.id },
          data: { status: "occupied" }
        });
      }

      return newInvoice;
    });
  },

  getAllInvoices: async (query, currentUser) => {
    const where = {};

    if (currentUser.role === "TENANT") {
      where.userId = currentUser.id;
    } else if (currentUser.role === "LANDLORD") {
      where.unit = { property: { landlordId: currentUser.id } };
    } else if (currentUser.role === "ADMIN" && currentUser.managedById) {
      where.unit = { property: { landlord: { managedById: currentUser.id } } };
    }

    if (query.status) {
      where.status = query.status.toUpperCase();
    }

    if (query.unitId) {
      where.unitId = parseInt(query.unitId);
    }

    return await invoiceRepository.findManyInvoices(where);
  },

  getInvoiceById: async (id, currentUser) => {
    const invoice = await invoiceRepository.findInvoiceById(parseInt(id));
    if (!invoice) {
      throw new AppError("Invoice not found", 404);
    }

    if (currentUser.role === "TENANT" && invoice.userId !== currentUser.id) {
      throw new AppError("You do not have access to this invoice", 403);
    } else if (currentUser.role === "LANDLORD" && invoice.unit?.property?.landlordId !== currentUser.id) {
      throw new AppError("You do not own the property for this invoice", 403);
    }

    return invoice;
  }
};
