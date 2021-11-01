<template>
  <div class="menu-item" @click="$emit('click')">
    <q-icon
      v-if="icon"
      size="20px"
      :name="icon"
      :color="iconColor"
      class="q-mr-sm"
    ></q-icon>

    <div>{{ label }}</div>
  </div>
</template>

<script>
export default {
  name: "MenuItem",

  props: {
    label: {
      type: String,
      required: true,
    },

    icon: {
      type: String,
      required: true,
    },

    iconColor: {
      type: String,
      default: "gray-4",
    },
  },
};
</script>

<style lang="scss" scoped>
.menu-item {
  display: flex;
  align-items: center;
  padding: 10px 24px;
  font-size: 13px;
  font-weight: 500;
  text-transform: capitalize;
  color: $gray-10;
  transition: all 0.3s ease;

  &:hover {
    background-color: $gray-2;
    cursor: pointer;
  }
}
</style>
