import styles from "./Profile.module.css";
export function Profile() {
    return(
        <div className={styles.profiler} >
            <div>
                <div className={styles.prof_head}>
        <h4 className={styles.prof_title}>ИВАНОВ ИВАН</h4>
        </div>
        <div>
        <p className={styles.prof_amount}>ДОБАВИТЬ СУММУ</p>
        <p> <input type="number" name="number" placeholder="Введите сумму" className={styles.prof_amount_input}/></p>
        <button type="submit"className={styles.amount_btn} >Отправить</button>
        <hr className={styles.amount_line} />
        </div></div>
        <h3 className={styles.prof_input_tittle}>Редактировать профиль</h3>
        <div className={styles.prof_input_block}>
         <div className={styles.prof_input_top_area}>
                    
        <div className={styles.prof_form_group}>
        
                            <p className={styles.prof_input_heading}>Имя:</p>
                            <input type="text" name="firstname"  placeholder="Иван" className={styles.input_element_left} />
                        </div>
                        
                           <div className={styles.form_group}>
                            <p className={styles.prof_input_heading}>Email:</p>
                            <input type="email" name="email" placeholder="mail@mail.ru" className={styles.input_element_left} />
                           
                        </div>
                    </div>
                    <div className={styles.input_bottom_area}>
                    <div className={styles.form_group}>
                            <p className={styles.prof_input_heading}>Фамилия:</p>
                            <input type="text" name="secondname"  placeholder="Иванов" className={styles.input_element_right} />
                        </div>
                        
                        <div className={styles.form_group}>
                            <p className={styles.prof_input_heading}>Пароль:</p>
                            <input type="password" name="password"  placeholder="••••••••••" className={styles.input_element_right} />
                            
                        </div>
                        </div>
                        <div className={styles.prof_btn_block}>
                        <button className={styles.prof_edit_btn_left}>Изменить</button>
                        <button className={styles.prof_out_btn}>Выход</button>   
                        </div>
                       
                    
                    </div>
        
        </div>
        
        
        );
}

