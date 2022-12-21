import styles from "./Profile.module.css";
import { useDispatch, useSelector } from "react-redux";
import { unAuthUser } from "../../store/profile/actions";
import { selectUser } from "../../store/profile/selectors";
import { InputAuth } from "../../components/InputAuth/InputAuth";
import { useState } from "react";
import { sendRequest } from "../../utils/asyncActions";
import { getUser } from "../../store/profile/actions";
import { Balance } from "../../components/Balance/Balance";

export function Profile() {
  const [sum, setSum] = useState("");

  const dispatch = useDispatch();
  const userAuth = useSelector(selectUser);

  const onLogout = () => {
    dispatch(unAuthUser());
  };

  const handleAddSum = () => {
    const num = {
      balance: sum,
    };

    sendRequest("http://localhost/api/balance", "POST", num).then((data) =>
      dispatch(getUser())
    );

    setSum("");
  };

  return (
    <div className={styles.profiler}>
      <div className={styles.profBox}>
        <h4 className={styles.prof_head}>
          {userAuth?.surname} {userAuth?.name}
        </h4>
        <InputAuth
          id="addSum"
          labelName="ДОБАВИТЬ СУММУ:"
          error={""}
          name="value"
          type="number"
          value={sum}
          step="0.01"
          // onBlur={blurHandler}
          onChange={(e) => setSum(e.target.value)}
          placeholder="Введите сумму"
        />
        {/* <input
            type="number"
            name="number"
            placeholder="Введите сумму"
            className={styles.prof_amount_input}
          /> */}
        <button
          type="button"
          className={styles.amount_btn}
          onClick={handleAddSum}
          disabled={!sum}
        >
          Отправить
        </button>
      </div>
      <Balance />
      <hr className={styles.amount_line} />
      <h3 className={styles.prof_input_tittle}>Редактировать профиль</h3>
      <div className={styles.prof_input_block}>
        <div className={styles.prof_input_top_area}>
          <div className={styles.prof_form_group}>
            <p className={styles.prof_input_heading}>Имя:</p>
            <input
              type="text"
              name="firstname"
              placeholder="Иван"
              className={styles.input_element_left}
            />
          </div>
          <div className={styles.form_group}>
            <p className={styles.prof_input_heading}>Email:</p>
            <input
              type="email"
              name="email"
              placeholder="mail@mail.ru"
              className={styles.input_element_left}
            />
          </div>
        </div>
        <div className={styles.input_bottom_area}>
          <div className={styles.form_group}>
            <p className={styles.prof_input_heading}>Фамилия:</p>
            <input
              type="text"
              name="secondname"
              placeholder="Иванов"
              className={styles.input_element_right}
            />
          </div>
          <div className={styles.form_group}>
            <p className={styles.prof_input_heading}>Пароль:</p>
            <input
              type="password"
              name="password"
              placeholder="••••••••••"
              className={styles.input_element_right}
            />
          </div>
        </div>
        <div className={styles.prof_btn_block}>
          <button className={styles.prof_edit_btn_left}>Изменить</button>
          <button className={styles.prof_out_btn} onClick={onLogout}>
            Выход
          </button>
        </div>
      </div>
    </div>
  );
}
