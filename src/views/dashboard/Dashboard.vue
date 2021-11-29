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

        <StatusWidget />

        <!-- ... -->
      </div>
    </template>
  </AppLayout>
</template>

<script>
import AppLayout from "@/layouts/app/AppLayout.vue";

import StatusWidget from "./components/status-widgets/StatusWidget.vue";

export default {
  name: "Dashboard",

  components: { AppLayout, StatusWidget },
};
</script>

<style lang="scss" scoped>
.container {
  padding: 16px;
}
</style>
