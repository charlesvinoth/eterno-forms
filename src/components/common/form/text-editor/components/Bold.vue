<template>
  <BaseIconButton
    v-tooltip.top="'bold'"
    is-flat
    icon="mdi-format-bold"
    color="gray-6"
    @click="onClick"
  />
</template>

<script>
export default {
  name: "Bold",

  methods: {
    onClick() {
      this.$emit("toggle");
    },
  },
};
</script>

<style lang="scss" scoped></style>
