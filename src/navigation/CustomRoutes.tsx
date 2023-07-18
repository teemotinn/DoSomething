import { useContext } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { AppContext } from "../context/AppContext"
import { PATHS } from "./Paths"

interface CustomRouteProps {
    redirectPath?: string,
    children?: React.ReactNode
}

export const PublicRoute: React.FC<CustomRouteProps> = ({ children, redirectPath = PATHS.HOME, }) => {
    const {loggedUser } = useContext(AppContext)
    if (loggedUser) {
        return <Navigate to={redirectPath} replace />
    }
    return children ? children : <Outlet />
}

export const ProtectedRoute: React.FC<CustomRouteProps> = ({ children, redirectPath = PATHS.LOGIN, }) => {
    const {loggedUser } = useContext(AppContext)
    if (!loggedUser) {
        return <Navigate to={redirectPath} replace />
    }
    return children ? children : <Outlet />
}