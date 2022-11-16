import { useState } from 'react';
import { PaymentForm } from './components/PaymentForm/PaymentForm';
import { PaymentList } from './components/PaymentList/PaymentList'
import { Category } from "./components/Category/category.js";

function App() {
  const [paymentList, setPaymentList] = useState([]);

  const addNewPayment = (newPayment) => {
    setPaymentList((prevPayment) => [...prevPayment, newPayment]);};

  return (
    <>
      <PaymentForm addNewPayment={addNewPayment}/>
      <Category />
      <PaymentList paymentList={paymentList}/>
    </>
  );
}

export default App;