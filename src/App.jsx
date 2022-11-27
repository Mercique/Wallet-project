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
    const getAPI = (url, f) => {
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          f(data);
          console.log(data);
          if (data[0].sum) {
            setExpenses(data.reduce((prev, cur) => prev + cur.sum, 0));
          }
        })
        .catch((e) => console.log(e));
    };

    getAPI(urlCategory, setCategoryList);
    getAPI(urlPayments, setPaymentList);
  }, []);

  const addNewPayment = (newPayment) => {
    const postPayment = {
      "name": newPayment.paymentName,
      "category_id": newPayment.paymentCategoryId,
      "sum": newPayment.paymentSum,
      "created_at": newPayment.paymentDate
    }

    fetch(urlPayments, {
      method: "POST",
      body: JSON.stringify(postPayment),
      headers: {
        "Content-type": "application/json",
      }
    }).then((res) => res.json())
      .then((data) => {
        setPaymentList((prevPayment) => [...prevPayment, {
          ...data,
          category: categoryList[newPayment.paymentCategoryId - 1]
        }]);
      });

    setBalance(balance - newPayment.paymentSum);
  };

  const editPayment = (paymentInfo, editPayment) => {
    const putPayment = {
      name: editPayment.name,
      category_id: editPayment.category,
      sum: editPayment.value
    }

    fetch(`${urlPayments}/${paymentInfo.id}`, {
      method: "PUT",
      body: JSON.stringify(putPayment),
      headers: {
        "Content-type": "application/json",
      }
    }).then((res) => res.json())
      .then((data) => {
        const editItem = {
          ...data,
          category: categoryList[data.category_id - 1],
        }
        const index = paymentList.findIndex((payment) => payment.id === paymentInfo.id);

        const updateList = [...paymentList];
        updateList.splice(index, 1, editItem);

        setPaymentList(updateList);
      });

    setBalance(balance + paymentInfo.sum - editPayment.value);
  };

  const deletePayment = (id, sum) => {
    fetch(`${urlPayments}/${id}`, {
      method: "DELETE",
    }).then((res) => res.json())
      .then((data) => {
        const updatePaymentList = paymentList.filter((payment) => payment.id !== id);
        setPaymentList(updatePaymentList);
        console.log(data);
      });

    setBalance(balance + sum);
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
