import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = ({ authed }) => {
  return authed ? <Outlet /> : <Navigate to="/" replace />;
};
