<template>
  <BaseIconButton
    v-tooltip.top="'ordered list'"
    is-flat
    icon="mdi-format-list-numbered"
    color="gray-6"
    @click="onClick"
  />
</template>

<script>
export default {
  name: "OrderedList",

  methods: {
    onClick() {
      this.$emit("toggle");
    },
  },
};
</script>

<style lang="scss" scoped></style>
