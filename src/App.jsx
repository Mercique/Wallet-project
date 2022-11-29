import "./App.css";
import { useEffect, useState } from "react";
import { PaymentForm } from "./components/PaymentForm/PaymentForm";
import { PaymentList } from "./components/PaymentList/PaymentList";
import { Category } from "./components/Category/category";
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
  const [balance, setBalance] = useState(500000);
  const [expenses, setExpenses] = useState(0);

  useEffect(() => {
    const fetchAPI = async (url) => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(response.status);
        }
        const data = await response.json();
        return data;
      } catch (err) {
        console.warn(err);
      }
    };

    fetchAPI(urlCategory)
      .then((data) => {
        console.log(data);
        setCategoryList(data);
      });

    fetchAPI(urlPayments)
      .then((data) => {
        console.log(data);
        setPaymentList(data);
        setExpenses(data.reduce((prev, cur) => prev + cur.sum, 0));
      });
  }, []);

  const handleSubmitAPI = async (url, method, body = null) => {
    try {
      const response = await fetch(url, {
        method: method,
        body: JSON.stringify(body),
        headers: {
          "Content-type": "application/json",
        }
      });
      if (!response.ok) {
        throw new Error(response.status);
      }
      const data = await response.json();
      return data;
    } catch (err) {
      console.warn(err);
    }
  };

  const addNewPayment = (newPayment) => {
    console.log(newPayment.paymentDate);
    const postPayment = {
      "name": newPayment.paymentName,
      "category_id": newPayment.paymentCategoryId,
      "sum": newPayment.paymentSum,
      "created_at": newPayment.paymentDate
    }

    handleSubmitAPI(urlPayments, "POST", postPayment)
      .then((data) => {
        setPaymentList((prevPayment) => [{
          ...data,
          category: categoryList[newPayment.paymentCategoryId - 1]
        }, ...prevPayment]);

        console.log(data);
      });
    
    setBalance(balance - newPayment.paymentSum);
  };

  const editPayment = (editPayment) => {
    const putPayment = {
      name: editPayment.name,
      category_id: editPayment.category,
      sum: editPayment.value,
      created_at: editPayment.date
    }

    console.log(putPayment);

    handleSubmitAPI(`${urlPayments}/${editPayment.id}`, "PUT", putPayment)
      .then((data) => {
        const editItem = {
          ...data,
          category: categoryList[data.category_id - 1],
        }
        const index = paymentList.findIndex((payment) => payment.id === editPayment.id);

        const updateList = [...paymentList];
        updateList.splice(index, 1, editItem);

        setPaymentList(updateList);
      });

    setBalance(balance + editPayment.lastValue - editPayment.value);
  };

  const deletePayment = (deleteItem) => {
    handleSubmitAPI(`${urlPayments}/${deleteItem.id}`, "DELETE")
      .then((data) => {
        const updatePaymentList = paymentList.filter((payment) => payment.id !== deleteItem.id);
        setPaymentList(updatePaymentList);
        console.log("Delete ", data);
      });

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
                  <PaymentForm addNewPayment={addNewPayment} categoryList={categoryList} balance={balance - expenses} />
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
