import { useRef, useEffect, useState } from "react";
import { Modal } from "../Modal/Modal";
import styles from "./PaymentList.module.css";

export const PaymentList = ({ paymentList, categoryList, editPayment, deletePayment }) => {
  const firstElement = useRef();
  const [active, setActive] = useState(false);
  const [paymentInfo, setPaymentInfo] = useState([]);
  
  useEffect(() => {
    firstElement.current?.scrollIntoView();
  }, [paymentList]);

  const getInfoPayment = (payment) => {
    setPaymentInfo(payment);
    setActive(true);
  };

  return (
    <>
      <div className={styles.expenses}>
        {paymentList.map((payment, idx) => (
          <div key={idx} className={styles.expItem}>
            <div className={styles.expLeft}>
              <div className={styles.expIcon}>
                <img src={`/images/${payment.category.img_name}`} alt="" />
              </div>
              <div className={styles.expTexts}>
                <p className={styles.expName}>{payment.name}</p>
                <p className={styles.expCategory}>{payment.category.name}</p>
              </div>
            </div>
            <div className={styles.expRight}>
              <p className={styles.expSum}>- {payment.sum.toLocaleString()},00 &#8381;</p>
              <button type="button" className={styles.expBtnEdit} onClick={() => getInfoPayment(payment)}><img src="/images/Edit.png" alt="" /></button>
            </div>
          </div>
        ))}
        <div ref={firstElement}></div>
        { active && <Modal active={active} setActive={setActive} categoryList={categoryList} editPayment={editPayment} deletePayment={deletePayment} paymentInfo={paymentInfo} /> }
      </div>
    </>
  );
};
