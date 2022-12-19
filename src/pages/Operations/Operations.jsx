import styles from "./Operations.module.css";
import { PaymentForm } from "../../components/PaymentForm/PaymentForm";
import { Payment } from "../../components/Payment/Payment";
import { TestSlider } from "../../components/TestSlider/TestSlider";
import { useState } from "react";
import { Balance } from "../../components/Balance/Balance";
import { useDispatch } from "react-redux";
import { sortPayments } from "../../store/payments/actions";
import { apiPayments } from "../../utils/constants";

export const Operations = () => {
  const [categoryEdit, setCategoryEdit] = useState("");
  const dispatch = useDispatch();

  const handleActive = (el) => {
    if (el.id !== categoryEdit?.id) {
      setCategoryEdit({id: el.id, name: el.name, img_id: el.img_id});
      dispatch(sortPayments(`${apiPayments}/${el.id}`));
    } else {
      setCategoryEdit("");
      dispatch(sortPayments(apiPayments));
    }
  };

  return (
    <div className={styles.operations}>
      <div className={styles.operationsLeft}>
        <TestSlider className={styles.operationsTestSlider} categoryEdit={categoryEdit} handleActive={handleActive} />
        <div className={styles.operationsMiddle}>
          <PaymentForm />
          <Payment />
        </div>
      </div>
      <Balance />
    </div>
  );
};
