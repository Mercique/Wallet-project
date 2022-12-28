import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = () => {
  return document.cookie ? <Outlet /> : <Navigate to="/" replace />;
};
