// src/modules/auth/auth.routes.js

import {
  registry,
  login,
  checkFirstAdmin,
} from "../../modules/auth/auth.controller.js";
import catchAsync from "../../utils/catchAsync.js";
import { validate } from "../../middlewares/validateMiddleware.js";
import { registerSchema, loginSchema } from "../../validation/authSchemas.js";

import express from "express";

const router = express.Router();

router.post("/login", validate(loginSchema), catchAsync(login));
router.post(
  "/registry",
  validate(registerSchema),
  checkFirstAdmin,
  catchAsync(registry),
);

export default router;
