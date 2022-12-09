import styles from "./PaymentForm.module.css";
import { useState } from "react";
import { Balance } from "../Balance/Balance";
import { CategoryMenu } from "../CategoryMenu/CategoryMenu";
import { Input } from "../Input/Input";
import { SubmitButton } from "../SubmitButton/SubmitButton";
import { useDispatch, useSelector } from "react-redux";
import { addPayment } from "../../store/payments/actions";
import { apiPayments } from "../../utils/constants";
import { selectPaymentsError } from "../../store/payments/selectors";

export const PaymentForm = () => {
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [date, setDate] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const dispatch = useDispatch();
  const paymentsError = useSelector(selectPaymentsError);

  const getCurrentDate = (date) => {
    const today = new Date();

    if (date) {
      return `${date}T${today.toLocaleTimeString()}`;
    } else {
      return `${today.toLocaleDateString()}T${today.toLocaleTimeString()}`;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newPayment = {
      sum: +value,
      name,
      category_id: +categoryId,
      created_at: date ? getCurrentDate(date) : getCurrentDate(null)
    };
    
    dispatch(addPayment(apiPayments, "POST", newPayment));

    setName("");
    setValue("");
    setDate("");
    setCategoryId("");
  }

  return (
    <div className={styles.contentWrapper}>
      <form className={styles.paymentInputForm} onSubmit={handleSubmit}>
        <div className={styles.inputBox}>
          <Input
            type="text"
            className={styles.expensesInput}
            value={name}
            placeholder="Введите название"
            onChange={(event) => setName(event.target.value)}
          />
          <Input
            type="number"
            className={styles.expensesInput}
            value={value}
            placeholder="Введите сумму"
            step="0.01"
            onChange={(event) => setValue(event.target.value)} />
        </div>
        <div className={styles.inputBox}>
          <CategoryMenu categoryId={categoryId} setCategoryId={setCategoryId} />
          <Input
            type="date"
            className={styles.expensesInput}
            value={date}
            placeholder="Дата"
            onChange={(event) => setDate(event.target.value)} />
        </div>
        <SubmitButton className={styles.addExpensesButton} name="Добавить трату" disabled={!name | !value | !categoryId | paymentsError} />
      </form>
      <Balance />
    </div>
  );
};
