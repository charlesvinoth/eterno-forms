<template>
  <div class="row items-center">
    <!-- left align -->

    <BaseIconButton
      v-tooltip.top="'left align'"
      is-flat
      icon="mdi-format-align-left"
      color="gray-6"
      @click="onClick('left')"
    />

    <!-- ... -->

    <!-- center align -->

    <BaseIconButton
      v-tooltip.top="'center align'"
      is-flat
      icon="mdi-format-align-center"
      color="gray-6"
      @click="onClick('center')"
    />

    <!-- ... -->

    <!-- right align -->

    <BaseIconButton
      v-tooltip.top="'right align'"
      is-flat
      icon="mdi-format-align-right"
      color="gray-6"
      @click="onClick('right')"
    />

    <!-- ... -->
  </div>
</template>

<script>
export default {
  name: "Align",

  methods: {
    onClick(position) {
      this.$emit("set", position);
    },
  },
};
</script>

<style lang="scss" scoped></style>
