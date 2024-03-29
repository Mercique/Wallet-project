import styles from "./RegistrationAuth.module.css";
import { useState } from "react";
import { SubmitButton } from "../../components/SubmitButton/SubmitButton";
import { AuthLink } from "../../components/AuthLink/AuthLink";
import { InputAuth } from "../../components/InputAuth/InputAuth";
import { checkInputValues } from "../../utils/constants";
import { authRegister } from "../../store/profile/actions";
import { useDispatch, useSelector } from "react-redux";
import { selectUserCreateError } from "../../store/profile/selectors";

export const RegistrationAuth = () => {
  const [name, setName] = useState("");
  const [errorName, setErrorName] = useState("");
  const [surname, setSurname] = useState("");
  const [errorSurname, setErrorSurname] = useState("");
  const [email, setEmail] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [checked, setChecked] = useState(false);

  const dispatch = useDispatch();
  const registerError = useSelector(selectUserCreateError);

  const blurHandler = (e) => {
    switch (e.target.name) {
      case "name": {
        setErrorName(checkInputValues("text", name));
        break;
      }
      case "surname": {
        setErrorSurname(checkInputValues("text", surname));
        break;
      }
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

  const handleRegister = (e) => {
    e.preventDefault();

    if (!errorName && !errorSurname && !errorEmail && !errorPassword) {
      dispatch(authRegister({ name, surname, email, password }));

      setName("");
      setSurname("");
      setEmail("");
      setPassword("");
      setChecked(false);
    } else {
      console.log("ERROR");
    }
  };

  return (
    <div className={styles.regWrapper}>
      <div className={styles.regCard}>
        <div className={styles.regHead}>
          <h4 className={styles.regTitle}>Регистрация</h4>
          <AuthLink path="/" name="У меня есть аккаунт" />
        </div>
        <form className={styles.inputBlock} onSubmit={handleRegister}>
          <div className={styles.inputArea}>
            <InputAuth
              id="regName"
              labelName="Имя:"
              error={errorName}
              name="name"
              type="text"
              value={name}
              onBlur={blurHandler}
              onChange={(e) => setName(e.target.value)}
              placeholder="Введите имя"
            />
            <InputAuth
              id="regSurname"
              labelName="Фамилия:"
              error={errorSurname}
              type="text"
              name="surname"
              value={surname}
              onBlur={blurHandler}
              onChange={(e) => setSurname(e.target.value)}
              placeholder="Введите фамилию"
            />
          </div>
          <div className={styles.inputArea}>
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
          <div className={styles.mailsBlock}>
            <input
              id="regMails"
              type="checkbox"
              className={styles.mailsCheckbox}
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
            />
            <label htmlFor="regMails">
              Я согласен получать обновления на почту
            </label>
          </div>
          <div className={styles.btnArea}>
            <SubmitButton
              className={styles.regBtn}
              name="Регистрация"
              disabled={!name | !surname | !email | !password}
            />
          </div>
          { registerError && <span className={styles.registerError}>{registerError}</span> }
        </form>
      </div>
    </div>
  );
};
