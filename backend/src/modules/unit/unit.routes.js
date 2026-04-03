// src/modules/unit/unit.routes.js (create file)

import express from "express";
import { verifyToken, authorizeRoles } from "../../middlewares/auth.js";
import catchAsync from "../../utils/catchAsync.js";
import { validate } from "../../middlewares/validateMiddleware.js";
import {
  createUnitSchema,
  updateUnitSchema,
} from "../../validation/unitSchemas.js";
import {
  createUnit,
  updateUnit,
  getUnitById,
  listUnits,
  deleteUnit,
} from "./unit.controller.js";

const router = express.Router();

router.post(
  "/",
  verifyToken,
  authorizeRoles("LANDLORD", "ADMIN"),
  validate(createUnitSchema),
  catchAsync(createUnit)
);
router.put(
  "/:id",
  verifyToken,
  authorizeRoles("LANDLORD", "ADMIN"),
  validate(updateUnitSchema),
  catchAsync(updateUnit)
);
router.get(
  "/:id",
  verifyToken,
  authorizeRoles("LANDLORD", "ADMIN", "TENANT"),
  catchAsync(getUnitById) // New handler
);
router.get(
  "/",
  verifyToken,
  authorizeRoles("LANDLORD", "ADMIN", "TENANT"),
  catchAsync(listUnits)
);
router.delete(
  "/:id",
  verifyToken,
  authorizeRoles("LANDLORD", "ADMIN"),
  catchAsync(deleteUnit)
);

export default router;
