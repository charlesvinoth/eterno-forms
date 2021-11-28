<template>
  <AppLayout>
    <template #page-content>
      <div class="container">
        <div class="title">Welcome Amelia,</div>
        <div class="subtitle">
          Here is your forms and their submissions summary
        </div>

        <div class="q-mt-xl">
          <div class="row items-center q-col-gutter-lg">
            <div v-for="status in statuses" :key="status.id" class="col-2">
              <StatusCard :status="status" />
            </div>
          </div>

          <StatusChart class="q-mt-lg" />
        </div>
      </div>
    </template>
  </AppLayout>
</template>

<script>
import AppLayout from "@/layouts/app/AppLayout.vue";

import StatusCard from "./components/StatusCard.vue";
import StatusChart from "./components/status-chart/StatusChart.vue";

export default {
  name: "Dashboard",

  components: { AppLayout, StatusCard, StatusChart },

  data() {
    return {
      statuses: [
        {
          id: this.$nano.id(),
          label: "all",
          count: "24",
          icon: "mdi-view-dashboard-outline",
          color: "primary",
        },
        {
          id: this.$nano.id(),
          label: "published",
          count: "09",
          icon: "eva-external-link-outline",
          color: "tertiary-4",
        },
        {
          id: this.$nano.id(),
          label: "draft",
          count: "05",
          icon: "mdi-text-box-outline",
          color: "secondary",
        },
        {
          id: this.$nano.id(),
          label: "archive",
          count: "03",
          icon: "eva-archive-outline",
          color: "blue-5",
        },
        {
          id: this.$nano.id(),
          label: "trash",
          count: "07",
          icon: "eva-trash-2-outline",
          color: "pink-5",
        },
        {
          id: this.$nano.id(),
          label: "favourite",
          count: "06",
          icon: "eva-star-outline",
          color: "amber-6",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.container {
  padding: 16px;
}
</style>
