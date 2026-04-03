import express from "express";
import { adminController } from "./admin.controller.js";
import { verifyToken, authorizeRoles } from "../../middlewares/auth.js";

const router = express.Router();

router.get(
  "/dashboard-stats", 
  verifyToken, 
  authorizeRoles("ADMIN"), 
  adminController.getDashboardStats
);

export default router;
