import styles from "./Payment.module.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectPayments, selectPaymentsError, selectPaymentsLoading } from "../../store/payments/selectors";
import { PaymentList } from "../PaymentList/PaymentList";
import { Modal } from "../Modal/Modal";
import { selectShowModal } from "../../store/modal/selectors";

export const Payment = () => {
  const [showEdit, setShowEdit] = useState("");

  const paymentList = useSelector(selectPayments);
  const paymentsLoading = useSelector(selectPaymentsLoading);
  const paymentsError = useSelector(selectPaymentsError);

  const showModal = useSelector(selectShowModal);

  useEffect(() => {
    if (showModal) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
  }, [showModal]);

  return (
    <>
      { paymentsError ? (
        <div className={styles.expensesError}>{paymentsError}</div>
      ) : (
        <>
          { paymentsLoading ? (
            <div className={styles.expensesLoading}>Загрузка расходов...</div>
          ) : (
            <>
              { !Object.keys(paymentList)?.length ? (
                <div className={styles.expensesEmpty}>Список пуст</div>
              ) : (
                <div className={styles.expenses}>
                  { showModal && <Modal /> }
                  { Object.keys(paymentList).map((paymentDate, idx) => (
                    <div className={styles.expensesBox} key={idx}>
                      <h2 className={styles.expensesBoxDate}>{paymentDate}</h2>
                      <PaymentList paymentList={paymentList[paymentDate]} showEdit={showEdit} setShowEdit={setShowEdit} />
                    </div>
                  )) }
                </div>
              ) }
            </>
          ) }
        </>
      ) }
    </>
  );
};
