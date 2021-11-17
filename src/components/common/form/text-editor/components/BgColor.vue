<template>
  <BaseIconButton
    v-tooltip.top="'background color'"
    is-flat
    icon="mdi-format-color-fill"
    color="gray-6"
  >
    <!-- color picker -->

    <q-menu content-class="box-shadow-2xl">
      <q-color
        v-model="bgColor"
        minimal
        format-model="hex"
        default-view="palette"
      />
    </q-menu>

    <!-- ... -->
  </BaseIconButton>
</template>

<script>
export default {
  name: "BgColor",

  data() {
    return {
      bgColor: "",
    };
  },

  watch: {
    bgColor() {
      this.$emit("set", this.bgColor);
    },
  },
};
</script>

<style lang="scss" scoped></style>
