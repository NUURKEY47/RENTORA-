import AppError from "../utils/AppError.js";
import { ZodError } from "zod";

const handleKnownErrors = (err) => {
  if (err.code === "P2002") {
    if (err.meta?.constraint?.includes("email")) {
      return new AppError("The email already exists", 422);
    } else {
      return new AppError("Duplicate value for a unique field", 422);
    }
  }

  if (err.name === "JsonWebTokenError") {
    return new AppError("Invalid token", 401);
  }

  if (err.name === "TokenExpiredError") {
    return new AppError("Token has expired", 401);
  }

  if (err.name === "ZodError") {
    return new AppError(
      "Validation failed",
      422,
      err.issues.map((issue) => `${issue.path.join(".")}: ${issue.message}`)
    );
  }

  if (err.code === "P2025") {
    return new AppError("User not found", 404);
  }

  return err;
};

const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  err = handleKnownErrors(err);

  if (err instanceof AppError || (err.statusCode && err.statusCode < 500)) {
    return res.status(err.statusCode || 400).json({
      status: err.status || "error",
      message: err.message,
      details: err.details || undefined,
    });
  }

  console.error("UNEXPECTED ERROR:", err);

  return res.status(500).json({
    status: "error",
    message: "Something went wrong on the server",
  });
};

export default globalErrorHandler;
