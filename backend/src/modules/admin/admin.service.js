// src/modules/admin/admin.service.js

import { adminRepository } from "./admin.repository.js";

export const adminService = {
  getDashboardStats: async (user) => {
    // If the admin is a sub-admin (has managedById), only count their portfolio
    const managedById = user.role === "ADMIN" && user.managedById ? user.id : null;
    
    const stats = await adminRepository.countDashboardStats(managedById);
    const transactions = await adminRepository.findRecentTransactions(managedById);

    // Aligning the response perfectly with the Dashboard.jsx frontend
    return {
      properties: stats.properties,
      units: stats.units,
      landlords: stats.landlords,
      tenants: stats.tenants,
      recentTransactions: transactions // The repository already includes user and invoice relations
    };
  }
};
