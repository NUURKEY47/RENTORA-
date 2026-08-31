import { authService } from "./auth.service.js";
import sendResponse from "../../utils/sendResponse.js";

export const registry = async (req, res, next) => {
  try {
    const { user, token } = await authService.registry(req.body, req.user);
    console.log(req.user);
    sendResponse(res, {
      statusCode: 201,
      message: "User created successfully",
      data: {
        name: user.name,
        email: user.email,
        role: user.role,
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { user, token } = await authService.login(
      req.body.email,
      req.body.password,
    );
    sendResponse(res, {
      message: "User logged in successfully",
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Middleware to check for first admin registration or sub-admin creation
export const checkFirstAdmin = async (req, res, next) => {
  try {
    const role = req.body.role;
    const token = req.headers.authorization?.split(" ")[1];
    const decoded = await authService.checkFirstAdmin(role, token);
    if (decoded) {
      req.user = decoded;
    }
    next();
  } catch (error) {
    res
      .status(401)
      .json({ message: error.message || "Unauthorized registration attempt" });
  }
};

export const forgotPassword = async (req, res, next) => {
  try {
    const result = await authService.forgotPassword(req.body.email);
    sendResponse(res, { message: result.message, data: result.resetToken ? { resetToken: result.resetToken } : undefined });
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    const result = await authService.resetPassword(req.body.token, req.body.newPassword);
    sendResponse(res, { message: result.message });
  } catch (error) {
    next(error);
  }
};
