import "./App.css";
import { useState } from "react";
import { PaymentForm } from "./components/PaymentForm/PaymentForm";
import { PaymentList } from "./components/PaymentList/PaymentList";
import { Category } from "./components/Category/category";
import { Routes, Route } from "react-router-dom";
import { Calendar } from "./components/Calendar/Calendar";
import { Registration } from "./components/Registration/Registration";
import { Header } from "./components/Header/Header";
import { Modal } from "./components/Modal/Modal";
import { Footer } from "./components/Footer/Footer";

function App() {
  // тестовый массив данных, пока нет API
  const testObj = [{
    id: Math.floor(Math.random() * 100000),
    name: 'textName1',
    date: 'testDate1',
    category: 'testCategory1',
    value: 'testValue1'
  },
  {
    id: Math.floor(Math.random() * 100000),
    name: 'textName2',
    date: 'testDate2',
    category: 'testCategory2',
    value: 'testValue2'
  }, 
  {
    id: Math.floor(Math.random() * 100000),
    name: 'textName3',
    date: 'testDate2',
    category: 'testCategory3',
    value: 'testValue3'
  }]

  const [paymentList, setPaymentList] = useState(testObj);
  const [modalActive, setModalActive] = useState(false);

  const addNewPayment = (newPayment) => {
    setPaymentList((prevPayment) => [newPayment, ...prevPayment]);
  };

  return (
    <div className="App">
      <div className="wrapper">
        <div className="wrapper-top center">
          <Header />
          <Routes>
            <Route path="/category" element={<Category />} />
            <Route path="/" element={
                <div className="operations">
                  <PaymentForm addNewPayment={addNewPayment} />
                  <Modal active={modalActive} setActive={setModalActive}/>
                  {/* <Category /> */}
                  <PaymentList paymentList={paymentList.reverse()} />
                </div>
              }
            />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/registration" element={<Registration />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
