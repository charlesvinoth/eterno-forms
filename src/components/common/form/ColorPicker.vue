<template>
  <div class="color-picker">
    <div
      v-for="color in colors"
      :key="color"
      class="color"
      :class="bgColor(color)"
      @click="onClick(color)"
    >
      <q-icon
        v-if="value === color"
        name="eva-checkmark"
        color="white"
        size="20px"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "ColorPicker",

  props: {
    value: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      colors: [
        "primary",
        "secondary",
        "red",
        "pink",
        "purple",
        "deep-purple",
        "indigo",
        "blue",
        "light-blue",
        "cyan",
        "teal",
        "green",
        "light-green",
        "yellow",
        "amber",
        "orange",
        "deep-orange",
        "brown",
      ],
    };
  },

  methods: {
    bgColor(color) {
      return `bg-${color}`;
    },

    onClick(color) {
      this.$emit("input", color);
    },
  },
};
</script>

<style lang="scss" scoped>
.color-picker {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  width: 216px;

  .color {
    width: 36px;
    height: 36px;
    border: 1px solid white;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
}
</style>
