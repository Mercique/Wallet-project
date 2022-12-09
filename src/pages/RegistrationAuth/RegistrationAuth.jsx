import styles from "./RegistrationAuth.module.css";

export const RegistrationAuth = () => {
    return (
        <div className={styles.reg_wrapper}>
            <div className={styles.reg_card}>
                <div className={styles.reg_head}>
                    <h4 className={styles.reg_title}>Регистрация</h4>
                    <p className={styles.reg_text}>У меня есть аккаунт</p>
                </div>
                <div className={styles.input_block}>
                    <div className={styles.input_top_area}>
                        <div className={styles.form_group}>
                            <p className={styles.input_heading}>Имя</p>
                            <input type="text" name="name" id="name" placeholder="Введите имя" className={styles.input_element_left} />
                        </div>
                        <div className={styles.form_group}>
                            <p className={styles.input_heading}>Фамилия</p>
                            <input type="text" name="familyname" id="familyname" placeholder="Введите фамилию" className={styles.input_element} />
                        </div>
                    </div>
                    <div className={styles.input_bottom_area}>
                        <div className={styles.form_group}>
                            <p className={styles.input_heading}>Email</p>
                            <input type="email" name="email" id="email" placeholder="Введите email" className={styles.input_element_left} />
                        </div>
                        <div className={styles.form_group}>
                            <p className={styles.input_heading}>Пароль</p>
                            <input type="password" name="password" id="password" placeholder="Введите пароль" className={styles.input_element} />
                        </div>
                    </div>
                    <div className={styles.mails_block}>
                        <div className={styles.mails_wrapper}>
                            <input type="checkbox" name="checkbox" id="checkbox" className={styles.mails_checkbox} />
                            <p className={styles.mails_text} >Я согласен получать обновления на почту</p>
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
