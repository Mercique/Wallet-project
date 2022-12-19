import styles from "./PieChart.module.css";
import { useSelector } from "react-redux";
import { Chart } from "chart.js/auto";
import { Pie } from "react-chartjs-2";
import { selectPayments } from "../../store/payments/selectors";
Chart.defaults.color = '#fff';

export const PieChart = () => {
  const paymentList = useSelector(selectPayments);

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

  const setRgb = () => {
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);

    return "rgb(" + r + "," + g + "," + b + ")";
  };

  const getRandomColors = (list) => {
    let arr = [];
    console.log(list);
    for (let i = 0; i < Object.keys(list).length; i++) {
      arr[i] = setRgb();
    }
    
    return arr;
  };

  const pieList = getPayments(paymentList);
  const pieColors = getRandomColors(pieList);

  const chartData = {
    labels: Object.keys(pieList).map(el => el),
    datasets: [
      {
        label: "Payments",
        data: Object.values(pieList).map(el => el),
        backgroundColor: pieColors.map((color) => color),
        borderColor: pieColors.map((color) => color),
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className={styles.pieChart}>
      <h2 style={{ textAlign: "center", color: "#fff" }}>Payments chart</h2>
      <Pie
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              // text: "Users Gained between 2016-2020",
            },
          },
        }}
      />
    </div>
  );
};
