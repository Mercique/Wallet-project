import styles from "./PaymentForm.module.css";
import { useState } from "react";
import { CategoryMenu } from "../CategoryMenu/CategoryMenu";
import { Input } from "../Input/Input";
import { SubmitButton } from "../SubmitButton/SubmitButton";
import { useDispatch, useSelector } from "react-redux";
import { addPayment } from "../../store/payments/actions";
import { apiPayments, checkInputValues, getDate } from "../../utils/constants";
import { selectPaymentsError, selectPaymentsPostError } from "../../store/payments/selectors";
import { CalendarBox } from "../CalendarBox/CalendarBox";

export const PaymentForm = () => {
  const [name, setName] = useState("");
  const [errorName, setErrorName] = useState(false);
  const [value, setValue] = useState("");
  const [errorValue, setErrorValue] = useState(false);
  const [date, setDate] = useState(new Date());
  const [categoryId, setCategoryId] = useState("");

  const dispatch = useDispatch();
  const paymentsError = useSelector(selectPaymentsError);
  const postError = useSelector(selectPaymentsPostError);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newPayment = {
      sum: +value,
      name,
      category_id: +categoryId,
      created_at: `${getDate(date)}T${new Date().toLocaleTimeString()}`
    };
    
    dispatch(addPayment(apiPayments, "POST", newPayment));

    setName("");
    setValue("");
    setDate(new Date());
    setCategoryId("");
  }

  const blurHandler = (e) => {
    switch (e.target.name) {
      case "paymentName": {
        setErrorName(checkInputValues("payment", name));
        break;
      }
      case "paymentValue": {
        setErrorValue(checkInputValues("payment", value));
        break;
      }
      default: {
        break;
      }
    }
  };

  return (
    <div className={styles.contentWrapper}>
      <form className={styles.paymentInputForm} onSubmit={handleSubmit}>
        <div className={styles.inputBox}>
          <Input
            type="text"
            className={!errorName ? styles.expensesInput : `${styles.expensesInput} ${styles.expensesInputError}`}
            value={name}
            placeholder="Введите название"
            name="paymentName"
            onBlur={blurHandler}
            onChange={(event) => setName(event.target.value)}
          />
          <Input
            type="number"
            className={!errorValue ? styles.expensesInput : `${styles.expensesInput} ${styles.expensesInputError}`}
            value={value}
            placeholder="Введите сумму"
            step="0.01"
            name="paymentValue"
            onBlur={blurHandler}
            onChange={(event) => setValue(event.target.value)}
          />
        </div>
        <div className={styles.inputBox}>
          <CategoryMenu categoryId={categoryId} setCategoryId={setCategoryId} />
          <CalendarBox className={styles.paymentFormCalendar} date={date} setDate={setDate} />
        </div>
        <SubmitButton
          className={styles.addExpensesButton}
          name="Добавить трату"
          disabled={!name | !value | !categoryId | paymentsError !== null}
        />
        { postError && <span className={styles.postPaymentError}>Недостаточно средств!</span>}
      </form>
    </div>
  );
};
