import { unitRepository } from "./unit.repository.js";
import AppError from "../../utils/AppError.js";
import prisma from "../../config/db.js";

export const unitService = {
  createUnit: async (data, user) => {
    let finalPropertyId = null;

    if (user.role === "ADMIN") {
      if (!data.propertyId) {
        throw new AppError("Property ID is required for admins", 400);
      }

      const property = await unitRepository.findPropertyById(data.propertyId);
      if (!property) {
        throw new AppError("Property not found", 404);
      }

      // Check if Sub-Admin manages the property's landlord
      if (user.managedById) {
        if (!property.landlord || property.landlord.managedById !== user.id) {
          throw new AppError("You do not manage this property's landlord", 403);
        }
      }

      // Optional: prevent assigning to unowned property
      if (!property.landlordId) {
        throw new AppError("Property must have a landlord assigned", 400);
      }

      finalPropertyId = data.propertyId;
    } else if (user.role === "LANDLORD") {
      if (data.propertyId) {
        const property = await unitRepository.findPropertyById(data.propertyId);
        if (!property) {
          throw new AppError("Property not found", 404);
        }
        if (property.landlordId !== user.id) {
          throw new AppError("You do not own this property", 403);
        }
        finalPropertyId = data.propertyId;
      } else {
        const landlordProperties = await unitRepository.findLandlordProperties(user.id);

        if (landlordProperties.length === 0) {
          throw new AppError("You have no properties. Create one first.", 400);
        }

        finalPropertyId = landlordProperties[0].id; // first property
      }
    }

    // Validate status
    if (data.status && !["available", "occupied"].includes(data.status)) {
      throw new AppError("Invalid unit status", 400);
    }

    const unitData = { ...data, propertyId: finalPropertyId };
    return await unitRepository.createUnit(unitData);
  },

  updateUnit: async (id, data, user) => {
    const existingUnit = await unitRepository.findUnitById(id, true);
    if (!existingUnit) {
      throw new AppError("Unit not found", 404);
    }

    if (user.role === "LANDLORD" && existingUnit.property.landlordId !== user.id) {
      throw new AppError("You do not own this unit", 403);
    } else if (user.role === "ADMIN" && user.managedById) {
      if (existingUnit.property.landlordId) {
        const landlord = await unitRepository.findLandlordById(existingUnit.property.landlordId);
        if (!landlord || landlord.managedById !== user.id) {
          throw new AppError("You do not manage this unit's landlord", 403);
        }
      } else {
        throw new AppError("Only super-admins can manage unassigned units", 403);
      }
    }

    // ADVANCED BACKEND CONCEPT: Automatic Tenant Detachment on Unit Vacate (Interactive Transaction)
    if (data.status === "available") {
      return await prisma.$transaction(async (tx) => {
        // 1. Detach all tenants from this unit (set unitId = null)
        await tx.user.updateMany({
          where: { unitId: id },
          data: { unitId: null }
        });

        // 2. Update unit status and disconnect tenant relations
        return await tx.unit.update({
          where: { id },
          data: { ...data, tenants: { set: [] } },
          select: {
            id: true,
            name: true,
            price: true,
            status: true,
            unitType: true,
            listingType: true,
            size: true,
            description: true,
            propertyId: true,
          }
        });
      });
    }

    return await unitRepository.updateUnit(id, data);
  },

  getUnitById: async (id, user) => {
    const unit = await unitRepository.findUnitById(id, true);
    if (!unit) {
      throw new AppError("Unit not found", 404);
    }

    if (user.role === "LANDLORD" && unit.property.landlordId !== user.id) {
      throw new AppError("You do not own this unit", 403);
    }

    return unit;
  },

  listUnits: async (query, user) => {
    const where = {};

    if (user.role === "LANDLORD") {
      where.property = { landlordId: user.id };
    } else if (user.role === "ADMIN" && user.managedById) {
      where.property = { landlord: { managedById: user.id } };
    } else if (user.role === "TENANT") {
      // Filter units where the logged-in user is one of the tenants
      where.tenants = { some: { id: user.id } };
    }

    if (query.propertyId) {
      const propId = parseInt(query.propertyId);
      if (isNaN(propId)) {
        throw new AppError("Invalid property ID", 400);
      }
      where.propertyId = propId;
    }

    if (query.status) {
      where.status = query.status;
    }

    if (query.unitType) {
      where.unitType = query.unitType;
    }

    if (query.listingType) {
      where.listingType = query.listingType;
    }

    return await unitRepository.findManyUnits(where, true);
  },

  deleteUnit: async (id, user) => {
    const existingUnit = await unitRepository.findUnitById(id, true);
    if (!existingUnit) {
      throw new AppError("Unit not found", 404);
    }

    if (user.role === "LANDLORD" && existingUnit.property.landlordId !== user.id) {
      throw new AppError("You do not own this unit", 403);
    } else if (user.role === "ADMIN" && user.managedById) {
      if (existingUnit.property.landlordId) {
        const landlord = await unitRepository.findLandlordById(existingUnit.property.landlordId);
        if (!landlord || landlord.managedById !== user.id) {
          throw new AppError("You do not manage this unit's landlord", 403);
        }
      } else {
        throw new AppError("Only super-admins can manage unassigned units", 403);
      }
    }

    if (existingUnit.status === "occupied") {
      throw new AppError("Cannot delete occupied unit", 400);
    }

    await unitRepository.deleteUnit(id);
  },
};