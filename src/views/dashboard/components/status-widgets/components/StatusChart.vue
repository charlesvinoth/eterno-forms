<template>
  <div class="status-chart">
    <canvas id="statusChart"></canvas>

    <div class="info">
      <div class="text-center">
        <div class="label">Total Forms</div>
        <div class="count">{{ stats[0].count }}</div>
        <div class="label">100%</div>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from "chart.js/auto";

import { mapGetters } from "vuex";

export default {
  name: "PieChart",

  computed: {
    ...mapGetters("forms", ["stats"]),

    _stats() {
      // remove the first and the last element, since it is not needed

      const stats = [...this.stats];
      stats.pop();
      stats.shift();

      return stats;
    },

    labels() {
      return this._stats.map((stat) => stat.label);
    },

    count() {
      return this._stats.map((stat) => stat.count);
    },

    color() {
      return this._stats.map((stat) => stat.color.rgba);
    },
  },

  mounted() {
    const ctx = document.getElementById("statusChart");
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
.status-chart {
  width: 186px;
  height: 186px;
  margin-top: 24px;
  position: relative;

  .info {
    z-index: 0;
    position: absolute;
    left: calc(50% - 40px);
    top: calc(50% - 40px);
    width: 80px;
    height: 80px;
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
