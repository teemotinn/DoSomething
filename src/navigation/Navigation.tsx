import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../features/Home/Home';
import Login from '../features/User/Login/Login';
import SignUp from '../features/User/SignUp/SignUp';
import { ProtectedRoute, PublicRoute } from './CustomRoutes';
import ActivitiesToDo from '../features/Activities/ActivitiesToDo';

const Navigation = () => {
    return (
        <Router>
            <Routes>
                <Route element={<ProtectedRoute />}>
                    <Route path="/" element={<Home />} />
                    <Route path='/home' element={<Home />} />
                    <Route path='/activities-to-do' element={<ActivitiesToDo />} />
                </Route>
                <Route element={<PublicRoute />}>
                    <Route path="/register" element={<SignUp />} />
                    <Route path="/login" element={<Login />} />
                </Route>
                <Route path="*" element={<p>There's nothing here: 404!</p>} />
            </Routes>
        </Router>
    );
};

export default Navigation;

