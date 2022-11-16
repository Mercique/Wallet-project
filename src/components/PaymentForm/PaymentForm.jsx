
export const PaymentForm = ({addNewPayment}) => {

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
            <form onSubmit={handleSubmit}>
                <input type="text" name="payment" placeholder="Enter your payment"/>
                <input type="text" name="category" placeholder="Enter your category"/>
                <input type="date" name="date"/>
                <button >Add +</button>
            </form>
        </>
    )
}
