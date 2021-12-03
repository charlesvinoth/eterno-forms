<template>
  <div class="submission-pie-chart">
    <div class="title">Submissions by Region</div>

    <!-- chart -->

    <div class="chart-wrapper">
      <canvas id="submissionPieChart"></canvas>

      <div class="info">
        <div class="text-center">
          <div class="count">594</div>

          <div class="label">total submissions</div>
        </div>
      </div>
    </div>

    <!-- ... -->

    <!-- legend -->

    <div class="legends">
      <div v-for="legend in stats" :key="legend.id" class="legend">
        <Legend :label="legend.label" :color="legend.color.palette" />

        <q-space />

        <div class="percent">{{ percentage(legend.count) }}%</div>
      </div>
    </div>

    <!-- ... -->
  </div>
</template>

<script>
import Chart from "chart.js/auto";

import Legend from "../../Legend.vue";

export default {
  name: "SubmissionPieChart",

  components: { Legend },

  data() {
    return {
      stats: [
        {
          id: this.$nano.id(),
          label: "america",
          count: 84,
          color: {
            palette: "secondary",
            name: "secondary",
            rgba: "rgba(249, 119, 103, 0.8)",
          },
        },
        {
          id: this.$nano.id(),
          label: "india",
          count: 137,
          color: {
            palette: "tertiary",
            name: "tertiary",
            rgba: "rgba(37, 204, 201, 0.8)",
          },
        },
        {
          id: this.$nano.id(),
          label: "russia",
          count: 73,
          color: {
            palette: "pink",
            name: "pink-5",
            rgba: "rgba(236, 64, 122, 0.8)",
          },
        },
        {
          id: this.$nano.id(),
          label: "others",
          count: 298,
          color: {
            palette: "primary",
            name: "primary",
            rgba: "rgba(72, 73, 161, 0.8)",
          },
        },
      ],
    };
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
    const ctx = document.getElementById("submissionPieChart");
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

  methods: {
    percentage(count) {
      return Math.floor((count * 100) / 594);
    },

    width(count) {
      const width = this.percentage(count);
      return `${width}%`;
    },
  },
};
</script>

<style lang="scss" scoped>
.submission-pie-chart {
  background-color: white;
  border: 1px solid $gray-2;
  border-radius: 24px;
  box-shadow: 0 1px 2px 0 rgba(15, 23, 42, 0.05) !important;
  padding: 24px;
  display: flex;
  flex-direction: column;

  .title {
    color: $gray-8;
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 16px;
  }

  .chart-wrapper {
    width: 200px;
    height: 200px;
    position: relative;

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

  .legends {
    flex: 1;
    margin-top: 24px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .legend {
      border-radius: 4px;
      display: flex;
      align-items: center;
    }

    .percent {
      color: $gray;
      font-size: 13px;
      font-weight: bold;
    }
  }
}
</style>
