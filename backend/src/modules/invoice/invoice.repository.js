import prisma from "../../config/db.js";

export const invoiceRepository = {
  findUserById: async (id) => {
    return await prisma.user.findUnique({
      where: { id },
      select: { id: true, name: true, email: true, role: true }
    });
  },

  findUnitById: async (id) => {
    return await prisma.unit.findUnique({
      where: { id },
      include: {
        tenants: { select: { id: true } },
        property: {
          include: {
            landlord: { select: { id: true, name: true, managedById: true } }
          }
        }
      }
    });
  },

  // Basic Create Operation
  createInvoice: async (data) => {
    return await prisma.invoice.create({
      data,
      include: {
        user: { select: { id: true, name: true, email: true } },
        unit: { select: { id: true, name: true, price: true } }
      }
    });
  },

  // Interactive Transaction & Atomic Operation (tx parameter passed from Service)
  createInvoiceTx: async (tx, data) => {
    return await tx.invoice.create({
      data,
      include: {
        user: { select: { id: true, name: true, email: true } },
        unit: { select: { id: true, name: true, price: true } }
      }
    });
  },

  findManyInvoices: async (where) => {
    return await prisma.invoice.findMany({
      where,
      include: {
        user: { select: { id: true, name: true, email: true } },
        unit: {
          select: {
            id: true,
            name: true,
            price: true,
            property: { select: { id: true, name: true } }
          }
        },
        payments: true
      },
      orderBy: { createdAt: 'desc' }
    });
  },

  findInvoiceById: async (id) => {
    return await prisma.invoice.findUnique({
      where: { id },
      include: {
        user: { select: { id: true, name: true, email: true } },
        unit: { include: { property: true } },
        payments: true
      }
    });
  },

  updateInvoiceStatus: async (id, status) => {
    return await prisma.invoice.update({
      where: { id },
      data: { status }
    });
  }
};
