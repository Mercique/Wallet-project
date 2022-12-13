import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import { Category } from "./pages/Category/Category";
import { Operations } from "./pages/Operations/Operations";
import { Calendar } from "./pages/Calendar/Calendar";
import { Registration } from "./pages/Registration/Registration";
import { RegistrationAuth } from "./pages/RegistrationAuth/RegistrationAuth";
import { useDispatch, useSelector } from "react-redux";
import { selectShowEditId } from "./store/modal/selectors";
import { hideEdit } from "./store/modal/actions";

function App() {
  const dispatch = useDispatch();
  const showEditId = useSelector(selectShowEditId);

  const closeModals = () => {
    if (showEditId) {
      dispatch(hideEdit());
    }
  }

  return (
    <div className="App" onClick={closeModals}>
      <div className="wrapper">
        <div className="wrapper-top center">
          <Header />
          <Routes>
            <Route path="/category" element={<Category />} />
            <Route path="/operations" element={<Operations />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/" element={<Registration />} />
            <Route path="/registration" element={<RegistrationAuth />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
