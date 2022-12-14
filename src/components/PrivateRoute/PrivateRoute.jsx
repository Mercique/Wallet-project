import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { getCategory } from "../../store/category/actions";
import { getIcons } from "../../store/icons/actions";
import { getPayments } from "../../store/payments/actions";

export const PrivateRoute = ({ authed }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategory());
    dispatch(getPayments());
    dispatch(getIcons());
  }, [dispatch]);

  return authed ? <Outlet /> : <Navigate to="/" replace />;
};