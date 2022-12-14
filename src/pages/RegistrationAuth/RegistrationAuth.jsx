import styles from "./RegistrationAuth.module.css";
import { Link } from "react-router-dom";

export const RegistrationAuth = () => {
  return (
    <div className={styles.reg_wrapper}>
      <div className={styles.reg_card}>
        <div className={styles.reg_head}>
          <h4 className={styles.reg_title}>Регистрация</h4>
          <Link to="/" className={styles.reg_text}>
            <span>У меня есть аккаунт</span>
            <svg width="23" height="13" viewBox="0 0 23 13" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 6.72659L20.2264 6.72659L15.6674 11.0874L16.692 12.0674L23 6.03367L16.692 -0.000132561L15.6674 0.979908L20.2264 5.34066L0 5.34066V6.72659Z" fill="#595959" />
            </svg>
          </Link>
        </div>
        <div className={styles.input_block}>
          <div className={styles.input_top_area}>
            <div className={styles.form_group}>
              <p className={styles.input_heading}>Имя</p>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Введите имя"
                className={styles.input_element_left}
              />
            </div>
            <div className={styles.form_group}>
              <p className={styles.input_heading}>Фамилия</p>
              <input
                type="text"
                name="familyname"
                id="familyname"
                placeholder="Введите фамилию"
                className={styles.input_element}
              />
            </div>
          </div>
          <div className={styles.input_bottom_area}>
            <div className={styles.form_group}>
              <p className={styles.input_heading}>Email</p>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Введите email"
                className={styles.input_element_left}
              />
            </div>
            <div className={styles.form_group}>
              <p className={styles.input_heading}>Пароль</p>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Введите пароль"
                className={styles.input_element}
              />
            </div>
          </div>
          <div className={styles.mails_block}>
            <div className={styles.mails_wrapper}>
              <input
                type="checkbox"
                name="checkbox"
                id="checkbox"
                className={styles.mails_checkbox}
              />
              <p className={styles.mails_text}>
                Я согласен получать обновления на почту
              </p>
            </div>
          </div>
          <div className={styles.btn_area}>
            <div className={styles.reg_btn}>Регистрация</div>
          </div>
        </div>
      </div>
    </div>
  );
};
