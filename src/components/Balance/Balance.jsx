import { useSelector } from "react-redux";
import { selectUser } from "../../store/profile/selectors";
import styles from "./Balance.module.css";
import ReactLoading from "react-loading";

export const Balance = () => {
  const user = useSelector(selectUser);
  
  return (
    <div className={styles.balance}>
      <p className={styles.balanceLabel}>Баланс:</p>
      { !Object.keys(user)?.length ? (
        <ReactLoading type="bubbles" color="#fff" height={44} width={44} />
      ) : (
        <p className={styles.balanceValue}>{user?.balance?.toLocaleString()} &#8381;</p>
      ) }
    </div>
  );
};
