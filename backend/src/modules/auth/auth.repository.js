import prisma from "../../config/db.js";

export const authRepository = {
  createUser: async (data) => {
    return await prisma.user.create({ data });
  },

  findUserByEmail: async (email) => {
    return await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        role: true,
        managedById: true  // ← force include (fixes undefined)
      }
    });
  },

  countAdmins: async () => {
    return await prisma.user.count({ where: { role: "ADMIN" } });
  },

  updateLastLogin: async (userId) => {
    return await prisma.user.update({
      where: { id: userId },
      data: { lastLogin: new Date() },
    });
  },
};