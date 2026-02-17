import { Navigate, useLocation } from "react-router-dom";
import { useAppStore } from "../../store/useAppStore";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const location = useLocation();
  const isAuthenticated = useAppStore((state) => state.isAuthenticated);
  const user = useAppStore((state) => state.currentUser);
  const userLoading = useAppStore((state) => state.userLoading);
  const authReady = useAppStore((state) => state.authReady);

  if (!authReady || (isAuthenticated && !user && userLoading)) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-sm text-slate-500 dark:text-slate-300">
        Loading your session...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  if (allowedRoles.length > 0 && user && !allowedRoles.includes(user.role)) {
    const fallbackPath =
      user.role === "NGO" ? "/dashboard/ngo" : "/dashboard/volunteer";
    return <Navigate to={fallbackPath} replace />;
  }

  return children;
};

export default ProtectedRoute;
