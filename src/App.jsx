import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import { useDispatch } from "react-redux";
import { Category } from "./pages/Category/Category";
import { Operations } from "./pages/Operations/Operations";
import { Calendar } from "./pages/Calendar/Calendar";
import { Registration } from "./pages/Registration/Registration";
import { RegistrationAuth } from "./pages/RegistrationAuth/RegistrationAuth";
import { useEffect } from "react";
import { getPayments } from "./store/payments/actions";
import { getCategory } from "./store/category/actions";
import { getIcons } from "./store/icons/actions";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategory());
    dispatch(getPayments());
    dispatch(getIcons());
  }, [dispatch]);

  return (
    <div className="App">
      <div className="wrapper">
        <div className="wrapper-top center">
          <Header />
          <Routes>
            <Route path="/category" element={<Category />} />
            <Route path="/" element={<Operations />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/registration/auth" element={<RegistrationAuth />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
