import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { selectUserAuthed } from "../../store/profile/selectors";

export const PublicRoute = () => {
  const authed = useSelector(selectUserAuthed);

  return !authed ? <Outlet /> : <Navigate to="/operations" replace />;
};
