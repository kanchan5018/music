import { Navigate, Outlet } from "react-router-dom";

export function ProtectedRoute() {
  const isToken = localStorage.getItem("token");
  return isToken ? <Outlet /> : <Navigate to="/login" replace />;
}
