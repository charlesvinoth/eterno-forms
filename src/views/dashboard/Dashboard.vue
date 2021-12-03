<template>
  <AppLayout>
    <template #page-content>
      <BaseScrollbar height="calc(100vh - 57px)">
        <div class="container">
          <!-- header -->

          <div class="q-mb-lg">
            <div class="title">Welcome Amelia,</div>
            <div class="subtitle">
              Here is your Forms and Submissions overview
            </div>
          </div>

          <!-- ... -->

          <!-- status widgets -->

          <StatusWidgets />

          <!-- ... -->

          <!-- submission widgets -->

          <SubmissionWidget />

          <!-- ... -->
        </div>
      </BaseScrollbar>
    </template>
  </AppLayout>
</template>

<script>
import AppLayout from "@/layouts/app/AppLayout.vue";

import StatusWidgets from "./components/status-widgets/StatusWidgets.vue";
import SubmissionWidget from "./components/submission-widgets/SubmissionWidgets.vue";

export default {
  name: "Dashboard",

  components: { AppLayout, StatusWidgets, SubmissionWidget },
};
</script>

<style lang="scss" scoped>
.container {
  padding: 24px;
}
</style>
