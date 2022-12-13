import styles from "./Modal.module.css";
import { useState } from "react";
import { CategoryMenu } from "../CategoryMenu/CategoryMenu";
import { Input } from "../Input/Input";
import { SubmitButton } from "../SubmitButton/SubmitButton";
import { useDispatch, useSelector } from "react-redux";
import { apiPayments, getDate } from "../../utils/constants";
import { editPayment } from "../../store/payments/actions";
import { selectCategoryError } from "../../store/category/selectors";
import { selectPaymentInfo } from "../../store/modal/selectors";
import { hideModal } from "../../store/modal/actions";

export const Modal = () => {
  const paymentInfo = useSelector(selectPaymentInfo);

  const [name, setName] = useState(paymentInfo.name);
  const [value, setValue] = useState(paymentInfo.sum);
  const [date, setDate] = useState("");
  const [categoryId, setCategoryId] = useState(paymentInfo.category_id);

  const dispatch = useDispatch();
  const categoryError = useSelector(selectCategoryError);

  const handleEditPayment = (e) => {
    e.preventDefault();

    const putPayment = {
      name,
      sum: +value,
      category_id: +categoryId,
      created_at: date ? `${date}T${new Date().toLocaleTimeString()}` : paymentInfo.created_at,
    };
    
    dispatch(editPayment(`${apiPayments}/${paymentInfo.id}`, "PUT", putPayment));
    dispatch(hideModal());
  };

  const closeModal = () => {
    dispatch(hideModal());
  };

  return (
    <div className={styles.modal} onClick={closeModal}>
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
        <CategoryMenu categoryId={categoryId} setCategoryId={setCategoryId} />
        <Input
          type="date"
          className={styles.modalInput}
          value={date || getDate(paymentInfo.created_at)}
          placeholder="Дата"
          onChange={(event) => setDate(event.target.value)}
        />
        <SubmitButton className={styles.editExpensesButton} name="Добавить изменение" disabled={!name | !value | categoryError !== null} />
      </form>
    </div>
  );
};
