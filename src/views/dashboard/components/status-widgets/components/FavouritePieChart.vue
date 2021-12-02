<template>
  <div class="favourite-chart">
    <!-- chart -->

    <div class="chart-wrapper">
      <canvas id="favouritePieChart"></canvas>

      <div class="info">
        <div class="text-center">
          <div class="count">
            {{ _stats[0].count }}
          </div>

          <div class="label">{{ _stats[0].label }} forms</div>
        </div>
      </div>
    </div>

    <!-- ... -->

    <!-- legend -->

    <div class="legends">
      <Legend
        v-for="legend in _stats"
        :key="legend.id"
        :label="legend.label"
        :color="legend.color.palette"
      />
    </div>

    <!-- ... -->
  </div>
</template>

<script>
import Chart from "chart.js/auto";

import { mapGetters } from "vuex";

import Legend from "../../Legend.vue";

export default {
  name: "FavouritePieChart",

  components: { Legend },

  computed: {
    ...mapGetters("forms", ["stats"]),

    _stats() {
      // get the first and the last element, since it is only needed

      const all = this.stats[0];
      const favourite = this.stats[5];

      const notFavourite = {
        ...all,
        label: "Others",
        count: all.count - favourite.count,
      };

      const stats = [favourite, notFavourite];
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
    const ctx = document.getElementById("favouritePieChart");
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
.favourite-chart {
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

  .legends {
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-top: 24px;
  }
}
</style>
