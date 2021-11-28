<template>
  <div class="status-chart">
    <div class="title">All Forms</div>

    <div class="row items-center">
      <div class="bars">
        <div v-for="bar in bars" :key="bar.id" class="bar">
          <div class="indicator" :class="color(bar.color)"></div>

          <div class="label">{{ bar.label }}</div>
        </div>
      </div>

      <LineChart class="col" />

      <PieChart />
    </div>
  </div>
</template>

<script>
import PieChart from "./components/PieChart.vue";
import LineChart from "./components/LineChart.vue";

export default {
  name: "StatusChart",

  components: { PieChart, LineChart },

  data() {
    return {
      bars: [
        {
          id: this.$nano.id(),
          label: "published",
          count: 9,
          color: "tertiary-4",
        },
        {
          id: this.$nano.id(),
          label: "draft",
          count: 5,
          color: "secondary",
        },
        {
          id: this.$nano.id(),
          label: "archive",
          count: 3,
          color: "blue-5",
        },
        {
          id: this.$nano.id(),
          label: "trash",
          count: 7,
          color: "pink-5",
        },
        {
          id: this.$nano.id(),
          label: "favourite",
          count: 6,
          color: "amber-6",
        },
      ],
    };
  },

  methods: {
    color(color) {
      return `text-${color}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.status-chart {
  background-color: white;
  border: 1px solid $gray-2;
  border-radius: 24px;
  box-shadow: 0 1px 2px 0 rgba(15, 23, 42, 0.05) !important;
  padding: 24px 24px 42px 24px;

  .title {
    margin-bottom: 24px;
  }

  .bars {
    height: 240px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    .bar {
      height: 36px;
      width: 180px;
      padding: 8px 16px;
      background-color: $gray-1;
      border: 1px solid $gray-2;
      border-radius: 4px;
      display: flex;
      align-items: center;

      .indicator {
        height: 14px;
        width: 14px;
        border-radius: 100%;
        background-color: currentColor;
        border: 2px solid white;
      }

      .label {
        color: $gray;
        font-size: 14px;
        text-transform: capitalize;
        margin-left: 8px;
      }
    }
  }
}
</style>
