import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { selectUserAuthed } from "../../store/profile/selectors";

export const PrivateRoute = () => {
  const authed = useSelector(selectUserAuthed);

  return document.cookie ? <Outlet /> : <Navigate to="/" replace />;
};
