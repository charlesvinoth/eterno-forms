<template>
  <div class="legend">
    <div class="dot-wrapper" :class="wrapperColor">
      <div class="dot" :class="dotColor"></div>
    </div>

    <div class="label">{{ label }}</div>
  </div>
</template>

<script>
export default {
  name: "Legend",

  props: {
    label: {
      type: String,
      required: true,
    },

    color: {
      type: String,
      default: "secondary",
    },
  },

  computed: {
    wrapperColor() {
      return `text-${this.color}-1`;
    },

    dotColor() {
      return `text-${this.color}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.legend {
  display: flex;
  align-items: center;

  .dot-wrapper {
    height: 24px;
    width: 24px;
    border-radius: 100%;
    background-color: currentColor;
    display: flex;
    align-items: center;
    justify-content: center;

    .dot {
      height: 8px;
      width: 8px;
      border-radius: 100%;
      background-color: currentColor;
    }
  }

  .label {
    color: $gray-5;
    font-size: 13px;
    font-weight: 500;
    text-transform: capitalize;
    margin-left: 8px;
  }
}
</style>
