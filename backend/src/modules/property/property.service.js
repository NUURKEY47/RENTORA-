import { propertyRepository } from "./property.repository.js";
import AppError from "../../utils/AppError.js";

export const propertyService = {
  createProperty: async (data, user) => {
    if (user.role === "LANDLORD") {
      data.landlordId = user.id; // must be set
    } else if (user.role === "ADMIN") {
      if (user.managedById) {
        // Sub-admin: landlordId is REQUIRED
        if (!data.landlordId) {
          throw new AppError("Landlord ID is required for sub-admins", 400);
        }
        const landlord = await propertyRepository.findUserById(data.landlordId);
        if (!landlord || landlord.role !== "LANDLORD" || landlord.managedById !== user.id) {
          throw new AppError("You can only create properties for landlords you manage", 403);
        }
      } else {
        // Super-admin: landlordId is optional
        if (data.landlordId) {
          const landlord = await propertyRepository.findUserById(data.landlordId);
          if (!landlord || landlord.role !== "LANDLORD") {
            throw new AppError("Invalid landlord ID", 400);
          }
        }
      }
    }

    const category = await propertyRepository.findCategoryById(data.categoryId);
    if (!category) {
      throw new AppError("Category not found", 404);
    }

    return await propertyRepository.createProperty(data);
  },

  assignLandlord: async (propertyId, landlordId, currentUser) => {
    const property = await propertyRepository.findPropertyById(propertyId);
    if (!property) {
      throw new AppError("Property not found", 404);
    }

    const landlord = await propertyRepository.findUserById(landlordId);
    if (!landlord || landlord.role !== "LANDLORD") {
      throw new AppError("Invalid landlord", 400);
    }

    // Sub-admin management check
    if (currentUser.role === "ADMIN" && currentUser.managedById) {
      if (landlord.managedById !== currentUser.id) {
        throw new AppError("You do not manage this landlord", 403);
      }
    }

    return await propertyRepository.updatePropertyLandlordId(
      propertyId,
      landlordId,
    );
  },

  updateProperty: async (id, data, user) => {
    const existing = await propertyRepository.findPropertyById(id);
    if (!existing) {
      throw new AppError("Property not found", 404);
    }

    if (user.role === "LANDLORD" && existing.landlordId !== user.id) {
      throw new AppError("You do not own this property", 403);
    } else if (user.role === "ADMIN" && user.managedById) {
      // Sub-admin check
      if (existing.landlordId) {
        const landlord = await propertyRepository.findUserById(
          existing.landlordId,
        );
        if (!landlord || landlord.managedById !== user.id) {
          throw new AppError("You do not manage this property's landlord", 403);
        }
      } else {
        // Unassigned property: only super-admin can update?
        // Or sub-admin can update if they created it?
        // For now, let's say only super-admin can manage unassigned ones.
        throw new AppError(
          "Only super-admins can manage unassigned properties",
          403,
        );
      }
    }

    if (data.categoryId) {
      const category = await propertyRepository.findCategoryById(
        data.categoryId,
      );
      if (!category) {
        throw new AppError("Category not found", 404);
      }
    }

    return await propertyRepository.updateProperty(id, data);
  },

  getProperties: async (query, user) => {
    const where = {};

    if (user.role === "LANDLORD") {
      where.landlordId = user.id;
    } else if (user.role === "ADMIN" && user.managedById) {
      where.landlord = { managedById: user.id };
    } else if (user.role === "TENANT") {
      where.units = { some: { tenants: { some: { id: user.id } } } };
    }

    if (query.location) {
      where.location = { contains: query.location, mode: "insensitive" };
    }

    if (query.categoryId) {
      const catId = parseInt(query.categoryId);
      if (isNaN(catId)) throw new AppError("Invalid category ID", 400);
      where.categoryId = catId;
    }

    return await propertyRepository.findManyProperties(where);
  },

  getPropertyById: async (id, user) => {
    const property = await propertyRepository.findPropertyById(id);
    if (!property) {
      throw new AppError("Property not found", 404);
    }

    if (user.role === "LANDLORD" && property.landlordId !== user.id) {
      throw new AppError("You do not own this property", 403);
    }

    return property;
  },

  deleteProperty: async (id, user) => {
    const existing = await propertyRepository.findPropertyById(id);
    if (!existing) {
      throw new AppError("Property not found", 404);
    }

    if (user.role === "LANDLORD" && existing.landlordId !== user.id) {
      throw new AppError("You do not own this property", 403);
    } else if (user.role === "ADMIN" && user.managedById) {
      if (existing.landlordId) {
        const landlord = await propertyRepository.findUserById(
          existing.landlordId,
        );
        if (!landlord || landlord.managedById !== user.id) {
          throw new AppError("You do not manage this property's landlord", 403);
        }
      } else {
        throw new AppError(
          "Only super-admins can manage unassigned properties",
          403,
        );
      }
    }

    const unitCount = await propertyRepository.countUnitsByPropertyId(id);
    if (unitCount > 0) {
      throw new AppError("Cannot delete property with associated units", 400);
    }

    await propertyRepository.deleteProperty(id);
  },
};

// i want to use the controller->service->repository format
