import "./PaymentForm.css";
import { useState } from "react";

export const PaymentForm = ({ addNewPayment, paymentList, categoryList, balance }) => {  
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState([]);

  const handleCategoryChange = (e) => {
    setCategory(categoryList[e.target.value]);
  };

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
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    addNewPayment({
      id: paymentList.length + 1,
      name: name,
      date: date ? date : getCurrentDate(),
      category: category.name || categoryList[0].name,
      category_id: category.id || 1,
      value: +value,
      img: category.img_name || categoryList[0].img_name
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
              onChange={handleCategoryChange}
            >
              { categoryList.map((category, idx) => (
                <option value={idx} key={idx}>{category.name}</option>
              )) }
            </select>
            <input className="expenses_input" type="date" name="date" onChange={(event) => setDate(event.target.value)}/>
          </div>
          <button disabled={!name | !value } className="add_spend_button">
            Добавить трату
          </button>
        </form>
        <div className="balance">
          <p className="balance-label">Баланс</p>
          <p className="white-text">{balance.toLocaleString()},00</p>
        </div>
      </div>
    </>
  );
};