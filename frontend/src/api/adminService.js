import api from "./axios";

const adminService = {
  getDashboardStats: async () => {
    return await api.get("/admin/dashboard-stats");
  }
};

export default adminService;
