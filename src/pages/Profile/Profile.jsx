import styles from "./Profile.module.css";
import { useDispatch, useSelector } from "react-redux";
import { authEdit, unAuthUser } from "../../store/profile/actions";
import { selectUser, selectUserCreateError } from "../../store/profile/selectors";
import { useState } from "react";
import { sendRequest } from "../../utils/asyncActions";
import { getUser } from "../../store/profile/actions";
import { Balance } from "../../components/Balance/Balance";
import { SubmitButton } from "../../components/SubmitButton/SubmitButton";
import { checkInputValues } from "../../utils/constants";
import { Input } from "../../components/Input/Input";
import { InputAuth } from "../../components/InputAuth/InputAuth";
import ReactLoading from "react-loading";

export function Profile({ setAuthed }) {
  const [sum, setSum] = useState("");
  const [errorSum, setErrorSum] = useState("");
  const [errorSumApi, setErrorSumApi] = useState("");

  const [name, setName] = useState("");
  const [errorName, setErrorName] = useState("");
  const [surname, setSurname] = useState("");
  const [errorSurname, setErrorSurname] = useState("");
  const [email, setEmail] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const dispatch = useDispatch();
  const userAuth = useSelector(selectUser);
  const editError = useSelector(selectUserCreateError);

  const blurHandler = (e) => {
    switch (e.target.name) {
      case "addBalance": {
        setErrorSum(checkInputValues("payment", sum));
        break;
      }
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

  const handleAddSum = (e) => {
    e.preventDefault();

    sendRequest("http://localhost/api/balance", "POST", {balance: sum}).then((data) => {
      if (typeof data[0] === "string") {
        setErrorSumApi(data[0]);
      } else {
        setErrorSumApi("");
        dispatch(getUser());
      }
    });

    setSum("");
  };

  const handleEditUser = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!errorName && !errorSurname && !errorEmail && !errorPassword) {
      dispatch(authEdit(userAuth.id, { name, surname, email, password }));

      setName("");
      setSurname("");
      setEmail("");
      setPassword("");
    } else {
      console.log("ERROR");
    }
  }

  const onLogout = () => {
    dispatch(unAuthUser());
    setAuthed(false);
  };

  return (
    <div className={styles.profiler}>
      <div className={styles.profBox}>
        <form className={styles.profForm} onSubmit={handleAddSum}>
          { !Object.keys(userAuth)?.length ? (
            <div className={styles.profHead}>
              <ReactLoading type="bubbles" color="#fff" height={41} width={41} />
            </div>
          ) : (
            <h4 className={styles.profHead}>{userAuth?.surname} {userAuth?.name}</h4>
          ) }
          <p className={styles.profLabel}>Добавить сумму:</p>
          <Input
            type="number"
            className={!errorSum ? styles.balanceInput : `${styles.balanceInput} ${styles.balanceInputError}`}
            value={sum}
            placeholder="Введите сумму"
            step="0.01"
            name="addBalance"
            onBlur={blurHandler}
            onChange={(event) => setSum(event.target.value)}
          />
          <SubmitButton 
            className={styles.addBalanceButton}
            name="Отправить"
            disabled={!sum}
          />
          { errorSumApi && <span className={styles.editError}>{errorSumApi}</span> }
        </form>
        <div className={styles.balancePosition}>
          <Balance />
        </div>
      </div>
      <div className={styles.profEditBlock}>
        <form className={styles.profEditForm} onSubmit={handleEditUser}>
          <h3 className={styles.profEditTitle}>Редактировать профиль</h3>
          <div className={styles.profEditInputTop}>
            <InputAuth
              id="editName"
              labelName="Имя:"
              error={errorName}
              type="text"
              name="name"
              value={name}
              onBlur={blurHandler}
              onChange={(e) => setName(e.target.value)}
              placeholder={userAuth?.name}
            />
            <InputAuth
              id="editSurname"
              labelName="Фамилия:"
              error={errorSurname}
              type="text"
              name="surname"
              value={surname}
              onBlur={blurHandler}
              onChange={(e) => setSurname(e.target.value)}
              placeholder={userAuth?.surname}
            />
          </div>
          <div className={styles.profEditInputBottom}>
            <InputAuth
              id="editEmail"
              labelName="E-mail:"
              error={errorEmail}
              type="email"
              name="email"
              value={email}
              onBlur={blurHandler}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={userAuth?.email}
            />
            <InputAuth
              id="editPassword"
              labelName="Пароль:"
              error={errorPassword}
              type="password"
              name="password"
              value={password}
              onBlur={blurHandler}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••"
            />
          </div>
          <div className={styles.profEditButtons}>
            <SubmitButton
              className={styles.profEditUser}
              name="Изменить"
              disabled={!name | !surname | !email | !password}
            />
            <SubmitButton
              className={styles.profLogout}
              name="Выход"
              type="button"
              onClick={onLogout}
            />
          </div>
          { editError && <span className={styles.editError}>{editError}</span> }
        </form>
      </div>
    </div>
  );
}
