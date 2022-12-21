import { useSelector } from "react-redux";
import { selectUser } from "../../store/profile/selectors";
import styles from "./Balance.module.css";

export const Balance = () => {
  const user = useSelector(selectUser);
  
  return (
    <div className={styles.balance}>
      <p className={styles.balanceLabel}>Баланс:</p>
      {/* <p className={styles.balanceValue}>{user ? user.balance.toLocaleString() : 0} &#8381;</p> */}
    </div>
  );
};
