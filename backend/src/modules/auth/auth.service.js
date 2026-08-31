// src/modules/auth/auth.service.js

import { authRepository } from "./auth.repository.js";
import { userRepository } from "../user/user.repository.js";
import AppError from "../../utils/AppError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";

export const authService = {
  registry: async (data, currentUser) => {
    // If the person creating this user has an ID (i.e. is an Admin making a sub-admin/landlord), link them
    console.log(currentUser)
    if (currentUser && currentUser.id) {
      data.managedById = currentUser.id;
    }
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;

    if (!passwordRegex.test(data.password)) {
      throw new AppError("Password must be at least 8 characters long and include a number and special character", 400);
    }

    data.password = await bcrypt.hash(data.password, 10);
    const user = await authRepository.createUser(data);
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
        managedById: user.managedById || null,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );
    return { user, token };
  },

  login: async (email, password) => {
    const user = await authRepository.findUserByEmail(email);
    if (!user) {
      throw new AppError("Invalid email or password", 401);
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new AppError("Invalid email or password", 401);
    }
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
        managedById: user.managedById || null,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    // Record login time
    await authRepository.updateLastLogin(user.id);

    return { user, token };
  },

  checkFirstAdmin: async (role, token) => {
    const allowedRoles = ["ADMIN", "LANDLORD", "TENANT"];
    if (!role || !allowedRoles.includes(role)) {
      throw new AppError("Invalid or missing role", 401);
    }

    // Role-specific token verification
    if (role === "ADMIN") {
      const adminCount = await authRepository.countAdmins();
      if (adminCount === 0) {
        return null; // First admin, no token needed
      }

      if (!token) {
        throw new AppError("Token required to create new admin", 401);
      }

      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.role !== "ADMIN") {
          throw new AppError("Only admins can create new admins", 401);
        }
        return decoded;
      } catch (error) {
        throw new AppError("Invalid or expired token", 401);
      }
    }

    // For LANDLORD or TENANT: Registration is public, but we capture the token
    // if an Admin is logged in and creating the user.
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
      } catch (error) {
        return null; // Invalid token? Treat as guest/public registration
      }
    }

    return null; // Guest registration
  },

  forgotPassword: async (email) => {
    const user = await authRepository.findUserByEmail(email);
    // Generic response to prevent user enumeration
    if (!user) {
      return { message: "If an account with that email exists, a password reset link has been generated." };
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    const expires = new Date(Date.now() + 3600000); // 1 hour

    await userRepository.setResetToken(user.id, hashedToken, expires);

    return {
      message: "If an account with that email exists, a password reset link has been generated.",
      resetToken, // Returned for testing / email delivery
    };
  },

  resetPassword: async (token, newPassword) => {
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const user = await userRepository.findUserByResetToken(hashedToken);

    if (!user) {
      throw new AppError("Invalid or expired password reset token", 400);
    }

    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      throw new AppError("New password must be at least 8 characters long and include a number and special character", 400);
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await userRepository.updateUser(user.id, {
      password: hashedPassword,
      resetToken: null,
      resetTokenExpires: null,
    });

    return { message: "Password has been reset successfully" };
  },
};
