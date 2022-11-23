import styles from "./PaymentList.module.css";

export const PaymentList = ({ paymentList }) => {
  return (
    <>
      <div className={styles.expenses}>
        {paymentList.map((payment, idx) => (
          <div key={idx} className={styles.expItem}>
            <div className={styles.expLeft}>
              <div className={styles.expIcon}>
                <img src="" alt="" />
              </div>
              <div className={styles.expTexts}>
                {/* изменить стилистику Date */}
                <p className={styles.expName}>{payment.date}</p>
                <p className={styles.expName}>{payment.name}</p>
                <p className={styles.expCategory}>{payment.category}</p>
              </div>
            </div>
            <div className={styles.expRight}>
              <p className={styles.expSum}>{payment.value}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
