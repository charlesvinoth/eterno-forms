<template>
  <div class="line-chart">
    <canvas id="lineChart"></canvas>
  </div>
</template>

<script>
import Chart from "chart.js/auto";

export default {
  name: "LineChart",

  data() {
    return {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    };
  },

  mounted() {
    const ctx = document.getElementById("lineChart");
    new Chart(ctx, {
      type: "line",
      data: {
        labels: this.labels,
        datasets: [
          {
            label: "Submissions",
            data: [16, 5, 9, 0, 57, 23, 14, 32, 18, 11, 0, 51],
            backgroundColor: ["#4849a1", "#f97767", "#25ccc9"],
            borderColor: "#f1f5f9",
            borderRadius: 4,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: false,
          },
        },
        maintainAspectRatio: false,
        scales: {
          y: {
            grid: {
              borderColor: "#e2e8f0",
              color: "#f1f5f9",
            },
            ticks: {
              color: "#94a3b8",
            },
          },
          x: {
            grid: {
              borderColor: "#e2e8f0",
              color: "#f1f5f9",
            },
            ticks: {
              color: "#94a3b8",
            },
          },
        },
      },
    });
  },
};
</script>

<style lang="scss" scoped>
.line-chart {
  width: 66%;
  background-color: white;
  border: 1px solid $gray-2;
  border-radius: 24px;
  box-shadow: 0 1px 2px 0 rgba(15, 23, 42, 0.05) !important;
  padding: 24px;
}
</style>
