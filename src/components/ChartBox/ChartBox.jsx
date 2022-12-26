import styles from "./ChartBox.module.css";
import { Chart } from "chart.js/auto";
import { Doughnut, Bar } from "react-chartjs-2";
import { Colors } from "chart.js";
Chart.register(Colors);
Chart.defaults.color = "#fff";

export const ChartBox = ({ chart, list }) => {
  const chartData = {
    labels: Object.keys(list).map((el) => el),
    datasets: [
      {
        label: "Сумма расходов",
        data: Object.values(list).map((el) => el),
        borderColor: "transparent",
      },
    ],
  };

  return (
    <div className={styles.chartBox}>
      { chart === "Doughnut" ? (
        <Doughnut
          data={chartData}
          options={{
            plugins: {
              colors: {
                forceOverride: true,
              },
            },
          }}
        />
      ) : (
        <Bar
          data={chartData}
          options={{
            plugins: {
              colors: {
                forceOverride: true,
              },
            },
          }}
        />
      ) }
    </div>
  );
};
