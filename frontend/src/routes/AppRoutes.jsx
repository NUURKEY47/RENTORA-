import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Dashboard from "../pages/Dashboard";
import LandingPage from "../pages/LandingPage";
import ProtectedRoute from "./ProtectedRoute";
import DashboardLayout from "../components/layout/DashboardLayout";
import PropertiesList from "../pages/properties/PropertiesList";
import UnitsList from "../pages/units/UnitsList";
import TenantsList from "../pages/tenants/TenantsList";
import LandlordsList from "../pages/landlords/LandlordsList";
import UserManagement from "../pages/admin/UserManagement";
import Profile from "../pages/Profile";
import ForgotPassword from "../pages/auth/ForgotPassword";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      {/* Protected routes - only logged-in users */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/properties" element={<PropertiesList />} />
          <Route path="/units" element={<UnitsList />} />
          <Route path="/tenants" element={<TenantsList />} />
          <Route path="/landlords" element={<LandlordsList />} />
          <Route path="/user-management" element={<UserManagement />} />
          <Route path="/finance" element={<div className="p-10 text-gray-500 font-bold uppercase tracking-widest">Finance implementation coming soon...</div>} />
        </Route>
      </Route>
      {/* Catch-all redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
