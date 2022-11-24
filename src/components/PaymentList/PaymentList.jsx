import { useRef, useEffect } from "react";
import styles from "./PaymentList.module.css";

export const PaymentList = ({ paymentList }) => {
  const firstElement = useRef();
  
  useEffect(() => {
    firstElement.current?.scrollIntoView();
  }, [paymentList]);

  return (
    <>
      <div className={styles.expenses}>
        {paymentList.map((payment, idx) => (
          <div key={idx} className={styles.expItem}>
            <div className={styles.expLeft}>
              <div className={styles.expIcon}>
                <img src={`/images/${payment.CategoryImgName}`} alt="" />
              </div>
              <div className={styles.expTexts}>
                {/* изменить стилистику Date */}
                {/* <p className={styles.expName}>{payment.date}</p> */}
                <p className={styles.expName}>НАЗВАНИЕ ТРАТЫ</p>
                <p className={styles.expCategory}>{payment.CategoryName}</p>
              </div>
            </div>
            <div className={styles.expRight}>
              <p className={styles.expSum}>- {payment.sum.toLocaleString()},00</p>
              <button type="button" className={styles.expBtnEdit}><img src="/images/Edit.png" alt="" /></button>
            </div>
          </div>
        ))}
        <div ref={firstElement}></div>
      </div>
    </>
  );
};
