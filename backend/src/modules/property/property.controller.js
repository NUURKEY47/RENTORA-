// import prisma from "../../config/db.js";
import AppError from "../../utils/AppError.js";
import { propertyService } from "./property.service.js";
import sendResponse from "../../utils/sendResponse.js";

// i want to use the controller->service->repository format

export const createProperty = async (req, res, next) => {
  try {
    const property = await propertyService.createProperty(req.body, req.user);
    sendResponse(res, {
      statusCode: 201,
      message: "Property created successfully",
      data: property,
    });
  } catch (error) {
    next(error);
  }
};

export const assignLandlord = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id) || id <= 0) {
      return next(new AppError("Invalid property ID", 400));
    }
    const { landlordId } = req.body;
    const updated = await propertyService.assignLandlord(id, parseInt(landlordId), req.user);
    sendResponse(res, {
      message: "Landlord assigned to property successfully",
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

export const updatePropertyById = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const updatedProperty = await propertyService.updateProperty(
      id,
      req.body,
      req.user,
    );
    sendResponse(res, {
      message: "Property updated successfully",
      data: updatedProperty,
    });
  } catch (error) {
    next(error);
  }
};

export const getProperty = async (req, res, next) => {
  try {
    const properties = await propertyService.getProperties(req.query, req.user);
    sendResponse(res, {
      message: "Properties fetched successfully",
      data: properties,
    });
  } catch (error) {
    next(error);
  }
};

export const getPropertyById = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const property = await propertyService.getPropertyById(id, req.user);
    sendResponse(res, {
      message: "Property fetched successfully",
      data: property,
    });
  } catch (error) {
    next(error);
  }
};

export const deletePropertyById = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    await propertyService.deleteProperty(id, req.user);
    sendResponse(res, { message: "Property deleted successfully" });
  } catch (error) {
    next(error);
  }
};
