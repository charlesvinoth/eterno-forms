<template>
  <div class="status-chart">
    <!-- chart -->

    <div class="chart-wrapper">
      <canvas id="statusChart"></canvas>

      <div class="info">
        <div class="text-center">
          <div class="count">
            {{ stats[0].count }}
          </div>

          <div class="label">Total forms</div>
        </div>
      </div>
    </div>

    <!-- ... -->

    <!-- legend -->

    <div class="legend">Form Statistics</div>

    <!-- ... -->
  </div>
</template>

<script>
import Chart from "chart.js/auto";

import { mapGetters } from "vuex";

export default {
  name: "StatusPieChart",

  computed: {
    ...mapGetters("forms", ["stats"]),

    _stats() {
      // remove the first and the last element, since it is not needed

      const stats = [...this.stats];
      stats.shift();
      stats.pop();

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
            data: this.count,
            backgroundColor: this.color,
            borderColor: "#fff",
            borderRadius: 4,
            cutout: 75,
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
  background-color: white;
  border: 1px solid $gray-2;
  border-radius: 24px;
  box-shadow: 0 1px 2px 0 rgba(15, 23, 42, 0.05) !important;
  padding: 24px;

  .chart-wrapper {
    width: 200px;
    height: 200px;
    position: relative;
    margin: auto;

    .info {
      position: absolute;
      left: calc(50% - 60px);
      top: calc(50% - 60px);
      width: 120px;
      height: 120px;
      display: flex;
      align-items: center;
      justify-content: center;

      .label {
        color: $gray-5;
        font-size: 12px;
        text-transform: capitalize;
      }

      .count {
        color: $gray-10;
        font-size: 24px;
        font-weight: bold;
      }
    }
  }

  .legend {
    color: $gray-5;
    font-size: 13px;
    text-transform: capitalize;
    text-align: center;
    margin-top: 24px;
  }
}
</style>
