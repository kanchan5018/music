import { Navigate, Outlet } from "react-router-dom";

export function PublicRoute() {
  const isToken = localStorage.getItem("token");
  return !isToken ? <Outlet /> : <Navigate to="/playlist" replace />;
}
