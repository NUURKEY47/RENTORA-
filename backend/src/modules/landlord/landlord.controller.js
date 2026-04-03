import { landlordService } from "./landlord.service.js";
import sendResponse from "../../utils/sendResponse.js";
import AppError from "../../utils/AppError.js";

export const createLandlord = async (req, res, next) => {
  try {
    const landlord = await landlordService.createLandlord(req.body, req.user);
    sendResponse(res, {
      statusCode: 201,
      message: "Landlord created successfully",
      data: landlord,
    });
  } catch (error) {
    next(error);
  }
};

export const listLandlords = async (req, res, next) => {
  try {
    console.log("=================================");
    console.log("Current User Fetching Landlords:", req.user);
    console.log("=================================");

    const landlords = await landlordService.listLandlords(req.user);
    sendResponse(res, { message: "Landlords fetched successfully", data: landlords });
  } catch (error) {
    next(error);
  }
};

export const getLandlordById = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id) || id <= 0) {
      return next(new AppError("Invalid landlord ID", 400));
    }
    const landlord = await landlordService.getLandlordById(id, req.user);
    sendResponse(res, { message: "Landlord fetched successfully", data: landlord });
  } catch (error) {
    next(error);
  }
};

export const updateLandlord = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id) || id <= 0) {
      return next(new AppError("Invalid landlord ID", 400));
    }
    const updated = await landlordService.updateLandlord(id, req.body, req.user);
    sendResponse(res, { message: "Landlord updated successfully", data: updated });
  } catch (error) {
    next(error);
  }
};

export const deleteLandlord = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id) || id <= 0) {
      return next(new AppError("Invalid landlord ID", 400));
    }
    await landlordService.deleteLandlord(id, req.user);
    sendResponse(res, { message: "Landlord deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const getLandlordDashboard = async (req, res, next) => {
  try {
    const dashboard = await landlordService.getLandlordDashboard(req.user);
    sendResponse(res, { message: "Dashboard data fetched successfully", data: dashboard });
  } catch (error) {
    next(error);
  }
};