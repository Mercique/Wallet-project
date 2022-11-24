import "./Modal.css";
import { useState } from "react";

export const Modal = ({ active, setActive, addNewPayment, paymentList, categoryList }) => {
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState([]);

  const handleCategoryChange = (e) => {
    setCategory(categoryList[e.target.value]);
  };

  const addPayment = () => {
    addNewPayment({
      id: paymentList.length + 1,
      name: name || "Пусто",
      date: date || "2022-11-24",
      category: category.name || "Одежда",
      value: +value || 0,
      img: category.img || "/images/exp-1.png"
    })
  }

  return (
    <div
      className={active ? "modal active" : "modal"}
      onClick={() => setActive(false)}
    >
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <input
          type="text"
          name="name"
          placeholder="Введите название"
          className="expenses_input"
          onChange={(event) => setName(event.target.value)}
        />
        <input
          type="number"
          name="payment"
          placeholder="Введите сумму"
          className="expenses_input"
          onChange={(event) => setValue(event.target.value)}
        />
        <input
          type="date"
          name="calendar"
          placeholder="Дата"
          className="expenses_input"
          onChange={(event) => setDate(event.target.value)}
        />
        <select
          name="category"
          className="expenses_input"
          onChange={handleCategoryChange}
        >
          { categoryList.map((item, idx) => (
            <option value={idx} key={idx}>{item.name}</option>
          )) }
        </select>
        <button onClick={addPayment} className="input-button">Добавить трату</button>
      </div>
    </div>
  );
};
