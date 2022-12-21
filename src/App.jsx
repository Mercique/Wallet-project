import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
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
import { navListPrivate, navListPublic } from "./utils/constants";
import { selectLoginSuccess, selectUserAuthed } from "./store/profile/selectors";
import { getUser } from "./store/profile/actions";
import { getIcons } from "./store/icons/actions";
import { getCategory } from "./store/category/actions";
import { getPayments } from "./store/payments/actions";

function App() {
  const location = useLocation();

  const dispatch = useDispatch();
  const showEditId = useSelector(selectShowEditId);
  const authed = useSelector(selectUserAuthed);
  const loginSuccess = useSelector(selectLoginSuccess);

  useEffect(() => {
    if (loginSuccess) {
      dispatch(getUser());
      console.log("user status success");
    } else if (document.cookie) {
      dispatch(getUser());
    }
  }, [loginSuccess, dispatch]);

  useEffect(() => {
    if (authed && document.cookie) {
      dispatch(getIcons());
      dispatch(getCategory());
      dispatch(getPayments());
    }
  }, [authed, dispatch]);

  const closeModals = () => {
    if (showEditId) {
      dispatch(hideEdit());
    }
  };

  const navLocation = () => {
    if (navListPublic[0].route === location.pathname) {
      return [navListPublic[1]];
    } else {
      return [navListPublic[0]];
    }
  };

  return (
    <div className="App" onClick={closeModals}>
      <div className="wrapper">
        <div className="wrapper-top center">
          <Header cookie={document.cookie} navList={document.cookie ? navListPrivate : navLocation() } />
          <Routes>
            <Route path="/" element={<PublicRoute />}>
              <Route path="/loading" element={<p>Loading</p>} />
              <Route path="" element={<MainAuth />} />
              <Route path="/registration" element={<RegistrationAuth />} />
            </Route>
            <Route path="/" element={<PrivateRoute />}>
              <Route path="/category" element={<Category />} />
              <Route path="/operations" element={<Operations />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Routes>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
