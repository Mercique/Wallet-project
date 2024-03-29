import styles from "./MainAuth.module.css";
import { useState } from "react";
import { AuthLink } from "../../components/AuthLink/AuthLink";
import { useDispatch, useSelector } from "react-redux";
import { InputAuth } from "../../components/InputAuth/InputAuth";
import { checkInputValues } from "../../utils/constants";
import { SubmitButton } from "../../components/SubmitButton/SubmitButton";
import { authLogin } from "../../store/profile/actions";
import { selectLoginError } from "../../store/profile/selectors";

export const MainAuth = () => {
  const [email, setEmail] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const dispatch = useDispatch();
  const authLoginError = useSelector(selectLoginError);

  const blurHandler = (e) => {
    switch (e.target.name) {
      case "email": {
        setErrorEmail(checkInputValues(e.target.name, email));
        break;
      }
      case "password": {
        setErrorPassword(checkInputValues(e.target.name, password));
        break;
      }
      default: {
        break;
      }
    }
  };

  const handleAuth = (e) => {
    e.preventDefault();

    if (!errorEmail && !errorPassword) {
      dispatch(authLogin({email,password}));
    } else {
      console.log("В авторизации не прошли проверку на регулярки емаил и пароль!");
    }
  };

  return (
    <div className={styles.registrationWrapper}>
      <div className={styles.columnLeft}>
        <div className={styles.leftTextarea}>
          <h3 className={styles.regHeading}>Добро пожаловать в GBwallet!</h3>
          <p className={styles.regText}>Управляйте вашими финансами быстро, эффективно и удобно</p>
        </div>
        <div className={styles.leftImagearea}>
          <img src="/images/main.png" alt="welcome!" className={styles.mainImg} />
        </div>
      </div>
      <div className={styles.columnRight}>
        <form className={styles.registrationForm} onSubmit={handleAuth}>
          <h4 className={styles.registrationTitle}>Вход</h4>
          <div className={styles.formArea}>
            <InputAuth
              id="regEmail"
              labelName="E-mail:"
              error={errorEmail}
              type="email"
              name="email"
              value={email}
              onBlur={blurHandler}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Введите e-mail"
            />
            <InputAuth
              id="regPassword"
              labelName="Пароль:"
              error={errorPassword}
              type="password"
              name="password"
              value={password}
              onBlur={blurHandler}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Введите пароль"
            />
          </div>
          <div className={styles.btnArea}>
            { authLoginError && <span className={styles.errorAuth}>{authLoginError}</span> }
            <SubmitButton
              className={styles.enterBtn}
              name="Войти"
              disabled={!email | !password}
            />
          </div>
          <div className={styles.subtextArea}>
            <p className={styles.subtextText}>Забыли пароль?</p>
            <AuthLink path="/registration" name="Регистрация" />
          </div>
        </form>
      </div>
    </div>
  );
};
