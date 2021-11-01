<template>
  <q-layout view="hhh lpR fFf">
    <!-- toolbar -->

    <Toolbar />

    <!-- ... -->

    <!-- drawer -->

    <Drawer />

    <!-- ... -->

    <!-- page content -->

    <q-page-container>
      <slot name="page-content"></slot>
    </q-page-container>

    <!-- ... -->
  </q-layout>
</template>

<script>
import Toolbar from "./components/toolbar/Toolbar.vue";
import Drawer from "./components/drawer/Drawer.vue";

export default {
  name: "AppLayout",

  components: { Toolbar, Drawer },
};
</script>

<style lang="scss" scoped></style>
