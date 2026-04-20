import prisma from "../../config/db.js";

export const landlordRepository = {
  findUserById: async (id) => {
    return await prisma.user.findUnique({ where: { id } });
  },

  createLandlord: async (data) => {
    return await prisma.user.create({ data });
  },

  findManyLandlords: async (where) => {
    console.log("Executing query with where:", where);
    return await prisma.user.findMany({
      where,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        manager: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  },

  updateUser: async (id, data) => {
    return await prisma.user.update({
      where: { id },
      data,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });
  },

  deleteUser: async (id) => {
    return await prisma.user.delete({ where: { id } });
  },

  findLandlordProperties: async (landlordId) => {
    return await prisma.property.findMany({
      where: { landlordId },
    });
  },

  findLandlordDashboardData: async (landlordId) => {
    return await prisma.property.findMany({
      where: { landlordId },
      include: {
        units: {
          include: {
            tenants: true,
          },
        },
      },
    });
  },
};