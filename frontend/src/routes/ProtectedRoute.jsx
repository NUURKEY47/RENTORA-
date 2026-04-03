import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function ProtectedRoute({ allowedRoles }) {
  const { user, role, loading } = useContext(AuthContext);

  // Still loading auth state? Show nothing or spinner
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  // No user/token → redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If allowedRoles specified and current role not in list → redirect to dashboard
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/dashboard" replace />;
  }

  // All good → show the protected page
  return <Outlet />;
}
