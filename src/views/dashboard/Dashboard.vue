<template>
  <AppLayout>
    <template #page-content>
      <div class="container">
        <!-- header -->

        <div class="q-mb-lg">
          <div class="title">Welcome Amelia,</div>
          <div class="subtitle q-mt-xs">
            Here is your forms & submissions summary
          </div>
        </div>

        <!-- ... -->

        <!-- status widget -->

        <StatusWidgets />

        <!-- ... -->

        <!-- ... -->

        <SubmissionWidget class="q-mt-lg" />

        <!-- ... -->
      </div>
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
  padding: 16px;
}
</style>
