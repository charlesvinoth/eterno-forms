<template>
  <div v-ripple:gray v-on="$listeners" class="action">
    <q-icon v-if="icon" :name="icon" size="20px" class="action-icon" />

    <div class="action-label">{{ label }}</div>

    <q-icon
      v-if="iconRight"
      :name="iconRight"
      size="20px"
      class="action-icon-right"
    />

    <slot name="default"></slot>
  </div>
</template>

<script>
export default {
  name: "ActionWrapper",

  props: {
    icon: {
      type: String,
      default: "",
    },

    label: {
      type: String,
      required: true,
    },

    iconRight: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss" scoped>
.action {
  display: flex;
  align-items: center;
  color: $gray;
  padding: 8px 16px;
  border: 1px solid $gray-2;
  border-radius: 4px;
  cursor: pointer;
  background-color: white;
  position: relative;
  box-shadow: 0 1px 2px 0 rgba(15, 23, 42, 0.05);

  .action-icon {
    margin-right: 8px;
  }

  .action-label {
    flex-grow: 1;
    font-size: 13px;
    font-weight: 500;
    text-transform: capitalize;
    letter-spacing: 0.05em;
    user-select: none;
  }

  .action-icon-right {
    margin-left: 8px;
  }

  &:hover {
    color: $gray-8;
  }
}
</style>
