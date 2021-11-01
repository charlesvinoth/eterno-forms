<template>
  <div class="btn-wrapper" :class="{ bordered: isBordered }">
    <q-btn
      round
      size="12px"
      :color="color"
      :flat="isFlat"
      :disable="isDisabled"
      :loading="isLoading"
      v-on="$listeners"
    >
      <!-- icon -->

      <q-icon :name="icon" size="20px"></q-icon>

      <!-- ... -->

      <!-- default slot -->

      <slot name="default"></slot>

      <!-- ... -->
    </q-btn>
  </div>
</template>

<script>
export default {
  name: "BaseIconButton",

  props: {
    color: {
      type: String,
      default: "primary",
    },

    icon: {
      type: String,
      required: true,
    },

    isFlat: {
      type: Boolean,
      default: false,
    },

    isDisabled: {
      type: Boolean,
      default: false,
    },

    isLoading: {
      type: Boolean,
      default: false,
    },

    isBordered: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.btn-wrapper {
  height: 36px;
  width: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
}

.bordered {
  border: 1px solid $gray-2;
}
</style>
