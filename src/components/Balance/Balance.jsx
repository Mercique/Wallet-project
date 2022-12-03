import styles from "./Balance.module.css";

export const Balance = ({ balance }) => {
  return (
    <div className={styles.balance}>
      <p className={styles.balanceLabel}>Баланс:</p>
      <p className={styles.balanceValue}>{balance.toLocaleString()} &#8381;</p>
    </div>
  );
};
