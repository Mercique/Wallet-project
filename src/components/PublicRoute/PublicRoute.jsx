import { Navigate, Outlet } from "react-router-dom";

export const PublicRoute = () => {
  return !document.cookie ? <Outlet /> : <Navigate to="/operations" replace />;
};
