import "./PaymentForm.css";
import { useState } from "react";

export const PaymentForm = ({ addNewPayment }) => {  
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("Одежда");

  const getCurrentDate = () => {
    const today = new Date();
    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    };
    return new Intl.DateTimeFormat("UTC", options).format(today);
  }

  const resetForm = (e) => {
    let inputsValues = e.target.elements;
    inputsValues.name.value = ''
    inputsValues.value.value = ''
    inputsValues.date.value = ''
    setName('');
    setValue('');
    setDate('');
    setCategory('Одежда');
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    addNewPayment({
      id: '',
      name: name,
      date: date ? date : getCurrentDate(),
      category: category,
      value: value,
      img: ''
    })
    resetForm(e)
  }

  return (
    <>
      <div className="content-wrapper">
        <form onSubmit={handleSubmit} className="payment-input-form">
          <div className="payment-input-form-">
            <input className="expenses_input" type="number" name="value" placeholder="Введите сумму" onChange={(event) => setValue(event.target.value)}/>
            <input className="expenses_input" type="text" name="name" placeholder="Введите название" onChange={(event) => setName(event.target.value)}/>
          </div>
          <div className="">
            <select
              className="expenses_input"
              name="category"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
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
            <input className="expenses_input" type="date" name="date" onChange={(event) => setDate(event.target.value)}/>
          </div>
          <button disabled={!name | !value } className="add_spend_button">
            Добавить трату
          </button>
        </form>
        <div className="balance">
          <p className="balance-label">Баланс</p>
          <p className="white-text">143 607,31</p>
        </div>
      </div>
    </>
  );
};