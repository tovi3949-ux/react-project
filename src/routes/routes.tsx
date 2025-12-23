import Login from "../pages/Login";
import Register from "../pages/Register";
import LoginRegister from "../pages/Login-Register";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Users from "../pages/Users";
import Tickets from "../pages/Tickets";
import AddTicket from "../pages/AddTicket";
import Ticket from "../pages/Ticket";
import { useAuth } from "../context/authStore";
import { ProtectedRoute } from "./ProtectRoute";
import Settings from "../pages/Setting";
import Priorities from "../pages/Priorities";
import Statuses from "../pages/Statuses";
import AddUser from "../pages/AddUser";
import TermsOfUse from "../pages/TermsOfUse";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import LandingPage from "../pages/LandingPage";
import NotFound from "../pages/NotFound";
import { ROLES } from "../utils/roles";
import Unauthorized from "../pages/Unauthorized";
function RoutesComponent() {
    const user = useAuth((state) => state.user)
    const role = user?.role || ROLES.UNLOGGED;
    return (
        <Routes>
            <Route path="/landing" element={<LandingPage />} />
            <Route path='/' element={!user ? <LandingPage /> : <ProtectedRoute isAllowed={!!user}><Dashboard /></ProtectedRoute>} />
            <Route element={<LoginRegister />} >
                <Route path='login' element={<Login />} />
                <Route path='register' element={<Register />} />
            </Route>
            <Route path="dashboard" element={<ProtectedRoute isAllowed={role !== ROLES.UNLOGGED}><Dashboard /></ProtectedRoute>} />
            <Route path="users" element={<ProtectedRoute isAllowed={role === ROLES.ADMIN}><Users /></ProtectedRoute>} />
            <Route path="add-user" element={<ProtectedRoute isAllowed={role === ROLES.ADMIN}><AddUser /></ProtectedRoute>} />
            <Route path="tickets" element={<ProtectedRoute isAllowed={role !== ROLES.UNLOGGED}><Tickets /></ProtectedRoute>} />
            <Route path="settings" element={<ProtectedRoute isAllowed={role === ROLES.ADMIN}><Settings /></ProtectedRoute>} >
                <Route path="priorities" element={<ProtectedRoute isAllowed={role === ROLES.ADMIN}><Priorities /></ProtectedRoute>} />
                <Route path="statuses" element={<ProtectedRoute isAllowed={role === ROLES.ADMIN}><Statuses /></ProtectedRoute>} />
            </Route>
            <Route path="tickets/new" element={<ProtectedRoute isAllowed={role === ROLES.CUSTOMER}><AddTicket /></ProtectedRoute>} />
            <Route path="tickets/:id" element={<ProtectedRoute isAllowed={role !== ROLES.UNLOGGED} ><Ticket /></ProtectedRoute>} />
            <Route path="terms-of-use" element={<TermsOfUse />} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="*" element={<NotFound />} />
            <Route path="unauthorized" element={<Unauthorized />} />
        </Routes>
    );
}
export default RoutesComponent