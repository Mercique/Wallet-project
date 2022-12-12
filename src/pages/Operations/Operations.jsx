import { PaymentForm } from "../../components/PaymentForm/PaymentForm";
import { PaymentList } from "../../components/PaymentList/PaymentList";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCategory } from "../../store/category/actions";
import { getPayments } from "../../store/payments/actions";
import { getIcons } from "../../store/icons/actions";

export const Operations = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategory());
    dispatch(getPayments());
    dispatch(getIcons());
  }, [dispatch]);

  return (
    <div className="operations">
      <PaymentForm />
      <PaymentList />
    </div>
  );
};
