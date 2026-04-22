import prisma from "../../config/db.js";

export const categoryRepository = {
  findAll: async () => {
    return await prisma.category.findMany({
      orderBy: { name: 'asc' }
    });
  }
};
