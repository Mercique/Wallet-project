import styles from "./Modal.module.css";
import { useState } from "react";

export const Modal = ({ active, setActive, categoryList, editPayment, paymentInfo}) => {
  const [name, setName] = useState(paymentInfo.name);
  const [value, setValue] = useState(paymentInfo.sum);
  const [date, setDate] = useState(paymentInfo.created_at);
  const [category, setCategory] = useState(paymentInfo.category_id - 1);


  const getCurrentDate = (date) => {
    const today = new Date();

    if (date) {
      return `${date}T${today.toLocaleTimeString()}`;
    } else {
      return `${today.toLocaleDateString()}T${today.toLocaleTimeString()}`;
    }
  };

  const handleEditPayment = () => {
    editPayment({
      id: paymentInfo.id,
      name,
      sum: +value,
      lastSum: paymentInfo.sum,
      created_at: date ? getCurrentDate(date) : getCurrentDate(null),
      category_id: +category + 1
    });

    setActive(false);
  };

  return (
    <div className={active ? `${styles.modal} ${styles.active}` : `${styles.modal}`} onClick={() => setActive(false)}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <input
          type="text"
          name="name"
          placeholder="Введите название"
          className={styles.modalInput}
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <input
          type="number"
          step="0.01"
          name="payment"
          placeholder="Введите сумму"
          className={styles.modalInput}
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
        <select
          name="category"
          className={styles.modalInput}
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        >
          { categoryList.map((category, idx) => (
            <option value={idx} key={idx}>{category.name}</option>
            )) }
        </select>
        <input
          type="date"
          name="calendar"
          placeholder="Дата"
          className={styles.modalInput}
          value={date}
          onChange={(event) => setDate(event.target.value)}
        />
        <button onClick={handleEditPayment} className={styles.inputButton}>Добавить изменение</button>
      </div>
    </div>
  );
};
