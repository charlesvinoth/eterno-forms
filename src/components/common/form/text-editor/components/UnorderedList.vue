<template>
  <BaseIconButton
    v-tooltip.top="'unordered list'"
    is-flat
    icon="mdi-format-list-bulleted"
    color="gray-6"
    @click="onClick"
  />
</template>

<script>
export default {
  name: "UnOrderedList",

  methods: {
    onClick() {
      this.$emit("toggle");
    },
  },
};
</script>

<style lang="scss" scoped></style>
