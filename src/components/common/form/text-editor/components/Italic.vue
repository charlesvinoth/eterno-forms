<template>
  <BaseIconButton
    v-tooltip.top="'italic'"
    is-flat
    icon="mdi-format-italic"
    color="gray-6"
    @click="onClick"
  />
</template>

<script>
export default {
  name: "Italic",

  methods: {
    onClick() {
      this.$emit("toggle");
    },
  },
};
</script>

<style lang="scss" scoped></style>
