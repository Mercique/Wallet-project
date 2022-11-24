import "./App.css";
import { useEffect, useState } from "react";
import { PaymentForm } from "./components/PaymentForm/PaymentForm";
import { PaymentList } from "./components/PaymentList/PaymentList";
import { Category } from "./components/Category/category";
import { Routes, Route } from "react-router-dom";
import { Calendar } from "./components/Calendar/Calendar";
import { Registration } from "./components/Registration/Registration";
import { Header } from "./components/Header/Header";
// import { Modal } from "./components/Modal/Modal";
import { Footer } from "./components/Footer/Footer";

function App() {
  // тестовый массив данных, пока нет API
  const testObj = [{
    id: 1,
    name: 'Магазин',
    date: '2022-11-12',
    category: 'Одежда',
    value: 5000,
    img: '/images/exp-1.png'
  },
  {
    id: 2,
    name: 'Интернет',
    date: '2022-10-12',
    category: 'ЖКХ, связь. интернет',
    value: 499,
    img: '/images/exp-2.png'
  }, 
  {
    id: 3,
    name: 'Процент по вкладу',
    date: '2022-11-13',
    category: 'Пополнение',
    value: 15300,
    img: '/images/exp-3.png'
  },
  {
    id: 4,
    name: 'Оплата обучения',
    date: '2022-11-16',
    category: 'Образование',
    value: 157000,
    img: '/images/exp-4.png'
  },
  {
    id: 5,
    name: 'Аптека',
    date: '2022-11-20',
    category: 'Медицина',
    value: 1230,
    img: '/images/exp-5.png'
  }]

  const categoryList = [
    {id: 1, name: "Одежда", img: "/images/exp-1.png" },
    {id: 2, name: "ЖКХ, связь, интернет", img: "/images/exp-2.png" },
    {id: 3, name: "Пополнение", img: "/images/exp-3.png" },
    {id: 4, name: "Образование", img: "/images/exp-4.png" },
    {id: 5, name: "Медицина", img: "/images/exp-5.png" },
  ];

  const [paymentList, setPaymentList] = useState(testObj);
  // const [modalActive, setModalActive] = useState(false);

  const addNewPayment = (newPayment) => {
    setPaymentList((prevPayment) => [...prevPayment, newPayment]);
  };

  useEffect(() => {
    console.log(paymentList);
  }, [paymentList]);

  return (
    <div className="App">
      <div className="wrapper">
        <div className="wrapper-top center">
          <Header />
          <Routes>
            <Route path="/category" element={<Category />} />
            <Route path="/" element={
                <div className="operations">
                  <PaymentForm addNewPayment={addNewPayment} paymentList={paymentList} categoryList={categoryList} />
                  {/* <Modal active={modalActive} setActive={setModalActive}/> */}
                  {/* <Category /> */}
                  <PaymentList paymentList={paymentList} />
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
