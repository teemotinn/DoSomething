import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from '../features/Home/Home'
import Login from '../features/User/Login/Login'
import SignUp from '../features/User/SignUp/SignUp'
import { ProtectedRoute, PublicRoute } from './CustomRoutes'
import ActivitiesToDo from '../features/Activities/screens/ActivitiesToDo'
import { PATHS } from './Paths'

const Navigation = () => {
    return (
        <Router>
            <Routes>
                <Route element={<ProtectedRoute />}>
                    <Route path="/" element={<Home />} />
                    <Route path={PATHS.HOME} element={<Home />} />
                    <Route path={PATHS.ACTIVITIES_TO_DO} element={<ActivitiesToDo />} />
                </Route>
                <Route element={<PublicRoute />}>
                    <Route path={PATHS.SIGN_UP} element={<SignUp />} />
                    <Route path={PATHS.LOGIN} element={<Login />} />
                </Route>
                <Route path="*" element={<p>There's nothing here: 404!</p>} />
            </Routes>
        </Router>
    )
}

export default Navigation

