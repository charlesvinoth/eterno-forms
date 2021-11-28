<template>
  <div class="pie-chart">
    <div class="total">
      <div class="text-center">
        <div class="label">Total Forms</div>
        <div class="count">24</div>
        <div class="label">100%</div>
      </div>
    </div>
    <canvas id="pieChart"></canvas>
  </div>
</template>

<script>
import Chart from "chart.js/auto";

export default {
  name: "PieChart",

  mounted() {
    const ctx = document.getElementById("pieChart");
    new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["All", "Published", "Draft", "Archive", "Trash", "Favourite"],
        datasets: [
          {
            label: "# of Forms",
            data: [9, 5, 3, 7, 6],
            backgroundColor: [
              "rgba(37, 204, 201, 0.5)",
              "rgba(249, 119, 103, 0.5)",
              "rgba(66, 165, 245, 0.5)",
              "rgba(236, 64, 122, 0.5)",
              "rgba(255, 193, 7, 0.5)",
            ],
            borderColor: "#fff",
            borderRadius: 4,
            cutout: 90,
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
            display: false,
          },
          x: {
            display: false,
          },
        },
      },
    });
  },
};
</script>

<style lang="scss" scoped>
.pie-chart {
  width: 240px;
  height: 240px;
  position: relative;

  .total {
    position: absolute;
    left: calc(50% - 40px);
    top: calc(50% - 40px);
    width: 80px;
    height: 80px;
    border-radius: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    .label {
      color: $gray-5;
      font-size: 12px;
    }

    .count {
      color: $gray-8;
      font-size: 24px;
      font-weight: bold;
    }
  }
}
</style>
