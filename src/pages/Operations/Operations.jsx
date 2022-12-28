import styles from "./Operations.module.css";
import { PaymentForm } from "../../components/PaymentForm/PaymentForm";
import { Payment } from "../../components/Payment/Payment";
import { useEffect, useState } from "react";
import { Balance } from "../../components/Balance/Balance";
import { useDispatch, useSelector } from "react-redux";
import { sortPayments } from "../../store/payments/actions";
import { apiPayments } from "../../utils/constants";
import { ChartBox } from "../../components/ChartBox/ChartBox";
import { selectPayments, selectPaymentsError, selectPaymentsLoading } from "../../store/payments/selectors";
import { selectShowModal } from "../../store/modal/selectors";
import { Slider } from "../../components/Slider/Slider";
import { selectCategory, selectCategoryError, selectCategoryLoading } from "../../store/category/selectors";
import ReactLoading from "react-loading";

export const Operations = () => {
  const [categoryEdit, setCategoryEdit] = useState("");

  const dispatch = useDispatch();
  const categoryList = useSelector(selectCategory);
  const categoryLoading = useSelector(selectCategoryLoading);
  const categoryError = useSelector(selectCategoryError);
  const paymentList = useSelector(selectPayments);
  const paymentListLoading = useSelector(selectPaymentsLoading);
  const paymentListError = useSelector(selectPaymentsError);
  const closeModal = useSelector(selectShowModal);

  const handleActive = (el) => {
    if (el.id !== categoryEdit?.id) {
      setCategoryEdit({ id: el.id, name: el.name, img_id: el.img_id });
      dispatch(sortPayments(`${apiPayments}/${el.id}`));
    } else {
      setCategoryEdit("");
      dispatch(sortPayments(apiPayments));
    }
  };

  const sortedArray = (list) => {
    let arr = [];

    for (let key in list) {
      arr.push(...list[key]);
    }

    return arr;
  };

  const getSortPayments = (list) => {
    let arr = sortedArray(list);

    let sortPayments = arr.reduce((acc, cur) => {
      acc[`${cur.categoryName}`] = (acc[cur.categoryName] || 0) + cur.sum;
      return acc;
    }, {});

    return sortPayments;
  };

  const getSortDate = (list) => {
    let arr = sortedArray(list);

    let sortDate = arr.reverse().reduce((acc, cur) => {
      acc[`${cur.created_at.slice(0, 10)}`] = (acc[cur.created_at.slice(0, 10)] || 0) + cur.sum;
      return acc;
    }, {});

    return sortDate;
  };

  const doughnutList = getSortPayments(paymentList);
  const barList = getSortDate(paymentList);

  useEffect(() => {
    if (!closeModal) {
      setCategoryEdit("");
    }
  }, [closeModal]);

  return (
    <div className={styles.operations}>
      <div className={styles.operationsLeft}>
        { categoryLoading || categoryError ? (
          <div style={{ width: "142px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <ReactLoading type="spin" color="#fff" height={60} width={60} />
          </div>
        ) : (
          <Slider
            categoryList={categoryList}
            categoryEdit={categoryEdit}
            handleActive={handleActive}
          />
        ) }
        <div className={styles.operationsMiddle}>
          <PaymentForm />
          <Payment />
        </div>
      </div>
      { paymentListLoading || paymentListError ? (
        <div style={{ width: "444px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <ReactLoading type="spin" color="#fff" height={100} width={100} />
        </div>
      ) : (
        <div className={styles.operationsRight}>
          <Balance />
          <ChartBox chart="Doughnut" list={doughnutList} />
          <ChartBox chart="Bar" list={barList} />
        </div>
      ) }
    </div>
  );
};
