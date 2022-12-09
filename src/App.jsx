import "./App.css";
// import { useEffect, useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import { store } from "./store";
import { Provider } from "react-redux";
import { Category } from "./pages/Category/Category";
import { Operations } from "./pages/Operations/Operations";
import { Calendar } from "./pages/Calendar/Calendar";
import { Registration } from "./pages/Registration/Registration";
import { RegistrationAuth } from "./pages/RegistrationAuth/RegistrationAuth";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
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
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
