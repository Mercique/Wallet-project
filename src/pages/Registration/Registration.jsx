import styles from "./Registration.module.css";

export const Registration = () => {
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
                <input type="email" name="email" id="email" placeholder="Введите email" className={styles.input_element} />
              </div>
              <div className={styles.password_form}>
                <p className={styles.input_heading}>Пароль</p>
                <input type="password" name="password" id="password" placeholder="Введите пароль" className={styles.input_element} />
              </div>
            </div>
            <div className={styles.btn_area}>
              <div className={styles.enter_btn}>Войти</div>
            </div>
            <div className={styles.subtext_area}>
              <p className={styles.subtext_text}>Забыли пароль?</p>
              <p className={styles.subtext_text}>Регистрация</p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};