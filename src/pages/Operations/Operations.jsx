import { PaymentForm } from "../../components/PaymentForm/PaymentForm";
import { PaymentList } from "../../components/PaymentList/PaymentList";

export const Operations = () => {
  return (
    <div className="operations">
      <PaymentForm />
      <PaymentList />
    </div>
  );
};
