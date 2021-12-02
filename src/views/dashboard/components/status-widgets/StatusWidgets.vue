<template>
  <div class="status-widget">
    <!-- cards -->

    <Cards />

    <!-- ... -->

    <!-- charts -->

    <div class="charts">
      <StatusPieChart />

      <StatusBarChart />

      <FavouritePieChart />
    </div>

    <!-- ... -->
  </div>
</template>

<script>
import Cards from "./components/Cards.vue";
import FavouritePieChart from "./components/FavouritePieChart.vue";
import StatusBarChart from "./components/StatusBarChart.vue";
import StatusPieChart from "./components/StatusPieChart.vue";

export default {
  name: "StatusWidgets",

  components: { Cards, FavouritePieChart, StatusBarChart, StatusPieChart },
};
</script>

<style lang="scss" scoped>
.status-widget {
  .charts {
    display: flex;
  }
}
</style>
