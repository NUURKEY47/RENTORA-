// import {
//   createProperty,
//   updatePropertyById,
//   getProperty,
//   deletePropertyById,
//   getPropertyById
// } from "./property.controller.js";
// import { validate } from "../../middlewares/validateMiddleware.js";
// import {
//   createPropertySchema,
//   updatePropertySchema,
// } from "../../validation/propertySchemas.js";
// import { verifyToken, authorizeRoles } from "../../middlewares/auth.js";
// import catchAsync from "../../utils/catchAsync.js";
// import express from "express";

// const router = express.Router();

// router.post(
//   "/",
//   verifyToken,
//   authorizeRoles("LANDLORD", "ADMIN"),
//   validate(createPropertySchema),
//   catchAsync(createProperty)
// );
// router.put(
//   "/:id",
//   verifyToken,
//   authorizeRoles("LANDLORD", "ADMIN"),
//   validate(updatePropertySchema),
//   catchAsync(updatePropertyById)
// );
// router.get(
//   "/",
//   verifyToken,
//   authorizeRoles("LANDLORD", "ADMIN"),
//   catchAsync(getProperty)
// );
// router.get(
//   "/:id",
//   verifyToken,
//   authorizeRoles("LANDLORD", "ADMIN"),
//   catchAsync(getPropertyById)
// );
// router.delete(
//   "/:id",
//   verifyToken,
//   authorizeRoles("LANDLORD", "ADMIN"),
//   catchAsync(deletePropertyById)
// );

// export default router;
import express from "express";
import { verifyToken, authorizeRoles } from "../../middlewares/auth.js";
import { validate } from "../../middlewares/validateMiddleware.js";
import { createPropertySchema, updatePropertySchema, assignLandlordSchema } from "../../validation/propertySchemas.js";
import {
  createProperty,
  assignLandlord,
  updatePropertyById,
  getProperty,
  getPropertyById,
  deletePropertyById,
} from "./property.controller.js";

const router = express.Router();

router.post("/", verifyToken, authorizeRoles("LANDLORD", "ADMIN"), validate(createPropertySchema), createProperty);
router.put("/:id/assign-landlord", verifyToken, authorizeRoles("ADMIN"), validate(assignLandlordSchema), assignLandlord);
router.put("/:id", verifyToken, authorizeRoles("LANDLORD", "ADMIN"), validate(updatePropertySchema), updatePropertyById);
router.get("/", verifyToken, authorizeRoles("LANDLORD", "ADMIN", "TENANT"), getProperty);
router.get("/:id", verifyToken, authorizeRoles("LANDLORD", "ADMIN", "TENANT"), getPropertyById);
router.delete("/:id", verifyToken, authorizeRoles("LANDLORD", "ADMIN"), deletePropertyById);

export default router;