export const PaymentList = ({ paymentList }) => {
    return (
        <>
            <div>
                <h1>Your Payment List:</h1>
                <div>
                    <div style={{display: 'flex', gap: '100px'}}>
                        <div>ID</div>
                        <div>Date</div>
                        <div>Category</div>
                        <div>Amount</div>
                    </div>
                    <div>
                        {paymentList.map((payment, idx) => (
                            <div style={{display: 'flex', gap: '100px'}} key={idx}>
                                <p>{payment.id}</p>
                                <p>{payment.date}</p>
                                <p>{payment.category}</p>
                                <p>{payment.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};
