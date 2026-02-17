import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppStore } from '../../store/useAppStore';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { isAuthenticated, user } = useAppStore();
    const location = useLocation();

    if (!isAuthenticated) {
        // Redirect to login but save the current location they were trying to go to
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user?.role)) {
        // Role not authorized, redirect to their respective dashboard or safe place
        const redirectPath = user?.role === 'NGO' ? '/dashboard/ngo' : '/dashboard/volunteer';
        return <Navigate to={redirectPath} replace />;
    }

    return children;
};

export default ProtectedRoute;
