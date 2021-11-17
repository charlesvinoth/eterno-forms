<template>
  <BaseIconButton
    v-tooltip.top="'underline'"
    is-flat
    icon="mdi-format-underline"
    color="gray-6"
    @click="onClick"
  />
</template>

<script>
export default {
  name: "UnderLine",

  methods: {
    onClick() {
      this.$emit("toggle");
    },
  },
};
</script>

<style lang="scss" scoped></style>
