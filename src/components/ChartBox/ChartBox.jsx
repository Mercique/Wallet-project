import styles from "./ChartBox.module.css";
import { Chart } from "chart.js/auto";
import { Doughnut, Bar } from "react-chartjs-2";
import { Colors } from "chart.js";
Chart.register(Colors);
Chart.defaults.color = "#fff";

export const ChartBox = ({ chart, list }) => {
  const chartData = {
    labels: Object.keys(list).map((key) => key),
    datasets: [
      {
        label: chart === "Doughnut" ? "Всего расходов" : "Сумма расходов в день",
        data: Object.values(list).map((sum) => sum),
        borderColor: "transparent",
      },
    ],
  };

  const options = {
    plugins: {
      colors: {
        forceOverride: true,
      },
    },
  };

  return (
    <div className={styles.chartBox}>
      { chart === "Doughnut" ? (
        <Doughnut data={chartData} options={options} />
      ) : (
        <Bar style={{display: Object.keys(list).length === 0 && "none"}} data={chartData} options={{ backgroundColor: "#f76283" }} />
      ) }
    </div>
  );
};
