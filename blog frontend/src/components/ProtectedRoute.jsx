import { Navigate, useLocation } from "react-router";
import { useAuth } from "../store/authStore";

function ProtectedRoute({ allowedRoles, children, redirectTo = "/login" }) {
  const currentUser = useAuth((state) => state.currentUser);
  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  const location = useLocation();

  if (!isAuthenticated || !currentUser) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
