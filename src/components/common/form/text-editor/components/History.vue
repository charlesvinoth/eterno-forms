<template>
  <div class="row items-center">
    <!-- undo -->

    <BaseIconButton
      v-tooltip.top="'undo'"
      is-flat
      icon="mdi-undo"
      color="gray-6"
      @click="$emit('undo')"
    />

    <!-- ... -->

    <!-- redo -->

    <BaseIconButton
      v-tooltip.top="'redo'"
      is-flat
      icon="mdi-redo"
      color="gray-6"
      @click="$emit('redo')"
    />

    <!-- ... -->
  </div>
</template>

<script>
export default {
  name: "History",
};
</script>

<style lang="scss" scoped></style>
