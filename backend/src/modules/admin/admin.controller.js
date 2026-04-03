import { adminService } from "./admin.service.js";

export const adminController = {
  getDashboardStats: async (req, res) => {
    try {
      const dashboardData = await adminService.getDashboardStats(req.user);
      res.status(200).json({
        status: "success",
        data: dashboardData,
      });
    } catch (error) {
       res.status(error.statusCode || 500).json({
        status: "error",
        message: error.message || "Internal server error",
      });
    }
  },
};
