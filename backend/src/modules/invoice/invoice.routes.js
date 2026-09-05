import express from "express";
import { verifyToken, authorizeRoles } from "../../middlewares/auth.js";
import {
  createInvoice,
  getAllInvoices,
  getInvoiceById
} from "./invoice.controller.js";

const router = express.Router();

// Protected Routes
router.post(
  "/",
  verifyToken,
  authorizeRoles("ADMIN", "LANDLORD"),
  createInvoice
);

router.get(
  "/",
  verifyToken,
  getAllInvoices
);

router.get(
  "/:id",
  verifyToken,
  getInvoiceById
);

export default router;
