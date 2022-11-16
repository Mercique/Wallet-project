import "./PaymentList.css";

export const PaymentList = ({ paymentList }) => {
    return (
        <>
            <div className="expenses-list">
                <div className="expenses-wrapper">
                    <div className="list-wrapper">
                        <h1 className="big-text">Список трат</h1>
                    </div>
                    <div>
                        <div style={{ display: 'flex', gap: '100px' }}>
                            <div>ID</div>
                            <div>Дата</div>
                            <div>Категория</div>
                            <div>Сумма</div>
                        </div>
                        <div>
                            {paymentList.map((payment, idx) => (
                                <div style={{ display: 'flex', gap: '100px' }} key={idx}>
                                    <p>{payment.id}</p>
                                    <p>{payment.date}</p>
                                    <p>{payment.category}</p>
                                    <p>{payment.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
