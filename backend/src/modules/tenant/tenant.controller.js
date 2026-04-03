import { tenantService } from "./tenant.service.js";
import sendResponse from "../../utils/sendResponse.js";
import AppError from "../../utils/AppError.js";

export const createTenant = async (req, res, next) => {
    try {
        const tenant = await tenantService.createTenant(req.body, req.user);
        sendResponse(res, { statusCode: 201, message: "Tenant created successfully", data: tenant });
    } catch (error) {
        next(error);
    }
};

export const assignToUnit = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return next(new AppError("Invalid tenant ID", 400));
        }
        const { unitId } = req.body;
        const assigned = await tenantService.assignToUnit(id, unitId, req.user);
        sendResponse(res, { message: "Tenant assigned to unit successfully", data: assigned });
    } catch (error) {
        next(error);
    }
};

export const listTenants = async (req, res, next) => {
    try {
        const tenants = await tenantService.listTenants(req.user);
        sendResponse(res, { message: "Tenants fetched successfully", data: tenants });
    } catch (error) {
        next(error);
    }
};

export const getTenantById = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return next(new AppError("Invalid tenant ID", 400));
        }
        const tenant = await tenantService.getTenantById(id, req.user);
        sendResponse(res, { message: "Tenant fetched successfully", data: tenant });
    } catch (error) {
        next(error);
    }
};

export const updateTenant = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return next(new AppError("Invalid tenant ID", 400));
        }
        const tenant = await tenantService.updateTenant(id, req.body, req.user);
        sendResponse(res, { message: "Tenant updated successfully", data: tenant });
    } catch (error) {
        next(error);
    }
};

export const deleteTenant = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return next(new AppError("Invalid tenant ID", 400));
        }
        await tenantService.deleteTenant(id, req.user);
        sendResponse(res, { message: "Tenant deleted successfully" });
    } catch (error) {
        next(error);
    }
};

export const getTenantDashboard = async (req, res, next) => {
    try {
        const dashboard = await tenantService.getTenantDashboard(req.user);
        sendResponse(res, { message: "Dashboard data fetched successfully", data: dashboard });
    } catch (error) {
        next(error);
    }
};