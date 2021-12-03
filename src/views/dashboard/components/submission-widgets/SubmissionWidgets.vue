<template>
  <div class="submission-widgets">
    <SubmissionBarChart />

    <SubmissionPieChart />

    <SubmissionPercentageChart />
  </div>
</template>

<script>
import SubmissionPieChart from "./components/SubmissionPieChart.vue";
import SubmissionBarChart from "./components/SubmissionBarChart.vue";
import SubmissionPercentageChart from "./components/SubmissionPercentageChart.vue";

export default {
  name: "SubmissionWidgets",

  components: {
    SubmissionPieChart,
    SubmissionBarChart,
    SubmissionPercentageChart,
  },
};
</script>

<style lang="scss" scoped>
.submission-widgets {
  display: flex;
  margin-top: 24px;
  height: 484px;
}
</style>
