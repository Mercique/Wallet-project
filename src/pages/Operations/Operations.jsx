import styles from "./Operations.module.css";
import { PaymentForm } from "../../components/PaymentForm/PaymentForm";
import { Payment } from "../../components/Payment/Payment";
import { useEffect, useState } from "react";
import { Balance } from "../../components/Balance/Balance";
import { useDispatch, useSelector } from "react-redux";
import { sortPayments } from "../../store/payments/actions";
import { apiPayments, getMonthName } from "../../utils/constants";
import { ChartBox } from "../../components/ChartBox/ChartBox";
import { selectPayments } from "../../store/payments/selectors";
import { selectShowModal } from "../../store/modal/selectors";
import { SortSlider } from "../../components/SortSlider/SortSlider";
import { selectCategory } from "../../store/category/selectors";

export const Operations = () => {
  const [categoryEdit, setCategoryEdit] = useState("");

  const dispatch = useDispatch();
  const categoryList = useSelector(selectCategory);
  const paymentList = useSelector(selectPayments);
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

  const sortedPayments = (list) => {
    let arr = [];

    for (let key of Object.keys(list)) {
      arr.push(...list[key]);
    }

    return arr;
  };

  const getSortPayments = (list) => {
    let arr = sortedPayments(list);
    let uniqObj = {};

    arr.forEach((el) => {
      uniqObj[el.categoryName] = (uniqObj[el.categoryName] || 0) + el.sum;
    });

    return uniqObj;
  };

  const getSortDateSum = (list) => {
    let arr = sortedPayments(list);
    let uniqObj = {};

    arr.reverse().forEach((el) => {
      uniqObj[getMonthName(el.created_at)] = (uniqObj[getMonthName(el.created_at)] || 0) + el.sum;
    });

    return uniqObj;
  };

  const doughnutList = getSortPayments(paymentList);
  const barList = getSortDateSum(paymentList);

  useEffect(() => {
    if (!closeModal) {
      setCategoryEdit("");
    }
  }, [closeModal]);

  return (
    <div className={styles.operations}>
      <div className={styles.operationsLeft}>
        <SortSlider
          categoryList={categoryList}
          categoryEdit={categoryEdit}
          handleActive={handleActive}
        />
        <div className={styles.operationsMiddle}>
          <PaymentForm />
          <Payment />
        </div>
      </div>
      <div className={styles.operationsRight}>
        <Balance />
        <ChartBox chart="Doughnut" list={doughnutList} />
        <ChartBox chart="Bar" list={barList} />
      </div>
    </div>
  );
};
