import styles from "./Operations.module.css";
import { PaymentForm } from "../../components/PaymentForm/PaymentForm";
import { Payment } from "../../components/Payment/Payment";
import { TestSlider } from "../../components/TestSlider/TestSlider";
import { useEffect, useState } from "react";
import { Balance } from "../../components/Balance/Balance";
import { useDispatch, useSelector } from "react-redux";
import { sortPayments } from "../../store/payments/actions";
import { apiPayments } from "../../utils/constants";
import { PieChart } from "../../components/PieChart/PieChart";
import { selectPayments } from "../../store/payments/selectors";

export const Operations = () => {
  const [categoryEdit, setCategoryEdit] = useState("");
  const dispatch = useDispatch();
  const paymentList = useSelector(selectPayments);

  const handleActive = (el) => {
    if (el.id !== categoryEdit?.id) {
      setCategoryEdit({ id: el.id, name: el.name, img_id: el.img_id });
      dispatch(sortPayments(`${apiPayments}/${el.id}`));
    } else {
      setCategoryEdit("");
      dispatch(sortPayments(apiPayments));
    }
  };

  useEffect(() => {
    if (!categoryEdit) {
      dispatch(sortPayments(apiPayments));
    }
  }, [categoryEdit, dispatch]);

  const getPayments = (list) => {
    let arr = [];
    let uniqObj = {};

    for (let key of Object.keys(list)) {
      arr.push(...list[key]);
    }

    arr.forEach((el) => {
      uniqObj[el.categoryName] = (uniqObj[el.categoryName] || 0) + el.sum;
    });

    return uniqObj;
  };

  const pieList = getPayments(paymentList);

  const chartData = {
    labels: Object.keys(pieList).map((el) => el),
    datasets: [
      {
        label: "Payments",
        data: Object.values(pieList).map((el) => el),
        borderColor: "transparent",
      },
    ],
  };

  return (
    <div className={styles.operations}>
      <div className={styles.operationsLeft}>
        <TestSlider
          className={styles.operationsTestSlider}
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
        <PieChart chartData={chartData} />
      </div>
    </div>
  );
};
