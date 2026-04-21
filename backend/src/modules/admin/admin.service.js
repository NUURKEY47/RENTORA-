import { adminRepository } from "./admin.repository.js";

export const adminService = {
  getDashboardStats: async (user) => {
    // If the admin is managedById (sub-admin), only count their portfolio
    const managedById = user.role === "ADMIN" && user.managedById ? user.id : null;
    
    const stats = await adminRepository.countDashboardStats(managedById);
    const transactions = await adminRepository.findRecentTransactions(managedById);

    return {
      stats: {
        totalProperties: { 
          value: stats.properties, 
          trend: 0, 
          isPositive: true 
        },
        totalUnits: { 
          value: stats.units, 
          trend: 0, 
          isPositive: true 
        },
        activeLandlords: { 
          value: stats.landlords, 
          trend: 0, 
          isPositive: true 
        },
        activeTenants: { 
          value: stats.tenants, 
          trend: 0, 
          isPositive: true 
        },
      },
      recentTransactions: transactions.map(t => ({
        id: t.id,
        tenant: t.user.name,
        property: t.invoice?.unit?.property?.name || "N/A",
        date: t.paymentDate,
        amount: t.amount,
        status: "PAID",
      })),
      portfolioGrowth: []
    };
  }
};
