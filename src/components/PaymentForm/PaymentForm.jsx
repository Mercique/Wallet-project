import "./PaymentForm.css";
import { useState } from "react";

export const PaymentForm = ({ addNewPayment, categoryList, balance }) => {
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState(1);

  const getCurrentDate = () => {
    const today = new Date(Date.now());

    return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
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
      paymentDate: date || getCurrentDate()
    });

    resetForm(e);
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
              onChange={(event) => setCategory(event.target.value)}
            >
              { categoryList.map((category, idx) => (
                <option value={category.id} key={idx}>{category.name}</option>
              )) }
            </select>
            <input className="expenses_input" type="date" name="date" onChange={(event) => setDate(event.target.value)}/>
          </div>
          <button disabled={!name | !value} className="add_spend_button">
            Добавить трату
          </button>
        </form>
        <div className="balance">
          <p className="balance-label">Баланс:</p>
          <p className="white-text">{balance.toLocaleString()},00 &#8381;</p>
        </div>
      </div>
    </>
  );
};