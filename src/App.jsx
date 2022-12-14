import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import { Category } from "./pages/Category/Category";
import { Operations } from "./pages/Operations/Operations";
import { Calendar } from "./pages/Calendar/Calendar";
import { RegistrationAuth } from "./pages/RegistrationAuth/RegistrationAuth";
import { useDispatch, useSelector } from "react-redux";
import { selectShowEditId } from "./store/modal/selectors";
import { hideEdit } from "./store/modal/actions";
import { Profile } from "./pages/Profile/Profile";
import { useState } from "react";
import { PublicRoute } from "./components/PublicRoute/PublicRoute";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute";
import { MainAuth } from "./pages/MainAuth/MainAuth";

function App() {
  const dispatch = useDispatch();
  const showEditId = useSelector(selectShowEditId);
  const location = useLocation();
  const [userAuth, setUserAuth] = useState();
  const [authed, setAuthed] = useState(false);

  const authorize = (data) => {
    const user = {
      name: "Mercique",
      email: "dev",
      pass: "123"
    }

    if (user.email === data.email && user.pass === data.pass) {
      setUserAuth(data);
      setAuthed(true);
    } else {
      alert("Error");
    }
  };

  const unauthorize = () => {
    setAuthed(false);
  };

  const navListPublic = [
    {
      route: "/",
      name: "Главная",
    },
    {
      route: "/registration",
      name: "Регистрация",
    },
  ];

  const navListPrivate = [
    {
      route: "/category",
      name: "Категории",
    },
    {
      route: "/operations",
      name: "Операции",
    },
    {
      route: "/calendar",
      name: "Календарь",
    },
    {
      route: "/profile",
      name: "Профиль",
    },
  ];

  const closeModals = () => {
    if (showEditId) {
      dispatch(hideEdit());
    }
  };

  const getLocation = () => {
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
          <Header authed={authed} navList={authed ? navListPrivate : getLocation()} />
          <Routes>
            <Route path="/" element={<PublicRoute name={userAuth?.name} authed={authed} />}>
              <Route path="" element={<MainAuth onAuth={authorize} />} />
              <Route path="/registration" element={<RegistrationAuth />} />
            </Route>
            <Route path="/" element={<PrivateRoute authed={authed} />}>
              <Route path="/category" element={<Category />} />
              <Route path="/operations" element={<Operations />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/profile" element={<Profile userAuth={userAuth} onLogout={unauthorize} />} />
            </Route>
          </Routes>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
