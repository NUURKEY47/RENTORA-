import jwt from "jsonwebtoken";
import AppError from "../utils/AppError.js";

export const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new AppError("no token provided", 401);
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user data to req.user
    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
      managedById: decoded.managedById,
    };

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
//authorizeRoles

export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      throw new AppError("insufficient Permission", 403);
    }
    next();
  };
};
