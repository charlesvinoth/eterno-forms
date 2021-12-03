<template>
  <div class="submission-percentage-chart">
    <div class="title">Submissions by Percentage</div>

    <div class="chart-wrapper">
      <div class="left">
        <div class="bars">
          <div v-for="bar in oddStats" :key="bar.id" class="bar-wrapper">
            <div class="bar" :style="{ width: width(bar.count) }"></div>

            <div class="percentage">{{ percentage(bar.count) }}%</div>

            <q-space />

            <div class="label">{{ bar.label }}</div>
          </div>
        </div>
      </div>

      <div class="center">
        <div class="line"></div>

        <div class="points">
          <div v-for="n in 6" :key="n" class="point-wrapper">
            <div class="point"></div>
          </div>
        </div>
      </div>

      <div class="right">
        <div class="bars">
          <div v-for="bar in evenStats" :key="bar.id" class="bar-wrapper">
            <div class="bar" :style="{ width: width(bar.count) }"></div>

            <div class="label">{{ bar.label }}</div>

            <q-space />

            <div class="percentage">{{ percentage(bar.count) }}%</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SubmissionPercentageChart",

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
    };
  },

  computed: {
    oddStats() {
      return this.stats.filter((_, index) => index % 2 === 0);
    },

    evenStats() {
      return this.stats.filter((_, index) => index % 2 !== 0);
    },
  },

  methods: {
    percentage(count) {
      return Math.floor((count * 100) / 594);
    },

    width(count) {
      return this.percentage(count) + "%";
    },
  },
};
</script>

<style lang="scss" scoped>
.submission-percentage-chart {
  flex: 1;
  background-color: white;
  border: 1px solid $gray-2;
  border-radius: 24px;
  box-shadow: 0 1px 2px 0 rgba(15, 23, 42, 0.05) !important;
  padding: 24px;
  margin-left: 16px;
  display: flex;
  flex-direction: column;

  .title {
    color: $gray-8;
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 16px;
  }

  .chart-wrapper {
    flex: 1;
    display: flex;

    .bars {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;

      .bar-wrapper {
        height: 36px;
        width: 100%;
        border-radius: 4px;
        display: flex;
        align-items: center;
        font-size: 13px;
        position: relative;

        .label {
          position: absolute;
          font-weight: 500;
          color: $gray-10;
          text-transform: capitalize;
        }

        .percentage {
          position: absolute;
          font-weight: bold;
        }

        .bar {
          position: absolute;
          height: 100%;
          background-color: $primary-2;
          border-radius: 4px;
        }

        // .bar {
        //   display: flex;
        //   align-items: center;
        //   border-radius: 36px;

        //   &:nth-child(odd) {
        //     background-color: $primary-1;

        //     .label {
        //       color: $primary;
        //     }

        //     .percentage {
        //       background-color: $primary;
        //     }
        //   }

        //   &:nth-child(even) {
        //     background-color: $secondary-1;

        //     .label {
        //       color: $secondary;
        //     }

        //     .percentage {
        //       background-color: $secondary;
        //     }
        //   }
        // }
      }

      .bar-wrapper:nth-child(odd) {
        background-color: $gray-1;

        .bar {
          background-color: $primary-1;
        }

        .percentage {
          color: $primary;
        }
      }

      .bar-wrapper:nth-child(even) {
        background-color: $gray-1;

        .bar {
          background-color: $secondary-1;
        }

        .percentage {
          color: $secondary;
        }
      }
    }

    .left {
      flex: 1;

      .bar-wrapper {
        .bar {
          right: 0;
        }

        .label {
          right: 0;
          margin-right: 16px;
        }

        .percentage {
          left: 0;
          margin-left: 16px;
        }
      }
    }

    .center {
      position: relative;
      margin: 0px 36px;

      .line {
        height: 100%;
        border-right: 1px solid $gray-2;
      }

      .points {
        position: absolute;
        top: 0;
        left: -12px;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;

        .point-wrapper {
          height: 24px;
          width: 24px;
          border-radius: 100%;
          display: flex;
          align-items: center;
          justify-content: center;

          &:nth-child(odd) {
            background-color: $primary-1;

            .point {
              background-color: $primary;
            }
          }

          &:nth-child(even) {
            background-color: $secondary-1;

            .point {
              background-color: $secondary;
            }
          }

          .point {
            height: 8px;
            width: 8px;
            border-radius: 100%;
          }
        }
      }
    }

    .right {
      flex: 1;

      .bar-wrapper {
        .bar {
          left: 0;
        }

        .label {
          left: 0;
          margin-left: 16px;
        }

        .percentage {
          right: 0;
          margin-right: 16px;
        }
      }
    }
  }
}
</style>
