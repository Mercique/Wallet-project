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
import { useEffect, useState } from "react";
import { PublicRoute } from "./components/PublicRoute/PublicRoute";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute";
import { MainAuth } from "./pages/MainAuth/MainAuth";
import { apiLogin, apiLogout, apiRegister, apiToken } from "./utils/constants";
import axios from 'axios';
import { getCategory } from "./store/category/actions";

function App() {
  const dispatch = useDispatch();
  const showEditId = useSelector(selectShowEditId);
  const location = useLocation();
  const [userAuth, setUserAuth] = useState();
  const [authed, setAuthed] = useState(false);

  const getCookie = async () => {
    axios.get(apiToken, { withCredentials: true });
  };

  useEffect(() => {
    getCookie();
  }, []);

  const authorize = async (login) => {
    try {
      const loginResponse = await axios({
        method: 'post',
        url: apiLogin,
        data: login,
        withCredentials: true,
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
      });

      console.log(loginResponse);

      if (!loginResponse.ok) {
        throw new Error(`Could not fetch ${apiLogin}, received ${loginResponse.status}`);
      }

      console.log(loginResponse.data);

      dispatch(getCategory());
      
      setUserAuth(login);
      setAuthed(false); //true
    } catch(err) {
      console.warn(err);
      setAuthed(false);
    }
  };

  const unauthorize = async () => {
    try {
      const response = await fetch(apiLogout, {
        method: "POST",
        body: JSON.stringify(null),
        headers: {
          "Accept": "application/json",
          "Content-type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(
          `Could not fetch ${apiLogout}, received ${response.status}`
        );
      }

      setUserAuth();
      setAuthed(false);
    } catch (err) {
      console.warn(err);
      setAuthed(false);
    }
  };

  const register = (newUser) => {
    console.log(newUser);
    console.log(apiRegister);
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
              <Route path="/registration" element={<RegistrationAuth register={register} />} />
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
