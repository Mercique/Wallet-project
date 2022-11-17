import { useState } from "react";
import { PaymentForm } from "./components/PaymentForm/PaymentForm";
import { PaymentList } from "./components/PaymentList/PaymentList";
import { Category } from "./components/Category/category";
import { Routes, Route } from "react-router-dom";
import { Calendar } from "./components/Calendar/Calendar";
import { Registration } from "./components/Registration/Registration";
import { Operations } from "./components/Operations/Operations";
import { Header } from "./components/Header/Header";
import { Modal } from "./components/Modal/Modal";

function App() {
  const [paymentList, setPaymentList] = useState([]);
  const [modalActive, setModalActive] = useState(false);

  const addNewPayment = (newPayment) => {
    setPaymentList((prevPayment) => [...prevPayment, newPayment]);
  };

  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <PaymentForm addNewPayment={addNewPayment} />
              <Modal active={modalActive} setActive={setModalActive} />
              <Category />
              <PaymentList paymentList={paymentList} />
            </>
          }
        />
        <Route path="/operations" element={<Operations />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/registration" element={<Registration />} />
      </Routes>
    </>
  );
}

export default App;
