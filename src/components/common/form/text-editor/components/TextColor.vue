<template>
  <BaseIconButton
    v-tooltip.top="'text color'"
    is-flat
    icon="mdi-format-color-text"
    color="gray-6"
  >
    <!-- color picker -->

    <q-menu content-class="box-shadow-2xl">
      <q-color
        v-model="textColor"
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
  name: "TextColor",

  data() {
    return {
      textColor: "",
    };
  },

  watch: {
    textColor() {
      this.$emit("set", this.textColor);
    },
  },
};
</script>

<style lang="scss" scoped></style>
