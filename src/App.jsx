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
  const urlCategory = "http://wallet-backend/api/category";
  const urlPayments = "http://wallet-backend/api/spending";

  const [categoryList, setCategoryList] = useState([]);
  const [paymentList, setPaymentList] = useState([]);
  // const [modalActive, setModalActive] = useState(false);
  const [balance, setBalance] = useState(500000);

  const addNewPayment = (newPayment) => {
    const postPayment = {
      sum: newPayment.value,
      category_id: newPayment.category_id,
      created_at: newPayment.date
    }

    fetch(urlPayments, {
      method: "POST",
      body: JSON.stringify(postPayment),
      headers: {
        "Content-type": "application/json",
      }
    }).then((res) => res.json())
      .then((data) => setPaymentList((prevPayment) => [...prevPayment, {
        ...data,
        CategoryName: newPayment.category,
        CategoryImgName: newPayment.img,
      }]));

    setBalance(balance - newPayment.value);
  };

  const getAPI = (url, f) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        f(data);
        console.log(data);
      });
  };

  useEffect(() => {
    getAPI(urlCategory, setCategoryList);
    getAPI(urlPayments, setPaymentList);
  }, []);

  return (
    <div className="App">
      <div className="wrapper">
        <div className="wrapper-top center">
          <Header />
          <Routes>
            <Route path="/category" element={<Category />} />
            <Route path="/" element={
                <div className="operations">
                  <PaymentForm addNewPayment={addNewPayment} paymentList={paymentList} categoryList={categoryList} balance={balance} />
                  {/* <Modal active={modalActive} setActive={setModalActive}/> */}
                  {/* <Category /> */}
                  <PaymentList paymentList={paymentList} categoryList={categoryList} />
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
