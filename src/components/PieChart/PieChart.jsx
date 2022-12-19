import styles from "./PieChart.module.css";
import { Chart } from "chart.js/auto";
import { Pie } from "react-chartjs-2";
import { Colors } from "chart.js";
Chart.register(Colors);
Chart.defaults.color = "#fff";

export const PieChart = ({ chartData }) => {
  return (
    <div className={styles.pieChart}>
      <Pie
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
