import "./PaymentForm.css";
import { useState } from "react";
import { Modal } from "../Modal/Modal";

export const PaymentForm = ({addNewPayment}) => {
  const [modalActive, setModalActive] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="content-wrapper">
        <form onSubmit={handleSubmit} className="payment-input-form">
          <button
            className="add_spend_button"
            onClick={() => setModalActive(true)}
          >
            Добавить трату
          </button>
          <Modal active={modalActive} setActive={setModalActive} addNewPayment={addNewPayment} />
          <div className="filter-form">
            <p className="filter-label">Фильтры:</p>
            <button className="filter-btn">День</button>
            <button className="filter-btn">Неделя</button>
            <button className="filter-btn">Месяц</button>
          </div>
        </form>
        <div className="balance">
          <p className="balance-label">Баланс</p>
          <p className="white-text">143 607,31</p>
        </div>
      </div>
    </>
  );
};
