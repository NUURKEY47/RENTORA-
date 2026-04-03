import express from "express";
import cors from "cors";
import authRoutes from "./modules/auth/auth.routes.js"
import userRoute from "./modules/user/user.routes.js"
import propertyRoute from "./modules/property/property.routes.js"
import unitRoute from "./modules/unit/unit.routes.js"
import landlordUnit from "./modules/landlord/landlord.routes.js"
import tenantRoute from "./modules/tenant/tenant.routes.js"
import adminRoute from "./modules/admin/admin.routes.js";
import globalErrorHandler from "./middlewares/errorHandler.js";




const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/users", userRoute)
app.use("/api/v1/properties", propertyRoute)
app.use("/api/v1/units", unitRoute)
app.use("/api/v1/landlords", landlordUnit)
app.use("/api/v1/tenants", tenantRoute)
app.use("/api/v1/admin", adminRoute)




app.use(globalErrorHandler)

// Export
export default app;
