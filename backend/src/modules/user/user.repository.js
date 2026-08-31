import prisma from "../../config/db.js";

export const userRepository = {
  findManyUsers: async (where) => {
    return await prisma.user.findMany({
      where,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
        lastLogin: true,
        unitId: true,
        _count: {
          select: {
            properties: true,
          },
        },
      },
    });
  },

  findUserById: async (id) => {
    return await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });
  },

  findFullUserById: async (id) => {
    return await prisma.user.findUnique({ where: { id } });
  },

  findUnitById: async (id) => {
    return await prisma.unit.findUnique({ where: { id } });
  },

  createUser: async (data) => {
    return await prisma.user.create({ data });
  },

  createLandlord: async (data) => {
    return await prisma.user.create({ data });
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
        unitId: true,
        managedById: true,
      },
    });
  },

  updateUnitStatus: async (unitId, status) => {
    return await prisma.unit.update({
      where: { id: unitId },
      data: { status },
    });
  },

  deleteUser: async (id) => {
    return await prisma.user.delete({ where: { id } });
  },

  findUserByResetToken: async (token) => {
    return await prisma.user.findFirst({
      where: {
        resetToken: token,
        resetTokenExpires: { gt: new Date() },
      },
    });
  },

  setResetToken: async (id, token, expires) => {
    return await prisma.user.update({
      where: { id },
      data: { resetToken: token, resetTokenExpires: expires },
    });
  },
};