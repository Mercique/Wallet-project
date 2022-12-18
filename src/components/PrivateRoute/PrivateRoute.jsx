import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getCategory } from "../../store/category/actions";
import { getIcons } from "../../store/icons/actions";
import { getLocation } from "../../store/location/actions";
import { getPayments } from "../../store/payments/actions";
import { selectUserAuthed } from "../../store/profile/selectors";

export const PrivateRoute = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const authed = useSelector(selectUserAuthed);

  useEffect(() => {
    if (authed) {
      dispatch(getCategory());
      dispatch(getPayments());
      dispatch(getIcons());
    }
    
  }, [authed, dispatch]);

  useEffect(() => {
    if (authed) {
      dispatch(getLocation(location.pathname));
    } else {
      dispatch(getLocation("/operations"));
    }
  }, [authed, dispatch, location.pathname]);

  return authed ? <Outlet /> : <Navigate to="/" replace />;
};