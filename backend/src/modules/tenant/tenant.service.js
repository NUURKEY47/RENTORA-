import { tenantRepository } from "./tenant.repository.js";
import AppError from "../../utils/AppError.js";
import bcrypt from "bcrypt";

export const tenantService = {
    createTenant: async (data, user) => {
        // 1. Set role (always TENANT)
        data.role = "TENANT";

        // 2. Hash password if provided
        if (data.password) {
            data.password = await bcrypt.hash(data.password, 10);
        }

        // 3. Role-specific creation rules
        if (user.role === "ADMIN") {
            if (user.managedById) {
                // Sub-admin: Set supervision and check unit ownership if provided
                data.managedById = user.id;
                if (data.unitId) {
                    const unit = await tenantRepository.findUnitById(data.unitId);
                    if (!unit) {
                        throw new AppError("Unit not found", 404);
                    }
                    if (!unit.property.landlord || unit.property.landlord.managedById !== user.id) {
                        throw new AppError("You do not manage this unit's landlord", 403);
                    }
                }
            } else {
                // First Admin: No restrictions, just verify unit exists if provided
                if (data.unitId) {
                    const unit = await tenantRepository.findUnitById(data.unitId);
                    if (!unit) {
                        throw new AppError("Unit not found", 404);
                    }
                }
            }
        } else if (user.role === "LANDLORD") {
            // Landlord: can only create tenant if unitId is provided and owned by them
            if (!data.unitId) {
                throw new AppError("Landlords must provide a unit ID for tenant", 400);
            }

            const unit = await tenantRepository.findUnitById(data.unitId);
            if (!unit) {
                throw new AppError("Unit not found", 404);
            }

            if (unit.property.landlordId !== user.id) {
                throw new AppError("You do not own this unit", 403);
            }

            // Auto-assign tenant to this unit
            data.unitId = data.unitId;
        } else {
            throw new AppError("Only admins and landlords can create tenants", 403);
        }

        // 4. Create tenant
        const tenant = await tenantRepository.createUser(data);

        // 5. If unitId provided, update unit status to occupied
        if (data.unitId) {
            await tenantRepository.updateUnitStatus(data.unitId, "occupied");
        }

        return tenant;
    },

    assignToUnit: async (tenantId, unitId, user) => {
        const tenant = await tenantRepository.findUserById(tenantId);
        if (!tenant || tenant.role !== "TENANT") {
            throw new AppError("Invalid tenant", 400);
        }

        const unit = await tenantRepository.findUnitById(unitId);
        if (!unit) {
            throw new AppError("Unit not found", 404);
        }

        if (unit.status !== "available") {
            throw new AppError("Unit not available", 400);
        }

        if (user.role === "LANDLORD" && unit.property.landlordId !== user.id) {
            throw new AppError("You do not own this unit", 403);
        } else if (user.role === "ADMIN" && user.managedById && (!unit.property.landlord || unit.property.landlord.managedById !== user.id)) {
            throw new AppError("You do not manage this unit's landlord", 403);
        }

        // Update tenant's unitId and capture the updated tenant
        const updatedTenant = await tenantRepository.updateUserUnitId(tenantId, unitId);

        // Update unit status
        await tenantRepository.updateUnitStatus(unitId, "occupied");

        // Return the updated tenant (now with correct unitId)
        return { tenant: updatedTenant, unit };
    },

    listTenants: async (user) => {
        const where = { role: "TENANT" };
        if (user.role === "LANDLORD") {
            where.unit = { property: { landlordId: user.id } };
        } else if (user.role === "ADMIN" && user.managedById) {
            where.OR = [
                { managedById: user.id },
                { unit: { property: { landlord: { managedById: user.id } } } }
            ];
        } else if (user.role === "TENANT") {
            where.id = user.id;
        }
        return await tenantRepository.findManyTenants(where);
    },

    getTenantById: async (id, user) => {
        const tenant = await tenantRepository.findUserById(id);
        if (!tenant || tenant.role !== "TENANT") {
            throw new AppError("Tenant not found", 404);
        }

        if (user.role === "LANDLORD" && (!tenant.unit || tenant.unit.property.landlordId !== user.id)) {
            throw new AppError("You do not own this tenant's unit", 403);
        } else if (user.role === "ADMIN" && user.managedById && tenant.managedById !== user.id) {
            throw new AppError("You do not manage this tenant", 403);
        }

        return tenant;
    },

    getTenantDashboard: async (user) => {
        if (user.role !== "TENANT") {
            throw new AppError("Access denied - tenants only", 403);
        }
        const data = await tenantRepository.findTenantDashboardData(user.id);
        // Aggregate example
        const invoicesCount = data.invoices.length;
        const bookingsCount = data.bookings.length;
        return { unit: data.unit, invoices: data.invoices, payments: data.payments, bookings: data.bookings, invoicesCount, bookingsCount };
    },

    updateTenant: async (id, data, user) => {
        const existing = await tenantRepository.findUserById(id);
        if (!existing || existing.role !== "TENANT") {
            throw new AppError("Tenant not found", 404);
        }

        // RBAC check
        if (user.role === "LANDLORD" && (!existing.unit || existing.unit.property.landlordId !== user.id)) {
            throw new AppError("You do not own this tenant's unit", 403);
        } else if (user.role === "ADMIN" && user.managedById && existing.managedById !== user.id) {
            throw new AppError("You do not manage this tenant", 403);
        }

        if (data.password) {
            data.password = await bcrypt.hash(data.password, 10);
        }

        // If unit is being changed
        if (data.unitId && data.unitId !== existing.unitId) {
            const unit = await tenantRepository.findUnitById(data.unitId);
            if (!unit || unit.status !== "available") {
                throw new AppError("New unit is not available", 400);
            }
            // Free old unit
            if (existing.unitId) {
                await tenantRepository.updateUnitStatus(existing.unitId, "available");
            }
            // Occupy new unit
            await tenantRepository.updateUnitStatus(data.unitId, "occupied");
        }

        return await tenantRepository.updateUser(id, data);
    },

    deleteTenant: async (id, user) => {
        const existing = await tenantRepository.findUserById(id);
        if (!existing || existing.role !== "TENANT") {
            throw new AppError("Tenant not found", 404);
        }

        // RBAC check
        if (user.role === "LANDLORD" && (!existing.unit || existing.unit.property.landlordId !== user.id)) {
            throw new AppError("You do not own this tenant's unit", 403);
        } else if (user.role === "ADMIN" && user.managedById && existing.managedById !== user.id) {
            throw new AppError("You do not manage this tenant", 403);
        }

        // Free up unit if assigned
        if (existing.unitId) {
            await tenantRepository.updateUnitStatus(existing.unitId, "available");
        }

        await tenantRepository.deleteUser(id);
    },
};