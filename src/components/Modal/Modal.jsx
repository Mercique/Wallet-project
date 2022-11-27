import "./Modal.css";
import { useState } from "react";

export const Modal = ({ active, setActive, categoryList, editPayment, deletePayment, paymentInfo}) => {
  const [name, setName] = useState(paymentInfo.name);
  const [value, setValue] = useState(paymentInfo.sum);
  const [date, setDate] = useState(paymentInfo.created_at);
  const [category, setCategory] = useState(paymentInfo.category_id - 1);

  const getCurrentDate = (date) => {
    const getDate = new Date(date);

    return `${getDate.getFullYear()}-${getDate.getMonth() + 1}-${getDate.getDate() < 10 ? "0" + getDate.getDate() : getDate.getDate()}`;
  };

  const handleEditPayment = () => {
    editPayment(paymentInfo, { name, value: +value, date, category: +category + 1 });

    setActive(false);
  };

  const handleDeletePayment = () => {
    deletePayment(paymentInfo.id, paymentInfo.sum);
    setActive(false);
  };

  return (
    <div className={active ? "modal active" : "modal"} onClick={() => setActive(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h1>Изменить трату</h1>
        <input
          type="text"
          name="name"
          placeholder="Введите название"
          className="expenses_input"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <input
          type="number"
          name="payment"
          placeholder="Введите сумму"
          className="expenses_input"
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
        <input
          type="date"
          name="calendar"
          placeholder="Дата"
          className="expenses_input"
          value={getCurrentDate(date)}
          onChange={(event) => setDate(event.target.value)}
        />
        <select
          name="category"
          className="expenses_input"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        >
          { categoryList.map((category, idx) => (
            <option value={idx} key={idx}>{category.name}</option>
          )) }
        </select>
        <div className="modalBtns">
          <button onClick={handleEditPayment} className="input-button edit">Изменить</button>
          <button onClick={handleDeletePayment} className="input-button delete">Удалить</button>
        </div>
      </div>
    </div>
  );
};
