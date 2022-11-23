import "./PaymentList.css";

export const PaymentList = ({ paymentList }) => {
  return (
    <>
      <div className="expenses">
        {paymentList.map((payment, idx) => (
          <div key={idx} className="expenses-item">
            <div className="expenses-left">
              <div className="exp-icon">
                <img src="" alt="" />
              </div>
              <div className="exp-texts">
                {/* изменить стилистику Date */}
                <p className="exp-name">{payment.date}</p>
                <p className="exp-name">{payment.name}</p>
                <p className="exp-category">{payment.category}</p>
              </div>
            </div>
            <div className="expenses-right">
              <p className="exp-sum">{payment.value}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
