<template>
  <div class="pie-chart">
    <canvas :id="name"></canvas>

    <div class="info">
      <div class="text-center">
        <div class="label">
          <slot name="label"></slot>
        </div>

        <div class="count">
          <slot name="count"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from "chart.js/auto";

export default {
  name: "PieChart",

  props: {
    name: {
      type: String,
      required: true,
    },

    stats: {
      type: Array,
      required: true,
    },
  },

  computed: {
    labels() {
      return this.stats.map((stat) => stat.label);
    },

    count() {
      return this.stats.map((stat) => stat.count);
    },

    color() {
      return this.stats.map((stat) => stat.color.rgba);
    },
  },

  mounted() {
    const ctx = document.getElementById(this.name);
    new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: this.labels,
        datasets: [
          {
            label: "# of Forms",
            data: this.count,
            backgroundColor: this.color,
            borderColor: "#fff",
            borderRadius: 4,
            cutout: 70,
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
  width: 186px;
  height: 186px;
  margin-top: 24px;
  position: relative;

  .info {
    z-index: 0;
    position: absolute;
    left: calc(50% - 45px);
    top: calc(50% - 45px);
    width: 90px;
    height: 90px;
    display: flex;
    align-items: center;
    justify-content: center;

    .label {
      color: $gray-5;
      font-size: 12px;
    }

    .count {
      color: $gray-10;
      font-size: 24px;
      font-weight: bold;
    }
  }
}
</style>
