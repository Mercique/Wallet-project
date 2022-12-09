import styles from "./Balance.module.css";

export const Balance = () => {
  let balance = 500000;
  
  return (
    <div className={styles.balance}>
      <p className={styles.balanceLabel}>Баланс:</p>
      <p className={styles.balanceValue}>{balance.toLocaleString()} &#8381;</p>
    </div>
  );
};
