import { useState } from "react";
import { Modal } from "../Modal/Modal";
import styles from "./PaymentList.module.css";

export const PaymentList = ({ paymentList, categoryList, editPayment, deletePayment }) => {
  const [active, setActive] = useState(false);
  const [paymentInfo, setPaymentInfo] = useState();
  const [showEdit, setShowEdit] = useState();

  const getDate = (date) => {
    const paymentDate = new Date(date);

    const editDate = {
      year: paymentDate.getFullYear(),
      month: paymentDate.getMonth() + 1,
      day: paymentDate.getDate() < 10 ? "0" + paymentDate.getDate() : paymentDate.getDate()
    }

    return `${editDate.year}-${editDate.month}-${editDate.day}`;
  };

  const handleEditPayment = (payment) => {
    setPaymentInfo({
      ...payment,
      created_at: getDate(payment.created_at)
    });

    setShowEdit();
    setActive(true);
  };

  const handleDeletePayment = (payment) => {
    deletePayment({ id: payment.id, sum: payment.sum });

    setShowEdit();
  };

  return (
    <>
      <div className={styles.expenses}>
        { paymentList?.map((payment, idx) => (
          <div className={styles.expItem} key={idx} >
            <div className={styles.expLeft}>
              <div className={styles.expIcon}>
                {/* <img src={`/images/${payment.category.img_name}`} alt="" /> */}
                <img src={`/images/${categoryList[payment.category_id - 1].img.img_name}`} alt="" />
              </div>
              <div className={styles.expTexts}>
                <p className={styles.expName}>{payment.name}</p>
                <p className={styles.expCategory}>{payment.category.name}</p>
              </div>
            </div>
            <div className={styles.expRight}>
              <p className={styles.expSum}>- {payment.sum.toLocaleString()},00 &#8381;</p>
              <button type="button" className={styles.expBtnEdit} onClick={() => setShowEdit(payment.id)}><img src="/images/Edit.png" alt="" /></button>
              { payment.id === showEdit &&
                <div className={styles.expShowEditDelete}>
                  <button type="button" onClick={() => handleEditPayment(payment)}>
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4.92665 12.0234L2.662 9.75586L10.6454 1.76074L12.91 4.02832L4.92665 12.0234ZM2.11415 10.9014L3.78114 12.5713L1.46083 13.2246L2.11415 10.9014ZM14.1786 3.60645L11.0673 0.489258C10.8417 0.263672 10.4462 0.263672 10.2206 0.489258L1.39345 9.33105C1.3202 9.4043 1.26747 9.49219 1.2411 9.5918L0.0223533 13.9277C-0.0362404 14.1357 0.0223533 14.3613 0.174697 14.5137C0.288955 14.6279 0.517471 14.71 0.760635 14.666L5.09071 13.4443C5.19032 13.418 5.27821 13.3652 5.35145 13.292L14.1786 4.45312C14.413 4.21875 14.413 3.84082 14.1786 3.60645Z" fill="#8A7C7C"/>
                    </svg>
                    <span>Изменить</span>
                  </button>
                  <button type="button" onClick={() => handleDeletePayment(payment)}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7.17495 6L10.7583 2.425C10.9152 2.26808 11.0034 2.05525 11.0034 1.83333C11.0034 1.61141 10.9152 1.39859 10.7583 1.24167C10.6014 1.08475 10.3885 0.99659 10.1666 0.99659C9.9447 0.99659 9.73187 1.08475 9.57495 1.24167L5.99995 4.825L2.42495 1.24167C2.26803 1.08475 2.0552 0.99659 1.83328 0.99659C1.61136 0.99659 1.39854 1.08475 1.24162 1.24167C1.0847 1.39859 0.996539 1.61141 0.996539 1.83333C0.996539 2.05525 1.0847 2.26808 1.24162 2.425L4.82495 6L1.24162 9.575C1.16351 9.65247 1.10151 9.74463 1.05921 9.84618C1.0169 9.94773 0.995117 10.0567 0.995117 10.1667C0.995117 10.2767 1.0169 10.3856 1.05921 10.4871C1.10151 10.5887 1.16351 10.6809 1.24162 10.7583C1.31908 10.8364 1.41125 10.8984 1.5128 10.9407C1.61435 10.983 1.72327 11.0048 1.83328 11.0048C1.94329 11.0048 2.05221 10.983 2.15376 10.9407C2.25531 10.8984 2.34748 10.8364 2.42495 10.7583L5.99995 7.175L9.57495 10.7583C9.65242 10.8364 9.74459 10.8984 9.84614 10.9407C9.94768 10.983 10.0566 11.0048 10.1666 11.0048C10.2766 11.0048 10.3855 10.983 10.4871 10.9407C10.5886 10.8984 10.6808 10.8364 10.7583 10.7583C10.8364 10.6809 10.8984 10.5887 10.9407 10.4871C10.983 10.3856 11.0048 10.2767 11.0048 10.1667C11.0048 10.0567 10.983 9.94773 10.9407 9.84618C10.8984 9.74463 10.8364 9.65247 10.7583 9.575L7.17495 6Z" fill="#8A7C7C"/>
                    </svg>
                    <span>Удалить</span>
                  </button>
                </div> }
            </div>
          </div>
        )) }
        { active && <Modal active={active} setActive={setActive} categoryList={categoryList} editPayment={editPayment} paymentInfo={paymentInfo} /> }
      </div>
    </>
  );
};
