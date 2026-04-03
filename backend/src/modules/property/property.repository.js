import prisma from "../../config/db.js";

export const propertyRepository = {
  findCategoryById: async (id) => {
    return await prisma.category.findUnique({ where: { id } });
  },

  findUserById: async (id) => {
    return await prisma.user.findUnique({ where: { id } });
  },

  createProperty: async (data) => {
    return await prisma.property.create({ 
      data,
      include: { landlord: { select: { id: true, name: true } } }
    });
  },

  findPropertyById: async (id) => {
    return await prisma.property.findUnique({ where: { id } });
  },

  updateProperty: async (id, data) => {
    return await prisma.property.update({
      where: { id },
      data,
      include: { landlord: { select: { id: true, name: true } } }
    });
  },

  updatePropertyLandlordId: async (propertyId, landlordId) => {
    return await prisma.property.update({
      where: { id: propertyId },
      data: { landlordId },
      include: { landlord: { select: { id: true, name: true } } }
    });
  },

  findManyProperties: async (where) => {
    return await prisma.property.findMany({ 
      where,
      include: { 
        landlord: { select: { id: true, name: true } },
        category: true
      }
    });
  },

  countUnitsByPropertyId: async (propertyId) => {
    return await prisma.unit.count({ where: { propertyId } });
  },

  deleteProperty: async (id) => {
    return await prisma.property.delete({ where: { id } });
  },
};