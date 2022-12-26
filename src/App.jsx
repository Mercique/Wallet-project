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
import { selectLoginSuccess } from "./store/profile/selectors";
import { getUser } from "./store/profile/actions";
import { getCategory } from "./store/category/actions";
import { getPayments } from "./store/payments/actions";
import { getIcons } from "./store/icons/actions";

function App() {
  const location = useLocation();

  const dispatch = useDispatch();
  const showEditId = useSelector(selectShowEditId);
  const loginSuccess = useSelector(selectLoginSuccess);

  useEffect(() => {
    dispatch(getUser());
    dispatch(getCategory());
    dispatch(getPayments());
    dispatch(getIcons());
    // let timeout;

    // if (loginSuccess || document.cookie) {
    //   dispatch(getUser());
    //   timeout = setTimeout(() => {
    //     dispatch(getCategory());
    //     dispatch(getPayments());
    //     dispatch(getIcons());
    //   }, 100);
    // }

    // return () => clearTimeout(timeout);
  }, [dispatch, loginSuccess]);

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
          <Header cookie={true} navList={[...navListPrivate, ...navListPublic]} />
          <Routes>
            <Route path="/category" element={<Category />} />
            <Route path="/operations" element={<Operations />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/" element={<MainAuth />} />
            <Route path="/registration" element={<RegistrationAuth />} />
          </Routes>
          {/* <Header cookie={document.cookie} navList={document.cookie ? navListPrivate : navLocation() } />
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
          </Routes> */}
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
