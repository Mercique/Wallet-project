import styles from "./MainAuth.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";

export const MainAuth = ({ onAuth }) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const handleAuth = () => {
    onAuth({
      name: "Mercique",
      email,
      pass
    });
  };

  return (
    <div className={styles.registration_wrapper}>
      <div className={styles.column_left}>
        <div className={styles.left_textarea}>
          <h3 className={styles.reg_heading}>Добро пожаловать в GBwallet!</h3>
          <p className={styles.reg_text}>Управляйте вашими финансами быстро, эффективно и удобно</p>
        </div>
        <div className={styles.left_imagearea}>
          <img src="/images/main.png" alt="welcome!" className={styles.main_img} />
        </div>
      </div>
      <div className={styles.column_right}>
        <form className={styles.registration_form}>
          <div className={styles.reg_wrapper}>
            <h4 className={styles.registration_title}>Вход</h4>
            <div className={styles.form_area}>
              <div className={styles.email_form}>
                <p className={styles.input_heading}>Email</p>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Введите email"
                  className={styles.input_element}
                />
              </div>
              <div className={styles.password_form}>
                <p className={styles.input_heading}>Пароль</p>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  placeholder="Введите пароль"
                  className={styles.input_element}
                />
              </div>
            </div>
            <div className={styles.btn_area}>
              <div className={styles.enter_btn} onClick={handleAuth}>Войти</div>
            </div>
            <div className={styles.subtext_area}>
              <p className={styles.subtext_text}>Забыли пароль?</p>
              <Link to="/registration" className={styles.registrationLink}>
                <span>Регистрация</span>
                <svg width="23" height="14" viewBox="0 0 23 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 7.6929L20.2264 7.6929L15.6674 12.0537L16.692 13.0337L23 6.99998L16.692 0.966176L15.6674 1.94622L20.2264 6.30697L0 6.30697V7.6929Z" fill="#787878"/>
                </svg>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
