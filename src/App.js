import { useState } from 'react';
import { PaymentForm } from './components/PaymentForm/PaymentForm';
import { PaymentList } from './components/PaymentList/PaymentList'
import { Category } from "./components/Category/category.js";
// import { Modal } from "./components/Modal/Modal";

function App() {
  const [paymentList, setPaymentList] = useState([]);
  // const [modalActive, setModalActive] = useState(true);
  const addNewPayment = (newPayment) => {
    setPaymentList((prevPayment) => [...prevPayment, newPayment]);};

  return (
    <>
      <PaymentForm addNewPayment={addNewPayment}/>
      {/* <Modal active={modalActive} setActive={setModalActive}/> */}
      <Category />
      <PaymentList paymentList={paymentList}/>
    </>
  );
}

export default App;