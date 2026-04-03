import express from "express";
import { verifyToken, authorizeRoles } from "../../middlewares/auth.js";
import { validate } from "../../middlewares/validateMiddleware.js";
import { updateSchema } from "../../validation/userSchemas.js";
import {
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
} from "./user.controller.js";

const router = express.Router();

router.get("/", verifyToken, authorizeRoles("ADMIN"), getAllUsers);
router.get("/:id", verifyToken, authorizeRoles("ADMIN"), getUserById);
router.put(
  "/:id",
  verifyToken,
  authorizeRoles("ADMIN"),
  validate(updateSchema),
  updateUserById,
);
router.delete("/:id", verifyToken, authorizeRoles("ADMIN"), deleteUserById);

export default router;
