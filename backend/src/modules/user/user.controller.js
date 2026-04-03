import { userService } from "./user.service.js";
import sendResponse from "../../utils/sendResponse.js";
import AppError from "../../utils/AppError.js";




export const getAllUsers = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers(req.query, req.user);
    sendResponse(res, { message: "Users fetched successfully", data: users });
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id) || id <= 0) {
      throw new AppError("Invalid user ID", 400);
    }

    const user = await userService.getUserById(id, req.user);
    sendResponse(res, { message: "User fetched successfully", data: user });
  } catch (error) {
    next(error);
  }
};

export const updateUserById = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id) || id <= 0) {
      throw new AppError("Invalid user ID", 400);
    }

    const updatedUser = await userService.updateUserById(
      id,
      req.body,
      req.user,
    );
    sendResponse(res, {
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUserById = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id) || id <= 0) {
      throw new AppError("Invalid user ID", 400);
    }

    await userService.deleteUserById(id, req.user);
    sendResponse(res, { message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};
