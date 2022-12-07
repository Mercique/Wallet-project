import styles from "./PaymentForm.module.css";
import { useState } from "react";
import { Balance } from "../Balance/Balance";
import { CategoryMenu } from "../CategoryMenu/CategoryMenu";
import { Input } from "../Input/Input";
import { SubmitButton } from "../SubmitButton/SubmitButton";

export const PaymentForm = ({ addNewPayment, paymentList, categoryList, balance }) => {
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");

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
    
    addNewPayment({
      sum: +value,
      name,
      category_id: +category,
      created_at: date ? getCurrentDate(date) : getCurrentDate(null)
    });

    setName("");
    setValue("");
    setDate("");
    setCategory("");
  }

  return (
    <>
      <div className={styles.contentWrapper}>
        <form className={styles.paymentInputForm} onSubmit={handleSubmit}>
          <div className={styles.inputBox}>
            <Input type={"text"} className={styles.expensesInput} placeholder={"Введите название"} value={name} onChange={(event) => setName(event.target.value)} />
            <Input type={"number"} className={styles.expensesInput} placeholder={"Введите сумму"} value={value} step={"0.01"} onChange={(event) => setValue(event.target.value)} />
          </div>
          <div className={styles.inputBox}>
            <CategoryMenu categoryList={categoryList} category={category} setCategory={setCategory} />
            <Input type={"date"} className={styles.expensesInput} value={date} onChange={(event) => setDate(event.target.value)} />
          </div>
          <SubmitButton className={styles.addExpensesButton} name={"Добавить трату"} disabled={!name | !value | !category | categoryList?.error | paymentList?.error} />
        </form>
        <Balance balance={balance} />
      </div>
    </>
  );
};
