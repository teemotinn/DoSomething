import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Home from '../features/Home/Home';
import Login from '../features/User/Login/Login';
import SignUp from '../features/User/SignUp/SignUp';

type Props = {
    isAuthenticated: boolean
}

const Navigation = (props: Props) => {
    return (
        <Router>
            <Routes>
                <Route path="/register" element={<SignUp />} />
                <Route path="/login" element={<Login />} />

                <Route element={<PrivateRoute isAuthenticated={props.isAuthenticated} />}>
                    <Route path='/home' element={<Home />} />
                </Route>

                <Route path="/" element={<Navigate to={props.isAuthenticated ? '/home' : '/login'} />} />
                <Route path="*" element={<p>There's nothing here: 404!</p>} />
            </Routes>
        </Router>
    );
};

interface PrivateRouteProps {
    isAuthenticated: boolean,
    redirectPath?: string,
    children?: React.ReactNode
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ isAuthenticated, children, redirectPath = '/login', }) => {
    if (!isAuthenticated) {
        return <Navigate to={redirectPath} replace />;
    }
    return children ? children : <Outlet />;
};

export default Navigation;

