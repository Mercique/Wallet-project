import styles from "./RegistrationAuth.module.css";
import { useState } from "react";
import { SubmitButton } from "../../components/SubmitButton/SubmitButton";
import { AuthLink } from "../../components/AuthLink/AuthLink";
import { InputAuth } from "../../components/InputAuth/InputAuth";
import { checkInputValues } from "../../utils/constants";

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
      console.log({ name, surname, email, password, checked });

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
          <div className={styles.inputTopArea}>
            <InputAuth
              id="regName"
              labelName="Имя:"
              name="name"
              type="text"
              value={name}
              error={errorName}
              onBlur={blurHandler}
              onChange={(e) => setName(e.target.value)}
              placeholder="Введите имя"
            />
            <InputAuth
              id="regSurname"
              labelName="Фамилия:"
              name="surname"
              type="text"
              value={surname}
              error={errorSurname}
              onBlur={blurHandler}
              onChange={(e) => setSurname(e.target.value)}
              placeholder="Введите фамилию"
            />
          </div>
          <div className={styles.inputBottomArea}>
            <InputAuth
              id="regEmail"
              labelName="E-mail:"
              name="email"
              type="email"
              value={email}
              error={errorEmail}
              onBlur={blurHandler}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Введите e-mail"
            />
            <InputAuth
              id="regPassword"
              labelName="Пароль:"
              name="password"
              type="password"
              value={password}
              error={errorPassword}
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
        </form>
      </div>
    </div>
  );
};
