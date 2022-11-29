import styles from "./PaymentForm.module.css";
import { useState } from "react";

export const PaymentForm = ({ addNewPayment, categoryList, balance }) => {
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
      paymentSum: +value,
      paymentName: name,
      paymentCategoryId: +category,
      paymentCategoryName: categoryList[+category - 1].name,
      paymentDate: date ? getCurrentDate(date) : getCurrentDate(null)
    });

    resetForm(e);
  }

  return (
    <>
      <div className={styles.contentWrapper}>
        <form onSubmit={handleSubmit} className={styles.paymentInputForm}>
          <div className={styles.inputBox}>
            <input className={styles.expensesInput} type="number" name="value" placeholder="Введите сумму" onChange={(event) => setValue(event.target.value)}/>
            <input className={styles.expensesInput} type="text" name="name" placeholder="Введите название" onChange={(event) => setName(event.target.value)}/>
          </div>
          <div className={styles.inputBox}>
            { !categoryList ? (
              <select className={styles.expensesInput} style={{ color: "#f00" }}><option>Ошибка загрузки категорий!</option></select>
            ) : (
              <select
                className={styles.expensesInput}
                name="category"
                onChange={(event) => setCategory(event.target.value)}
              >
                { categoryList?.map((category, idx) => (
                  <option value={category.id} key={idx}>{category.name}</option>
                )) }
              </select>
            ) }
            <input className={styles.expensesInput} type="date" name="date" onChange={(event) => setDate(event.target.value)}/>
          </div>
          <button className={styles.addSpendButton} disabled={!name | !value} >
            <span>Добавить трату</span>
          </button>
        </form>
        <div className={styles.balance}>
          <p className={styles.balanceLabel}>Баланс:</p>
          <p className={styles.whiteText}>{balance.toLocaleString()},00 &#8381;</p>
        </div>
      </div>
    </>
  );
};