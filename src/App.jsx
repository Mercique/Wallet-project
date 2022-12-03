import "./App.css";
import { useEffect, useState } from "react";
import { PaymentForm } from "./components/PaymentForm/PaymentForm";
import { PaymentList } from "./components/PaymentList/PaymentList";
import { Category } from "./components/Category/Category";
import { Routes, Route } from "react-router-dom";
import { Calendar } from "./components/Calendar/Calendar";
import { Registration } from "./components/Registration/Registration";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";

function App() {
  const urlCategory = "http://wallet-backend/api/category"; // API категорий
  const urlPayments = "http://wallet-backend/api/spending"; // API расходов

  const [categoryList, setCategoryList] = useState([]);
  const [paymentList, setPaymentList] = useState([]);
  const [balance, setBalance] = useState(0);
  const [expenses, setExpenses] = useState(0);

  useEffect(() => {
    const fetchAPI = async (url) => {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Could not fetch ${url}, received ${response.status}`);
      }

      const data = await response.json();
      return data;
    };

    fetchAPI(urlCategory)
      .then((data) => {
        console.log(data);
        setCategoryList(data);
      })
      .catch((err) => {
        console.error("Catch categoryList: ", err);
        setCategoryList({error: true, name: "Ошибка загрузки категорий!"});
      });

    fetchAPI(urlPayments)
      .then((data) => {
        console.log(data);
        setPaymentList(data);
        setBalance(500000);
        setExpenses(data.reduce((prev, cur) => prev + cur.sum, 0));
      })
      .catch((err) => {
        console.error("Catch paymentList: ", err);
        setPaymentList({error: true, name: "Ошибка загрузки расходов!"});
        setBalance(500000);
        setExpenses(0);
      });
  }, []);

  const handleSubmitAPI = async (url, method, body = null) => {
    const response = await fetch(url, {
      method: method,
      body: JSON.stringify(body),
      headers: {
        "Content-type": "application/json",
      }
    });

    if (!response.ok) {
      throw new Error(`Could not fetch ${method} ${url}, received ${response.status}`);
    }

    const data = await response.json();
    return data;
  };

  const addNewPayment = (newPayment) => {
    const postPayment = {
      "name": newPayment.name,
      "category_id": newPayment.category_id,
      "sum": newPayment.sum,
      "created_at": newPayment.created_at
    }

    handleSubmitAPI(urlPayments, "POST", postPayment)
      .then((data) => {
        console.log("POST: ", data);
        setPaymentList(data);
      })
      .catch((err) => console.error(err));
    
    setBalance(balance - newPayment.sum);
  };

  const editPayment = (editPayment) => {
    const putPayment = {
      name: editPayment.name,
      category_id: editPayment.category_id,
      sum: editPayment.sum,
      created_at: editPayment.created_at
    }
    
    handleSubmitAPI(`${urlPayments}/${editPayment.id}`, "PUT", putPayment)
      .then((data) => {
        console.log("PUT: ", data);
        setPaymentList(data);
      })
      .catch((err) => console.error(err));

    setBalance(balance + editPayment.lastSum - editPayment.sum);
  };

  const deletePayment = (deleteItem) => {
    handleSubmitAPI(`${urlPayments}/${deleteItem.id}`, "DELETE")
      .then((data) => {
        const updatePaymentList = paymentList.filter((payment) => payment.id !== deleteItem.id);
        setPaymentList(updatePaymentList);
        console.log("Delete payment: ", data);
      })
      .catch((err) => console.error(err));

    setBalance(balance + deleteItem.sum);
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
                  <PaymentForm addNewPayment={addNewPayment} paymentList={paymentList} categoryList={categoryList} balance={balance - expenses} />
                  <PaymentList paymentList={paymentList} categoryList={categoryList} editPayment={editPayment} deletePayment={deletePayment} />
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
