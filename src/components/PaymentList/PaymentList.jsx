import "./PaymentList.css";

export const PaymentList = ({ paymentList }) => {
  return (
    <>
      <div className="expenses">
        <div className="expenses-item">
          <div className="expenses-left">
            <div className="exp-icon">
              <img src="" alt="" />
            </div>
            <div className="exp-texts">
              <p className="exp-name">Магазин</p>
              <p className="exp-category">Одежда</p>
            </div>
          </div>
          <div className="expenses-right">
            <p className="exp-sum">-5000,00</p>
          </div>
        </div>
        <div className="expenses-item">
          <div className="expenses-left">
            <div className="exp-icon"></div>
            <div className="exp-texts">
              <p className="exp-name">Интернет</p>
              <p className="exp-category">ЖКХ, связь, интернет</p>
            </div>
          </div>
          <div className="expenses-right">
            <p className="exp-sum">-500,00</p>
          </div>
        </div>
        <div className="expenses-item">
          <div className="expenses-left">
            <div className="exp-icon"></div>
            <div className="exp-texts">
              <p className="exp-name">Процент по вкладу</p>
              <p className="exp-category">Пополнение</p>
            </div>
          </div>
          <div className="expenses-right">
            <p className="exp-sum">+ 15 300,00</p>
          </div>
        </div>
        <div className="expenses-item">
          <div className="expenses-left">
            <div className="exp-icon"></div>
            <div className="exp-texts">
              <p className="exp-name">Оплата обучния</p>
              <p className="exp-category">Образование</p>
            </div>
          </div>
          <div className="expenses-right">
            <p className="exp-sum">- 157 000,00</p>
          </div>
        </div>
        <div className="expenses-item">
          <div className="expenses-left">
            <div className="exp-icon"></div>
            <div className="exp-texts">
              <p className="exp-name">Аптека</p>
              <p className="exp-category">Медицина</p>
            </div>
          </div>
          <div className="expenses-right">
            <p className="exp-sum">- 1 230,00</p>
          </div>
        </div>
      </div>
    </>
  );
};
