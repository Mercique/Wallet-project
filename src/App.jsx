import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import { Category } from "./pages/Category/Category";
import { Operations } from "./pages/Operations/Operations";
import { RegistrationAuth } from "./pages/RegistrationAuth/RegistrationAuth";
import { useDispatch, useSelector } from "react-redux";
import { selectShowEditId } from "./store/modal/selectors";
import { hideEdit } from "./store/modal/actions";
import { Profile } from "./pages/Profile/Profile";
import { useEffect } from "react";
import { PublicRoute } from "./components/PublicRoute/PublicRoute";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute";
import { MainAuth } from "./pages/MainAuth/MainAuth";
import { selectLoginSuccess, selectUserLogout } from "./store/profile/selectors";
import { getUser } from "./store/profile/actions";
import { getCategory } from "./store/category/actions";
import { getPayments, postPaymentsFailure } from "./store/payments/actions";
import { getIcons } from "./store/icons/actions";
import { selectPaymentsPostError } from "./store/payments/selectors";

function App() {
  const dispatch = useDispatch();
  const showEditId = useSelector(selectShowEditId);
  const postFailure = useSelector(selectPaymentsPostError);
  const login = useSelector(selectLoginSuccess);
  const logout = useSelector(selectUserLogout);

  useEffect(() => {
    let timeout;

    if (login || document.cookie) {
      dispatch(getUser());
      timeout = setTimeout(() => {
        dispatch(getCategory());
        dispatch(getPayments());
        dispatch(getIcons());
      }, 250);
    }

    return () => clearTimeout(timeout);
  }, [dispatch, login, logout]);

  const closeModals = () => {
    if (showEditId) {
      dispatch(hideEdit());
    } else if (postFailure) {
      dispatch(postPaymentsFailure(""));
    }
  };

  return (
    <div className="App" onClick={closeModals}>
      <div className="wrapper">
        <div className="wrapper-top center">
          <Header cookie={document.cookie} />
          <Routes>
            <Route path="/" element={<PublicRoute />}>
              <Route path="" element={<MainAuth />} />
              <Route path="/registration" element={<RegistrationAuth />} />
            </Route>
            <Route path="/" element={<PrivateRoute />}>
              <Route path="/category" element={<Category />} />
              <Route path="/operations" element={<Operations />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
            <Route path="*" element={<p>Error 404</p>}></Route>
          </Routes>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
