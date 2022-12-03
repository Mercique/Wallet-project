import styles from "./PaymentForm.module.css";
import { useState } from "react";
import { Balance } from "../Balance/Balance";
import { CategoryMenu } from "../CategoryMenu/CategoryMenu";

export const PaymentForm = ({ addNewPayment, paymentList, categoryList, balance }) => {
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState(1);

  const getCurrentDate = (date) => {
    const today = new Date();

    if (date) {
      return `${date}T${today.toLocaleTimeString()}`;
    } else {
      return `${today.toLocaleDateString()}T${today.toLocaleTimeString()}`;
    }
  };

  const resetForm = (e) => {
    let inputsValues = e.target.elements;
    inputsValues.name.value = ''
    inputsValues.value.value = ''
    inputsValues.date.value = ''
    setName("");
    setValue("");
    setDate("");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
    addNewPayment({
      sum: +value,
      name,
      category_id: +category,
      created_at: date ? getCurrentDate(date) : getCurrentDate(null)
    });

    resetForm(e);
  }

  return (
    <>
      <div className={styles.contentWrapper}>
        <form onSubmit={handleSubmit} className={styles.paymentInputForm}>
          <div className={styles.inputBox}>
            <input className={styles.expensesInput} step="0.01" type="number" name="value" placeholder="Введите сумму" onChange={(event) => setValue(event.target.value)}/>
            <input className={styles.expensesInput} type="text" name="name" placeholder="Введите название" onChange={(event) => setName(event.target.value)}/>
          </div>
          <div className={styles.inputBox}>
            <CategoryMenu categoryList={categoryList} category={category} setCategory={setCategory} />
            <input className={styles.expensesInput} type="date" name="date" onChange={(event) => setDate(event.target.value)}/>
          </div>
          <button className={styles.addSpendButton} disabled={!name | !value | categoryList?.error | paymentList?.error}>
            <span>Добавить трату</span>
          </button>
        </form>
        <Balance balance={balance} />
      </div>
    </>
  );
};