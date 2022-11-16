import "./PaymentForm.css";

export const PaymentForm = ({ addNewPayment }) => {

    const handleSubmit = (e) => {
        e.preventDefault();
        let inputsValues = e.target.elements;
        addNewPayment({
            id: Math.floor(Math.random() * 100000),
            date: inputsValues.date.value,
            category: inputsValues.category.value,
            text: inputsValues.payment.value,
        })
        inputsValues.date.value = ''
        inputsValues.category.value = ''
        inputsValues.payment.value = ''
    }

    return (
        <>
            <div className="content-wrapper">
                <form onSubmit={handleSubmit} className="payment-input-form">
                    <div className="form-top">
                        <input type="text" name="payment" placeholder="Введите сумму" className="expenses_input" />
                        <input type="text" name="category" placeholder="Введите категорию" className="expenses_input" />
                    </div>
                    {/* <div className="calendar_input">
                        <input type="date" name="date" />
                    </div> */}
                    <div className="form-bottom">
                        <button className="add_spend_button">Добавить трату</button>
                    </div>
                    <div className="filter-form">
                        <p className="filter-label">Фильтры:</p>
                        <button className="filter-btn">День</button>
                        <button className="filter-btn">Неделя</button>
                        <button className="filter-btn">Месяц</button>

                    </div>
                </form>
                <div className="balance">
                    <p className="balance-label">Баланс</p>
                    <p className="white-text">143 607,31</p>
                </div>
            </div>
        </>
    )
}
