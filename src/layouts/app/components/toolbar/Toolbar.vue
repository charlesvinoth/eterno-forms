<template>
  <q-header class="bg-white border-bottom border-gray-2">
    <q-toolbar class="no-padding" style="height: 56px">
      <!-- logo -->

      <Logo />

      <!-- ... -->

      <q-space></q-space>

      <!-- notifications -->

      <Notifications />

      <!-- ... -->

      <!-- account -->

      <Account />

      <!-- ... -->
    </q-toolbar>
  </q-header>
</template>

<script>
import Logo from "./Logo.vue";
import Notifications from "./Notifications.vue";
import Account from "./Account.vue";

export default {
  name: "Toolbar",

  components: { Logo, Notifications, Account },
};
</script>

<style lang="scss" scoped></style>
