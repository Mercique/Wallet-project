import { PaymentForm } from "../../components/PaymentForm/PaymentForm";
import { Payment } from "../../components/Payment/Payment";

export const Operations = () => {
  return (
    <div className="operations">
      <PaymentForm />
      <Payment />
    </div>
  );
};
