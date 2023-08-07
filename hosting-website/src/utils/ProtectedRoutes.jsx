import { Outlet, Navigate } from "react-router-dom";

export default function ProtectedRoutes() {

    return (
        localStorage.getItem("accessToken") ? <Outlet /> : <Navigate to="/login" />
    );
}