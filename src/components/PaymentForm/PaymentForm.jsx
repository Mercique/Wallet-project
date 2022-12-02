import styles from "./PaymentForm.module.css";
import { useState } from "react";

export const PaymentForm = ({ addNewPayment, paymentList, categoryList, balance }) => {
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState(1);
  const [openOption, setOpenOption] = useState(false);

  const getCurrentDate = (date) => {
    const today = new Date();

    if (date) {
      return `${date}T${today.toLocaleTimeString()}`;
    } else {
      return `${today.toLocaleDateString()}T${today.toLocaleTimeString()}`;
    }
  };

  const resetForm = (e) => {
    let inputsValues = e.target.elements;
    inputsValues.name.value = ''
    inputsValues.value.value = ''
    inputsValues.date.value = ''
    setName("");
    setValue("");
    setDate("");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
    addNewPayment({
      sum: +value,
      name,
      category_id: +category,
      categoryName: categoryList[+category - 1].name,
      categoryImgName: categoryList[+category - 1].img.img_name,
      created_at: date ? getCurrentDate(date) : getCurrentDate(null)
    });

    resetForm(e);
  }

  return (
    <>
      <div className={styles.contentWrapper}>
        <form onSubmit={handleSubmit} className={styles.paymentInputForm}>
          <div className={styles.inputBox}>
            <input className={styles.expensesInput} type="number" name="value" placeholder="Введите сумму" onChange={(event) => setValue(event.target.value)}/>
            <input className={styles.expensesInput} type="text" name="name" placeholder="Введите название" onChange={(event) => setName(event.target.value)}/>
          </div>
          <div className={styles.inputBox}>
            { categoryList?.error ? (
              <div className={styles.categoryError}>
                <span style={({color: "red"})}>{categoryList.name}</span>
                <svg width="26" height="15" viewBox="0 0 26 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_223_96)">
                    <path d="M14.847 11.5709C14.9785 11.4953 15.0886 11.4122 15.1851 11.3255L25.2627 5.51156C26.2453 4.94413 26.2462 4.02424 25.2627 3.45653C24.2791 2.88964 22.6851 2.8891 21.7006 3.45653L13.0226 8.46362L4.29844 3.43124C3.31488 2.86408 1.72087 2.86381 0.73685 3.43124C0.245774 3.71536 -0.000930084 4.08693 2.63482e-06 4.45849C-0.000930084 4.83032 0.245774 5.20215 0.737783 5.4852L10.8592 11.3253C10.9557 11.4122 11.0667 11.495 11.1992 11.5709C11.7019 11.861 12.3632 12.0006 13.0226 11.9939C13.6811 12.0009 14.3443 11.861 14.847 11.5709Z" fill="#B91C1C"/>
                  </g>
                  <defs>
                    <clipPath id="clip0_223_96">
                    <rect width="26" height="15" fill="white"/>
                    </clipPath>
                  </defs>
                </svg>
              </div>
            ) : (
              <details className={styles.categoryDetails}  open={openOption} onClick={(e) => {e.preventDefault();setOpenOption(!openOption);}}>
                <summary className={styles.categorySummary}>
                  <span>{categoryList[+category - 1]?.name}</span>
                  <svg width="26" height="15" viewBox="0 0 26 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_223_96)">
                      <path d="M14.847 11.5709C14.9785 11.4953 15.0886 11.4122 15.1851 11.3255L25.2627 5.51156C26.2453 4.94413 26.2462 4.02424 25.2627 3.45653C24.2791 2.88964 22.6851 2.8891 21.7006 3.45653L13.0226 8.46362L4.29844 3.43124C3.31488 2.86408 1.72087 2.86381 0.73685 3.43124C0.245774 3.71536 -0.000930084 4.08693 2.63482e-06 4.45849C-0.000930084 4.83032 0.245774 5.20215 0.737783 5.4852L10.8592 11.3253C10.9557 11.4122 11.0667 11.495 11.1992 11.5709C11.7019 11.861 12.3632 12.0006 13.0226 11.9939C13.6811 12.0009 14.3443 11.861 14.847 11.5709Z" fill="#604B4B"/>
                    </g>
                    <defs>
                      <clipPath id="clip0_223_96">
                      <rect width="26" height="15" fill="white"/>
                      </clipPath>
                    </defs>
                  </svg>
                </summary>
                <div className={styles.detailsBox}>
                  <div className={styles.detailsBoxScroll}>
                    <div className={styles.detailsBoxOptions}>
                      { categoryList?.map((category, idx) => (
                        <button type="button" id={category.id} onClick={(event) => {setCategory(event.target.id); setOpenOption(!openOption)}} key={idx}>{category.name}</button>
                      )) }
                    </div>
                  </div>
                </div>
              </details>
            ) }
            {/* <select
              className={styles.expensesInput}
              name="category"
              onChange={(event) => setCategory(event.target.value)}
            >
              { categoryList?.map((category, idx) => (
                <option value={category.id} key={idx}>{category.name}</option>
              )) }
            </select> */}
            <input className={styles.expensesInput} type="date" name="date" onChange={(event) => setDate(event.target.value)}/>
          </div>
          <button className={styles.addSpendButton} disabled={!name | !value | categoryList?.error | paymentList?.error} >
            <span>Добавить трату</span>
          </button>
        </form>
        <div className={styles.balance}>
          <p className={styles.balanceLabel}>Баланс:</p>
          <p className={styles.whiteText}>{balance.toLocaleString()},00 &#8381;</p>
        </div>
      </div>
    </>
  );
};