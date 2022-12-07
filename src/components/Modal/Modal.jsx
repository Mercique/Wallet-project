import styles from "./Modal.module.css";
import { useState } from "react";
import { CategoryMenu } from "../CategoryMenu/CategoryMenu";
import { Input } from "../Input/Input";
import { SubmitButton } from "../SubmitButton/SubmitButton";

export const Modal = ({ setActive, categoryList, editPayment, paymentInfo}) => {
  const [name, setName] = useState(paymentInfo.name);
  const [value, setValue] = useState(paymentInfo.sum);
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

  const handleEditPayment = (e) => {
    e.preventDefault();

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
    <div className={styles.modal} onClick={() => setActive(false)}>
      <form className={styles.modalInputForm} onClick={(e) => e.stopPropagation()} onSubmit={handleEditPayment}>
        <Input
          type="text"
          className={styles.modalInput}
          value={name}
          placeholder={`Название: "${paymentInfo.name}"`}
          onChange={(event) => setName(event.target.value)}
        />
        <Input
          type="number"
          className={styles.modalInput}
          value={value}
          placeholder={`Сумма: "${paymentInfo.sum}"`}
          step="0.01"
          onChange={(event) => setValue(event.target.value)}
        />
        <CategoryMenu categoryName={categoryList[+category - 1]?.name} categoryList={categoryList} category={category} setCategory={setCategory} />
        <Input
          type="date"
          className={styles.modalInput}
          value={date}
          placeholder="Дата"
          onChange={(event) => setDate(event.target.value)}
        />
        <SubmitButton className={styles.editExpensesButton} name={"Добавить изменение"} disabled={!name | !value | categoryList?.error} />
      </form>
    </div>
  );
};
