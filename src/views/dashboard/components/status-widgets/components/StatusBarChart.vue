<template>
  <div class="bar-chart">
    <div class="chart-wrapper">
      <!-- legends -->

      <div class="legends">
        <div v-for="stat in _stats" :key="stat.id" class="legend">
          {{ stat.label }}
        </div>
      </div>

      <!-- ... -->

      <div class="grid">
        <!-- axes -->

        <div class="axes">
          <div v-for="axis in axes" :key="axis" class="axis">
            <div class="legend">{{ axis }}%</div>
          </div>
        </div>

        <!-- ... -->

        <!-- bars -->

        <div class="bars">
          <div
            v-for="bar in _stats"
            :key="bar.id"
            class="bar-wrapper"
            :class="`text-${bar.color.name}`"
          >
            <div class="bar" :style="{ width: width(bar.count) }"></div>

            <div class="count">
              <div class="label">
                {{ bar.count }}
              </div>
            </div>
          </div>
        </div>

        <!-- ... -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "StatusBarChart",

  data() {
    return {
      axes: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
    };
  },

  computed: {
    ...mapGetters("forms", ["stats"]),

    _stats() {
      // remove the first element, since it is not needed

      const stats = [...this.stats];
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

  methods: {
    width(count) {
      const width = Math.floor((count * 100) / this.stats[0].count);
      return `calc(${width}% - 32px)`; // substract 32px to take the count circle into the account
    },
  },
};
</script>

<style lang="scss" scoped>
.bar-chart {
  flex: 1;
  background-color: white;
  border: 1px solid $gray-2;
  border-radius: 24px;
  box-shadow: 0 1px 2px 0 rgba(15, 23, 42, 0.05) !important;
  padding: 24px;
  margin: 0px 16px;

  .chart-wrapper {
    height: 200px;
    display: flex;

    .legends {
      display: flex;
      flex-direction: column;
      justify-content: space-around;

      .legend {
        color: $gray-5;
        font-size: 12px;
        text-transform: capitalize;
      }
    }

    .grid {
      flex: 1;
      position: relative;
      margin-left: 36px;
      margin-right: 12px;

      .axes {
        display: flex;
        justify-content: space-between;
        height: 100%;

        .axis {
          height: 100%;
          border-left: 1px solid $gray-2;
          position: relative;

          .legend {
            position: absolute;
            bottom: -46px;
            left: -16px;
            width: 32px;
            text-align: center;
            color: $gray-5;
            font-size: 12px;
            text-transform: capitalize;
          }
        }
      }

      .bars {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;

        .bar-wrapper {
          display: flex;
          align-items: center;

          .bar {
            height: 8px;
            background-color: $gray-2;
          }

          .count {
            width: 32px;
            height: 32px;
            background-color: currentColor;
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
  }
}
</style>
