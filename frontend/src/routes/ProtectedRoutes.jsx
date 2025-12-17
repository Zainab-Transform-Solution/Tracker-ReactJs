import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, requireUserPermission = false, requireProjectPermission = false }) => {
  const { user, canManageUsers, canManageProjects } = useAuth();

  if (!user) return <Navigate to="/" />;

  // Check specific permissions if required
  if (requireUserPermission && !canManageUsers) {
    return <Navigate to="/unauthorized" />;
  }

  if (requireProjectPermission && !canManageProjects) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default ProtectedRoute;