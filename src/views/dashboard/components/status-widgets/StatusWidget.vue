<template>
  <div class="status-widget">
    <!-- cards -->

    <Cards />

    <!-- ... -->

    <!-- chart -->

    <div class="chart">
      <Tiles />

      <LineChart />

      <PieChart name="statusChart" :stats="statusChartData" class="q-mr-md">
        <template #label>Total Forms</template>
        <template #count>{{ stats[0].count }}</template>
      </PieChart>

      <PieChart name="favouriteChart" :stats="favouriteChartData">
        <template #label>Favourite Forms</template>
        <template #count>{{ stats[5].count }}</template>
      </PieChart>
    </div>

    <!-- ... -->
  </div>
</template>

<script>
import { cloneDeep } from "lodash-es";

import { mapGetters } from "vuex";

import Cards from "./components/Cards.vue";
import Tiles from "./components/Tiles.vue";
import LineChart from "./components/LineChart.vue";
import PieChart from "./components/PieChart.vue";

export default {
  name: "StatusWidget",

  components: { Cards, Tiles, LineChart, PieChart },

  computed: {
    ...mapGetters("forms", ["stats"]),

    statusChartData() {
      return [this.stats[1], this.stats[2], this.stats[3], this.stats[4]];
    },

    favouriteChartData() {
      const totalForms = cloneDeep(this.stats[0]);
      const favouriteForms = this.stats[5];

      totalForms.count = totalForms.count - favouriteForms.count;
      totalForms.label = "not favourite";

      return [totalForms, favouriteForms];
    },
  },
};
</script>

<style lang="scss" scoped>
.status-widget {
  .chart {
    background-color: white;
    border: 1px solid $gray-2;
    border-radius: 24px;
    box-shadow: 0 1px 2px 0 rgba(15, 23, 42, 0.05) !important;
    padding: 16px 24px 36px 24px;
    display: flex;
    align-items: center;
    margin-top: 24px;
    height: 260px;
  }
}
</style>
