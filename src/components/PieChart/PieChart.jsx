import styles from "./PieChart.module.css";
import { Chart } from "chart.js/auto";
import { Doughnut } from "react-chartjs-2";
import { Colors } from "chart.js";
Chart.register(Colors);
Chart.defaults.color = "#fff";

export const PieChart = ({ chartData }) => {
  return (
    <div className={styles.pieChart}>
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
    </div>
  );
};
