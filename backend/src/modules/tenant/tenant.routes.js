import express from "express";
import { verifyToken, authorizeRoles } from "../../middlewares/auth.js";
import { validate } from "../../middlewares/validateMiddleware.js";
import { createTenantSchema, assignToUnitSchema } from "../../validation/tenantSchemas.js";
import {
    createTenant,
    assignToUnit,
    listTenants,
    getTenantById,
    getTenantDashboard,
    updateTenant,
    deleteTenant,
} from "./tenant.controller.js";

const router = express.Router();

router.post("/", verifyToken, authorizeRoles("ADMIN", "LANDLORD"), validate(createTenantSchema), createTenant);
router.put("/:id/assign-unit", verifyToken, authorizeRoles("ADMIN", "LANDLORD"), validate(assignToUnitSchema), assignToUnit);
router.get("/", verifyToken, authorizeRoles("ADMIN", "LANDLORD", "TENANT"), listTenants);
router.get("/dashboard", verifyToken, authorizeRoles("TENANT"), getTenantDashboard);
router.get("/:id", verifyToken, authorizeRoles("ADMIN", "LANDLORD", "TENANT"), getTenantById);
router.put("/:id", verifyToken, authorizeRoles("ADMIN", "LANDLORD"), updateTenant);
router.delete("/:id", verifyToken, authorizeRoles("ADMIN", "LANDLORD"), deleteTenant);

export default router;