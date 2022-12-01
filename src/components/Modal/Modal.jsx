import "./Modal.css";
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
      value: +value,
      lastValue: paymentInfo.sum,
      date: date ? getCurrentDate(date) : getCurrentDate(null),
      category: +category + 1
    });

    setActive(false);
  };

  return (
    <div className={active ? "modal active" : "modal"} onClick={() => setActive(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <input
          type="text"
          name="name"
          placeholder="Введите название"
          className="modal_input"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <input
          type="number"
          name="payment"
          placeholder="Введите сумму"
          className="modal_input"
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
        <select
          name="category"
          className="modal_input"
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
          className="modal_input"
          value={date}
          onChange={(event) => setDate(event.target.value)}
        />
        <button onClick={handleEditPayment} className="input-button edit">Добавить изменение</button>
      </div>
    </div>
  );
};
