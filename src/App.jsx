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
import { apiLogin, apiLogout, apiRegister, apiToken, navListPrivate, navListPublic } from "./utils/constants";
import cookie from "cookie";

function App() {
  const dispatch = useDispatch();
  const showEditId = useSelector(selectShowEditId);
  const location = useLocation();
  const [userAuth, setUserAuth] = useState();
  const [authed, setAuthed] = useState(false);

  const authorize = async (login) => {
    try {
      const tokenResponse = await fetch(apiToken, {
        credentials: "include",
        headers: {
          "Accept": "application/json",
          "Content-type": "application/json",
        },
      });
  
      if (!tokenResponse.ok) {
        throw new Error(`Could not get token ${apiToken}, received ${tokenResponse.status}`);
      }
  
      const loginResponse = await fetch(apiLogin, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(login),
        headers: {
          "Accept": "application/json",
          "Content-type": "application/json",
          "X-XSRF-TOKEN": cookie.parse(document.cookie)["XSRF-TOKEN"] || false
        },
      });
  
      if (!loginResponse.ok) {
        throw new Error(`Could not authorize ${apiToken}, received ${loginResponse.status}`);
      }
  
      setUserAuth(login);
      setAuthed(true);
    } catch (err) {
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
        throw new Error(`Could not unauthorize ${apiLogout}, received ${response.status}`);
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
