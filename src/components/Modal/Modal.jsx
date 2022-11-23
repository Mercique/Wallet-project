import "./Modal.css";
import { useState } from "react";

export const Modal = ({ active, setActive, addNewPayment }) => {
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [date, setDate] = useState("");

  const handleCategoryChange = (category) => {
    setCategory(category);
  };

  const addPayment = () => {
    addNewPayment({
      id: Math.floor(Math.random() * 100000),
      name: name,
      date: date,
      category: category,
      value: value
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
          value={category}
          className="expenses_input"
          onChange={(event) => handleCategoryChange(event.target.value)}
        >
          <option id="0">Одежда</option>
          <option id="1">Транспорт</option>
          <option id="2">Кафе и рестораны</option>
          <option id="3">Супермаркеты</option>
          <option id="4">ЖКХ, связь, интернет</option>
          <option id="5">Медицина</option>
          <option id="6">Образование</option>
          <option id="7">Прочие расходы</option>
        </select>
        <button onClick={addPayment} className="input-button">Добавить трату</button>
      </div>
    </div>
  );
};
