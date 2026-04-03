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
          trend: 12, // Mocked trend
          isPositive: true 
        },
        totalUnits: { 
          value: stats.units, 
          trend: 5, 
          isPositive: true 
        },
        activeLandlords: { 
          value: stats.landlords, 
          trend: -2, 
          isPositive: false 
        },
        activeTenants: { 
          value: stats.tenants, 
          trend: 18, 
          isPositive: true 
        },
      },
      recentTransactions: transactions.map(t => ({
        id: t.id,
        tenant: t.user.name,
        property: t.invoice?.unit?.property?.name || "N/A",
        date: t.paymentDate,
        amount: t.amount,
        status: "PAID", // Payments are by definition paid
      })),
      portfolioGrowth: [
        { month: "Jan", value: 45 },
        { month: "Feb", value: 52 },
        { month: "Mar", value: 48 },
        { month: "Apr", value: 61 },
        { month: "May", value: 55 },
        { month: "Jun", value: 67 },
        { month: "Jul", value: 72 },
        { month: "Aug", value: 68 },
        { month: "Sep", value: 78 },
        { month: "Oct", value: 85 },
        { month: "Nov", value: 82 },
        { month: "Dec", value: 91 },
      ]
    };
  }
};
