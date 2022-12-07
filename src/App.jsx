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
  const urlImg = "http://wallet-backend/api/categoryImg"; // API названий картинок

  const [categoryList, setCategoryList] = useState([]);
  const [paymentList, setPaymentList] = useState([]);
  const [images, setImages] = useState([]);
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
        console.log("Categories GET:\n", data);
        setCategoryList(data);
      })
      .catch((err) => {
        console.error("Catch categoryList:\n", err);
        setCategoryList({error: true, name: "Ошибка загрузки категорий!"});
      });

    fetchAPI(urlPayments)
      .then((data) => {
        console.log("Payments GET:\n", data);
        setPaymentList(data);
        setBalance(500000);
        setExpenses(data.reduce((prev, cur) => prev + cur.sum, 0));
      })
      .catch((err) => {
        console.error("Catch paymentList:\n", err);
        setPaymentList({error: true, name: "Ошибка загрузки расходов!"});
        setBalance(500000);
        setExpenses(0);
      });
    
    fetchAPI(urlImg)
      .then((data) => {
        console.log("Images GET:\n", data);
        setImages(data);
      })
      .catch((err) => {
        console.error("Catch imagesList:\n", err);
        setImages({error: true, name: "Ошибка загрузки иконок!"});
      });
  }, []);

  const sendRequest = async (url, method, body = null) => {
    const response = await fetch(url, {
      method: method,
      body: JSON.stringify(body),
      headers: {
        "Content-type": "application/json",
      }
    });

    if (!response.ok) {
      throw new Error(`Could not fetch ${url}, received ${response.status}`);
    }

    const data = await response.json();
    return data;
  };

  const addNewCategory = (newCategory) => { // Добавление категории
    console.log(newCategory);

    sendRequest(urlCategory, "POST", newCategory)
      .then((data) => {
        console.log("Category POST:\n", data);
        setCategoryList((prevCategoryList) => [...prevCategoryList, {
          ...data,
          img: {
            img_name: images[newCategory.img_id - 1].img_name
          }
        }]);
      })
      .catch((err) => console.error(err));
  };

  const addNewPayment = (newPayment) => { // Добавление траты
    const postPayment = {
      "name": newPayment.name,
      "category_id": newPayment.category_id,
      "sum": newPayment.sum,
      "created_at": newPayment.created_at
    }

    sendRequest(urlPayments, "POST", postPayment)
      .then((data) => {
        console.log("Payments POST:\n", data);
        setPaymentList(data);
      })
      .catch((err) => console.error(err));
    
    setBalance(balance - newPayment.sum);
  };

  const editPayment = (editPayment) => { // Изменение траты
    const putPayment = {
      name: editPayment.name,
      category_id: editPayment.category_id,
      sum: editPayment.sum,
      created_at: editPayment.created_at
    }
    
    sendRequest(`${urlPayments}/${editPayment.id}`, "PUT", putPayment)
      .then((data) => {
        console.log("Payments PUT:\n", data);
        setPaymentList(data);
      })
      .catch((err) => console.error(err));

    setBalance(balance + editPayment.lastSum - editPayment.sum);
  };

  const deletePayment = (deleteItem) => { // Удаление траты
    sendRequest(`${urlPayments}/${deleteItem.id}`, "DELETE")
      .then((data) => {
        const updatePaymentList = paymentList.filter((payment) => payment.id !== deleteItem.id);
        setPaymentList(updatePaymentList);
        console.log("Payments Delete:\n", data);
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
            <Route path="/category" element={<Category images={images} balance={balance - expenses} addNewCategory={addNewCategory} />} />
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
