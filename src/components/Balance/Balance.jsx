import { useSelector } from "react-redux";
import { selectUser } from "../../store/profile/selectors";
import styles from "./Balance.module.css";

export const Balance = ({ className }) => {
  const user = useSelector(selectUser);
  
  return (
    <div className={`${styles.balance} ${className}`}>
      <p className={styles.balanceLabel}>Баланс:</p>
      <p className={styles.balanceValue}>{user?.balance?.toLocaleString()} &#8381;</p>
    </div>
  );
};
