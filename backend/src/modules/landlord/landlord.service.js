import { landlordRepository } from "./landlord.repository.js";
import AppError from "../../utils/AppError.js";
import bcrypt from "bcrypt";

export const landlordService = {
  createLandlord: async (data, currentUser) => {
    // 1. Force the role to LANDLORD
    data.role = "LANDLORD";

    // 2. Link to the Admin who is creating them
    data.managedById = currentUser.id;

    // 3. Hash the password
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    return await landlordRepository.createLandlord(data);
  },

  listLandlords: async (user) => {
    const base = { role: "LANDLORD" };

    if (user.role === "LANDLORD")
      return landlordRepository.findManyLandlords({ ...base, id: user.id });

    if (user.role === "ADMIN" && user.managedById)
      return landlordRepository.findManyLandlords({
        ...base,
        managedById: user.id,
      });

    return landlordRepository.findManyLandlords(base); // super-admin
  },

  getLandlordById: async (id, user) => {
    const landlord = await landlordRepository.findUserById(id);
    if (!landlord || landlord.role !== "LANDLORD") {
      throw new AppError("Landlord not found", 404);
    }

    if (user.role === "LANDLORD" && landlord.id !== user.id) {
      throw new AppError("You can only view your own details", 403);
    } else if (
      user.role === "ADMIN" &&
      user.managedById &&
      landlord.managedById !== user.id
    ) {
      throw new AppError("You do not manage this landlord", 403);
    }

    return landlord;
  },

  updateLandlord: async (id, data, currentUser) => {
    const landlord = await landlordRepository.findUserById(id);
    if (!landlord || landlord.role !== "LANDLORD") {
      throw new AppError("Landlord not found", 404);
    }

    // Sub-admin can only update managed landlords
    if (
      currentUser.role === "ADMIN" &&
      currentUser.managedById &&
      landlord.managedById !== currentUser.id
    ) {
      throw new AppError("You do not manage this landlord", 403);
    }

    // Hash password if provided
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    // Prevent role change
    if (data.role && data.role !== "LANDLORD") {
      throw new AppError("Cannot change landlord role", 400);
    }

    return await landlordRepository.updateUser(id, data);
  },

  deleteLandlord: async (id, currentUser) => {
    const landlord = await landlordRepository.findUserById(id);
    if (!landlord || landlord.role !== "LANDLORD") {
      throw new AppError("Landlord not found", 404);
    }

    // Sub-admin can only delete managed landlords
    if (
      currentUser.role === "ADMIN" &&
      currentUser.managedById &&
      landlord.managedById !== currentUser.id
    ) {
      throw new AppError("You do not manage this landlord", 403);
    }

    // Check if landlord owns any properties
    const properties = await landlordRepository.findLandlordProperties(id);
    if (properties.length > 0) {
      throw new AppError(
        "Cannot delete landlord with assigned properties",
        400,
      );
    }

    await landlordRepository.deleteUser(id);
  },

  getLandlordDashboard: async (user) => {
    if (user.role !== "LANDLORD") {
      throw new AppError("Access denied - landlords only", 403);
    }
    const data = await landlordRepository.findLandlordDashboardData(user.id);
    const propertiesCount = data.length;
    const unitsCount = data.reduce((sum, p) => sum + p.units.length, 0);

    // Calculate unique tenants and occupied units
    const tenantIds = new Set();
    let occupiedUnitsCount = 0;
    data.forEach((p) => {
      p.units.forEach((u) => {
        if (u.tenantId) {
          tenantIds.add(u.tenantId);
          occupiedUnitsCount++;
        }
      });
    });

    return {
      properties: data,
      propertiesCount,
      unitsCount,
      tenantsCount: tenantIds.size,
      occupiedUnitsCount,
    };
  },
};
