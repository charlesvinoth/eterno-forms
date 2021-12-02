<template>
  <div class="submission-widgets">
    <RankChart />

    <LineChart />
  </div>
</template>

<script>
import RankChart from "./components/RankChart.vue";
import LineChart from "./components/LineChart.vue";

export default {
  name: "SubmissionWidgets",

  components: { RankChart, LineChart },
};
</script>

<style lang="scss" scoped>
.submission-widgets {
  display: flex;
  height: 360px;
}
</style>
