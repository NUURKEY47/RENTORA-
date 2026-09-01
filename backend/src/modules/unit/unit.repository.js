import prisma from "../../config/db.js";

export const unitRepository = {
  findPropertyById: async (id) => {
    return await prisma.property.findUnique({
      where: { id },
      include: { landlord: true },
    });
  },

  createUnit: async (data) => {
    return await prisma.unit.create({ 
      data,
      include: { property: true }
    });
  },

  findUnitById: async (id, includeProperty = false) => {
    return await prisma.unit.findUnique({
      where: { id },
      include: { property: includeProperty },
    });
  },

  updateUnit: async (id, data) => {
    return await prisma.unit.update({
      where: { id },
      data,
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
      },
    });
  },

  findManyUnits: async (where, includeProperty = false) => {
    return await prisma.unit.findMany({
      where,
      include: { 
        property: includeProperty ? { include: { landlord: true } } : false,
        tenants: { select: { id: true, name: true } }
      },
    });
  },

  deleteUnit: async (id) => {
    return await prisma.unit.delete({ where: { id } });
  },

findLandlordProperties: async (landlordId) => {
  return await prisma.property.findMany({
    where: { landlordId },
    select: { id: true },
  });
},

findLandlordById: async (id) => {
  return await prisma.user.findUnique({
    where: { id, role: "LANDLORD" }
  });
},

};