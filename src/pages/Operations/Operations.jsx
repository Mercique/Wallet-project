import { PaymentForm } from "../../components/PaymentForm/PaymentForm";
import { Payment } from "../../components/Payment/Payment";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCategory } from "../../store/category/actions";
import { getPayments } from "../../store/payments/actions";

export const Operations = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategory());
    dispatch(getPayments());
  }, [dispatch]);

  return (
    <div className="operations">
      <PaymentForm />
      <Payment />
    </div>
  );
};
