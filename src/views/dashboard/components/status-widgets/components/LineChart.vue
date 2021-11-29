<template>
  <div class="line-chart">
    <!-- axes -->

    <div class="axes">
      <div v-for="axis in axes" :key="axis" class="axis">
        <div class="label">{{ axis }}%</div>
      </div>
    </div>

    <!-- ... -->

    <!-- bars -->

    <div class="bars">
      <div
        v-for="bar in bars"
        :key="bar.id"
        class="bar-wrapper"
        :class="`text-${bar.color.name}`"
      >
        <div class="indicator"></div>

        <div class="bar" :style="{ width: bar.width }"></div>

        <div class="count">
          <div class="label">
            {{ bar.count }}
          </div>
        </div>
      </div>
    </div>

    <!-- ... -->
  </div>
</template>

<script>
import { cloneDeep } from "lodash-es";
import { mapGetters } from "vuex";

export default {
  name: "LineChart",

  data() {
    return {
      axes: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
      bars: [],
    };
  },

  computed: {
    ...mapGetters("forms", ["stats"]),
  },

  watch: {
    stats: {
      immediate: true,
      deep: true,
      handler() {
        const stats = cloneDeep(this.stats);
        stats.shift(); // remove the first element, since it is not needed

        stats.forEach((stat) => (stat.width = "0px"));
        this.bars = stats;

        // for animation

        setTimeout(() => {
          this.bars.forEach(
            (bar) => (bar.width = `calc(${this.percentage(bar.count)}% - 16px)`)
          );
        }, 180);
      },
    },
  },

  methods: {
    color(color) {
      return `text-${color}`;
    },

    percentage(count) {
      return Math.floor((count * 100) / this.stats[0].count);
    },
  },
};
</script>

<style lang="scss" scoped>
.line-chart {
  flex: 1;
  height: 100%;
  margin: 0px 36px;
  position: relative;

  .axes {
    display: flex;
    justify-content: space-between;
    height: 100%;

    .axis {
      position: relative;
      border-left: 1px solid $gray-2;

      .label {
        color: $gray-5;
        font-size: 12px;
        position: absolute;
        bottom: -26px;
        left: -16px;
        width: 32px;
        text-align: center;
      }
    }
  }

  .bars {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    .bar-wrapper {
      display: flex;
      align-items: center;

      .indicator {
        height: 16px;
        width: 2px;
        border-radius: 4px;
        background-color: currentColor;
        opacity: 0.5;
      }

      .bar {
        height: 8px;
        background-color: currentColor;
        opacity: 0.5;
        transition: all 0.3s ease;
      }

      .count {
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
