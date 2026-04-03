import express from "express";
import { verifyToken, authorizeRoles } from "../../middlewares/auth.js";
import { validate } from "../../middlewares/validateMiddleware.js";
import { updateLandlordSchema, createLandlordSchema } from "../../validation/landlordSchemas.js";
import {
  createLandlord,
  updateLandlord,
  deleteLandlord,
  listLandlords,
  getLandlordById,
  getLandlordDashboard,
} from "./landlord.controller.js";

const router = express.Router();

router.post("/", verifyToken, authorizeRoles("ADMIN"), validate(createLandlordSchema), createLandlord);

router.get("/", verifyToken, authorizeRoles("LANDLORD", "ADMIN"), listLandlords);
router.get("/dashboard", verifyToken, authorizeRoles("LANDLORD"), getLandlordDashboard);
router.get("/:id", verifyToken, authorizeRoles("LANDLORD", "ADMIN"), getLandlordById);

// Update & Delete — admin-only (sub-admins restricted via service)
router.put("/:id", verifyToken, authorizeRoles("ADMIN"), validate(updateLandlordSchema), updateLandlord);
router.delete("/:id", verifyToken, authorizeRoles("ADMIN"), deleteLandlord);

export default router;