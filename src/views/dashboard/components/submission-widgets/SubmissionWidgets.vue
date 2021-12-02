<template>
  <div class="submission-widgets">
    <LineChart />

    <SubmissionPieChart />
  </div>
</template>

<script>
import SubmissionPieChart from "./components/SubmissionPieChart.vue";
import LineChart from "./components/LineChart.vue";

export default {
  name: "SubmissionWidgets",

  components: { SubmissionPieChart, LineChart },
};
</script>

<style lang="scss" scoped>
.submission-widgets {
  margin-top: 24px;
  display: flex;
  height: 298px;
}
</style>
