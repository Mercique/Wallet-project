import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { selectLocation } from "../../store/location/selectors";
import { selectUserAuthed } from "../../store/profile/selectors";

export const PublicRoute = () => {
  const location = useSelector(selectLocation);
  const authed = useSelector(selectUserAuthed);

  return !authed ? <Outlet /> : <Navigate to={location} replace />;
};
