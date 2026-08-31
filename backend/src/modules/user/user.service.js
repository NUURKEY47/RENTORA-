import { userRepository } from "./user.repository.js";
import AppError from "../../utils/AppError.js";
import bcrypt from "bcrypt";

export const userService = {
  getAllUsers: async (query, user) => {
    const where = {};

    if (query.role) {
      where.role = query.role;
    }

    if (query.email) {
      where.email = {
        contains: query.email,
        mode: "insensitive",
      };
    }

    console.log(where);

    // Sub-admin restriction
    if (user.role === "ADMIN" && user.managedById) {
      where.managedById = user.id;
    }

    return await userRepository.findManyUsers(where);
  },

  getUserById: async (id, user) => {
    const foundUser = await userRepository.findUserById(id);
    if (!foundUser) {
      throw new AppError("User not found", 404);
    }

    if (
      user.role === "ADMIN" &&
      user.managedById &&
      foundUser.managedById !== user.id
    ) {
      throw new AppError("You do not manage this user", 403);
    }

    return foundUser;
  },

  updateUserById: async (id, data, currentUser) => {
    const existingUser = await userRepository.findFullUserById(id);
    if (!existingUser) {
      throw new AppError("User not found", 404);
    }

    // Security: Sub-admins can only update users they manage
    if (
      currentUser.role === "ADMIN" &&
      currentUser.managedById &&
      existingUser.managedById !== currentUser.id
    ) {
      throw new AppError("You do not manage this user", 403);
    }

    // Security: Sub-admins cannot reassign users
    if (
      data.managedById &&
      currentUser.role === "ADMIN" &&
      currentUser.managedById
    ) {
      throw new AppError("Only super-admin can assign or reassign users", 403);
    }

    // Block role change (can only be done by super-admin if needed)
    if (data.role && data.role !== existingUser.role) {
      throw new AppError("Role change not allowed", 403);
    }

    // managedById assignment validation
    if (data.managedById && currentUser.role === "ADMIN") {
      if (existingUser.role !== "LANDLORD" && existingUser.role !== "ADMIN") {
        throw new AppError("Can only assign managedById to landlords", 400);
      }
    }

    // Tenant assignment logic
    if (
      data.unitId &&
      (data.role === "TENANT" || existingUser.role === "TENANT")
    ) {
      const unitId = parseInt(data.unitId);
      if (isNaN(unitId)) {
        throw new AppError("Invalid unit ID", 400);
      }

      const unit = await userRepository.findUnitById(unitId);
      if (!unit) {
        throw new AppError("Unit not found", 404);
      }

      if (unit.status !== "available") {
        throw new AppError("Unit is not available for assignment", 400);
      }

      if (
        data.status &&
        !["active", "inactive", "pending"].includes(data.status)
      ) {
        throw new AppError("Invalid status value", 422);
      }

      data.unitId = unitId;
      await userRepository.updateUnitStatus(unitId, "occupied");
    }

    // Hash password if provided
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    return await userRepository.updateUser(id, data);
  },

  deleteUserById: async (id, currentUser) => {
    const user = await userRepository.findFullUserById(id);
    if (!user) {
      throw new AppError("User not found", 404);
    }

    if (
      currentUser.role === "ADMIN" &&
      currentUser.managedById &&
      user.managedById !== currentUser.id
    ) {
      throw new AppError("You do not manage this user", 403);
    }

    await userRepository.deleteUser(id);
  },

  updateProfile: async (userId, data) => {
    const user = await userRepository.findUserById(userId);
    if (!user) throw new AppError("User not found", 404);

    if (data.email && data.email !== user.email) {
      const existing = await userRepository.findManyUsers({ email: data.email });
      if (existing.length > 0) throw new AppError("Email is already taken", 400);
    }

    return await userRepository.updateUser(userId, { name: data.name, email: data.email });
  },

  changePassword: async (userId, { oldPassword, newPassword }) => {
    const user = await userRepository.findFullUserById(userId);
    if (!user) throw new AppError("User not found", 404);

    const isValid = await bcrypt.compare(oldPassword, user.password);
    if (!isValid) throw new AppError("Current password is incorrect", 400);

    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      throw new AppError("New password must be at least 8 characters long and include a number and special character", 400);
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await userRepository.updateUser(userId, { password: hashedPassword });
    return { message: "Password updated successfully" };
  },
};
