<template>
  <div class="line-chart">
    <div class="axes">
      <div v-for="axis in axes" :key="axis" class="axis">
        <div class="label">{{ axis }}%</div>
      </div>
    </div>

    <div class="bars">
      <div
        v-for="bar in bars"
        :key="bar.id"
        class="bar"
        :class="color(bar.color)"
      >
        <div class="start"></div>

        <div
          class="center"
          :style="{ width: `calc(${percentage(bar.count)}% - 16px)` }"
        ></div>

        <div class="end">
          <div class="label">
            {{ bar.count }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LineChart",

  data() {
    return {
      axes: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
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

    percentage(count) {
      return Math.floor((count * 100) / 24);
    },
  },
};
</script>

<style lang="scss" scoped>
.line-chart {
  height: 240px;
  margin: 0px 36px;
  position: relative;

  .axes {
    display: flex;
    justify-content: space-between;
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;

    .axis {
      position: relative;
      border-left: 1px solid $gray-2;

      .label {
        color: $gray-5;
        font-size: 12px;
        position: absolute;
        bottom: -24px;
        left: -16px;
        width: 32px;
        text-align: center;
      }
    }
  }

  .bars {
    display: flex;
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    background: transparent;

    .bar {
      display: flex;
      align-items: center;

      .start {
        height: 16px;
        width: 2px;
        border-radius: 4px;
        background-color: currentColor;
        opacity: 0.5;
      }

      .center {
        height: 8px;
        background-color: currentColor;
        opacity: 0.5;
      }

      .end {
        width: 32px;
        height: 32px;
        background-color: currentColor;
        border: 2px solid white;
        border-radius: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 10px 15px -3px rgba(15, 23, 42, 0.1),
          0 4px 6px -2px rgba(15, 23, 42, 0.05) !important;

        .label {
          color: white;
          font-weight: 500;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
