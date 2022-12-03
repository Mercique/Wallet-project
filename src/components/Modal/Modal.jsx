import styles from "./Modal.module.css";
import { useState } from "react";
import { CategoryMenu } from "../CategoryMenu/CategoryMenu";

export const Modal = ({ active, setActive, categoryList, editPayment, paymentInfo}) => {
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [date, setDate] = useState(paymentInfo.created_at);
  const [category, setCategory] = useState(paymentInfo.category_id);

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
      category_id: +category
    });

    setActive(false);
  };

  return (
    <div className={active ? `${styles.modal} ${styles.active}` : styles.modal} onClick={() => setActive(false)}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <input
          type="text"
          name="name"
          placeholder={`Изменить: "${paymentInfo.name}"`}
          className={styles.modalInput}
          onChange={(event) => setName(event.target.value)}
        />
        <input
          type="number"
          step="0.01"
          name="payment"
          placeholder={`Изменить: "${paymentInfo.sum}"`}
          className={styles.modalInput}
          onChange={(event) => setValue(event.target.value)}
        />
        <CategoryMenu categoryList={categoryList} category={category} setCategory={setCategory} />
        <input
          type="date"
          name="calendar"
          placeholder="Дата"
          className={styles.modalInput}
          value={date}
          onChange={(event) => setDate(event.target.value)}
        />
        <button onClick={handleEditPayment} className={styles.inputButton} disabled={!name | !value | categoryList?.error}>Добавить изменение</button>
      </div>
    </div>
  );
};
