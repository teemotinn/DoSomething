import { Navigate, Outlet } from "react-router-dom";

interface CustomRouteProps {
    redirectPath?: string,
    children?: React.ReactNode
}

export const PublicRoute: React.FC<CustomRouteProps> = ({ children, redirectPath = '/home', }) => {
    const login = localStorage.getItem("loggedUser");
    if (login) {
        return <Navigate to={redirectPath} replace />;
    }
    return children ? children : <Outlet />;
};

export const ProtectedRoute: React.FC<CustomRouteProps> = ({ children, redirectPath = '/login', }) => {
    const login = localStorage.getItem("loggedUser");
    if (!login) {
        return <Navigate to={redirectPath} replace />;
    }
    return children ? children : <Outlet />;
};