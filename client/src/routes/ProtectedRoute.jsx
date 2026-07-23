import { Navigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";
import LoadingSpinner from "../components/LoadingSpinner";

function ProtectedRoute({ children, allowedRoles }) {
  const token = localStorage.getItem("token");
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner text="Checking authentication..." />;
  }

  // Redirect unauthenticated users.
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Redirect users who do not have the required role.
  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  // Render the protected content.
  return children;
}

export default ProtectedRoute;
