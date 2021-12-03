<template>
  <div class="bar-chart">
    <div class="title">Submissions by Month</div>

    <div class="chart-wrapper">
      <!-- legends -->

      <div class="grids">
        <div v-for="grid in grids" :key="grid" class="grid">
          <div class="legend">
            {{ grid }}
          </div>

          <div class="axis"></div>
        </div>
      </div>

      <!-- ... -->

      <!-- bars -->

      <div class="bars">
        <div v-for="bar in stats" :key="bar.id" class="bar-wrapper">
          <div class="count" :style="{ color: bar.color }">
            <div class="label">
              {{ bar.count }}
            </div>
          </div>

          <div class="bar" :style="{ height: height(bar.count) }"></div>

          <div class="legend">{{ bar.label }}</div>
        </div>
      </div>

      <!-- ... -->
    </div>
  </div>
</template>

<script>
export default {
  name: "SubmissionBarChart",

  data() {
    return {
      stats: [
        {
          id: this.$nano.id(),
          label: "jan",
          count: 95,
          color: "rgba(72, 73, 161, 0.8)",
        },
        {
          id: this.$nano.id(),
          label: "feb",
          count: 29,
          color: "rgba(249, 119, 103, 0.8)",
        },
        {
          id: this.$nano.id(),
          label: "mar",
          count: 74,
          color: "rgba(72, 73, 161, 0.8)",
        },
        {
          id: this.$nano.id(),
          label: "apr",
          count: 18,
          color: "rgba(249, 119, 103, 0.8)",
        },
        {
          id: this.$nano.id(),
          label: "may",
          count: 63,
          color: "rgba(72, 73, 161, 0.8)",
        },
        {
          id: this.$nano.id(),
          label: "jun",
          count: 19,
          color: "rgba(249, 119, 103, 0.8)",
        },
        {
          id: this.$nano.id(),
          label: "jul",
          count: 68,
          color: "rgba(72, 73, 161, 0.8)",
        },
        {
          id: this.$nano.id(),
          label: "aug",
          count: 64,
          color: "rgba(249, 119, 103, 0.8)",
        },
        {
          id: this.$nano.id(),
          label: "sep",
          count: 31,
          color: "rgba(72, 73, 161, 0.8)",
        },
        {
          id: this.$nano.id(),
          label: "oct",
          count: 57,
          color: "rgba(249, 119, 103, 0.8)",
        },
        {
          id: this.$nano.id(),
          label: "nov",
          count: 44,
          color: "rgba(72, 73, 161, 0.8)",
        },
        {
          id: this.$nano.id(),
          label: "dec",
          count: 32,
          color: "rgba(249, 119, 103, 0.8)",
        },
      ],
      grids: [100, 90, 80, 70, 60, 50, 40, 30, 20, 10, 0],
    };
  },

  methods: {
    height(count) {
      return `calc(${count}% - 28px)`; // substract 28px to take the count circle into the account
    },
  },
};
</script>

<style lang="scss" scoped>
.bar-chart {
  width: 50%;
  background-color: white;
  border: 1px solid $gray-2;
  border-radius: 24px;
  box-shadow: 0 1px 2px 0 rgba(15, 23, 42, 0.05) !important;
  padding: 24px;
  margin-right: 16px;

  .title {
    color: $gray-8;
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 16px;
  }

  .chart-wrapper {
    height: 375px;
    position: relative;

    .grids {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .grid {
        height: 100%;
        display: flex;
        align-items: center;

        .legend {
          color: $gray-5;
          font-size: 12px;
          text-transform: capitalize;
          text-align: right;
          width: 24px;
        }

        .axis {
          margin-left: 36px;
          flex: 1;
          border-top: 1px solid $gray-2;
        }
      }
    }

    .bars {
      position: absolute;
      top: 15px;
      right: 0;
      height: calc(100% - 32px);
      width: calc(100% - 50px);
      display: flex;
      justify-content: space-around;

      .bar-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-end;
        position: relative;

        .count {
          width: 28px;
          height: 28px;
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

        .bar {
          width: 8px;
          background-color: $gray-2;
        }

        .legend {
          position: absolute;
          bottom: -40px;
          color: $gray-5;
          font-size: 12px;
          text-transform: capitalize;
        }
      }
    }
  }
}
</style>
