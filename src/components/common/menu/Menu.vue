<template>
  <q-menu
    anchor="bottom right"
    self="top end"
    :offset="[0, 8]"
    content-class="drop-shadow q-py-sm"
    transition-show="scale"
    transition-hide="scale"
  >
    <slot></slot>
  </q-menu>
</template>

<script>
export default {
  name: "Menu",
};
</script>

<style lang="scss" scoped></style>
