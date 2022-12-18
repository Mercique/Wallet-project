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
import { getUser, unauthUserSuccess } from "./store/profile/actions";
import cookie from "cookie";
import { navListPrivate, navListPublic } from "./utils/constants";
import { selectUserAuthed } from "./store/profile/selectors";

function App() {
  const dispatch = useDispatch();
  const showEditId = useSelector(selectShowEditId);
  const location = useLocation();
  const authed = useSelector(selectUserAuthed);

  useEffect(() => {
    if (cookie.parse(document.cookie).hasOwnProperty("XSRF-TOKEN")) {
      console.log("authorized");
      dispatch(getUser({email: "dev@dev.ru", password: "123"}));
    } else {
      console.log("unauthorized");
      dispatch(unauthUserSuccess());
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
          <Header authed={authed} navList={authed ? navListPrivate : navLocation() } />
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
          </Routes>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
