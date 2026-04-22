import prisma from "../../config/db.js";

export const adminRepository = {
  countDashboardStats: async (managedById) => {
    const propertyWhere = managedById ? { landlord: { managedById } } : {};
    const unitWhere = managedById ? { property: { landlord: { managedById } } } : {};
    
    const [properties, units, landlords, tenants, unassigned] = await Promise.all([
      prisma.property.count({ where: propertyWhere }),
      prisma.unit.count({ where: unitWhere }),
      prisma.user.count({ 
        where: { 
          role: "LANDLORD",
          ...(managedById ? { managedById } : {})
        } 
      }),
      prisma.user.count({ 
        where: { 
          role: "TENANT",
          ...(managedById ? { managedById } : {})
        } 
      }),
      prisma.property.count({ where: { landlordId: null } }),
    ]);

    return { properties, units, landlords, tenants, unassigned };
  },

  findRecentTransactions: async (managedById, limit = 5) => {
    const where = managedById ? { user: { managedById } } : {};
    
    return await prisma.payment.findMany({
      where,
      take: limit,
      orderBy: { paymentDate: "desc" },
      include: {
        user: true,
        invoice: {
          include: {
            unit: {
              include: {
                property: true
              }
            }
          }
        }
      }
    });
  }
};
