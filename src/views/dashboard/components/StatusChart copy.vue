<template>
  <div class="status-chart">
    <canvas :id="type"></canvas>
  </div>
</template>

<script>
import { capitalize } from "lodash-es";

import Chart from "chart.js/auto";

export default {
  name: "StatusChart",

  props: {
    type: {
      type: String,
      default: "bar",
    },
  },

  computed: {
    chartType() {
      return `${capitalize(this.type)} Chart`;
    },
  },

  mounted() {
    const ctx = document.getElementById(this.type);
    const chart = new Chart(ctx, {
      type: this.type,
      data: {
        labels: ["All", "Published", "Draft", "Archive", "Trash", "Favourite"],
        datasets: [
          {
            label: "# of Forms",
            data: [24, 9, 5, 3, 7, 6],
            backgroundColor: [
              "#4849a1",
              "#25ccc9",
              "#f97767",
              "#42a5f5",
              "#ec407a",
              "#ffc107",
            ],
            barThickness: 24,
            borderRadius: 4,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        plugins: {
          legend: {
            title: {
              display: true,
              text: this.chartType,
              color: "#334155",
              font: { weight: "bold" },
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: "#f1f5f9",
              borderColor: "#e2e8f0",
            },
            ticks: {
              color: "#64748b",
            },
          },
          x: {
            grid: {
              color: "#f1f5f9",
              borderColor: "#e2e8f0",
            },
            ticks: {
              color: "#64748b",
            },
          },
        },
      },
    });
    console.log(chart);
  },
};
</script>

<style lang="scss" scoped>
.status-chart {
  background-color: white;
  border: 1px solid $gray-2;
  border-radius: 24px;
  box-shadow: 0 1px 2px 0 rgba(15, 23, 42, 0.05) !important;
  padding: 24px;
  height: 300px;
}
</style>
