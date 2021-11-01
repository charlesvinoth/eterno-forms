<template>
  <q-btn
    :color="color"
    :flat="isFlat"
    :no-caps="noCaps"
    :disable="isDisabled"
    :rounded="isRounded"
    :loading="isLoading"
    v-on="$listeners"
  >
    <div class="row items-center">
      <!-- icon left -->

      <q-icon
        v-if="iconLeft"
        :name="iconLeft"
        size="20px"
        class="q-mr-sm"
      ></q-icon>

      <!-- ... -->

      <!-- label -->

      <div class="col text-sm tracking-widest">
        {{ label }}
      </div>

      <!-- ... -->

      <!-- icon right -->

      <q-icon
        v-if="iconRight"
        :name="iconRight"
        size="20px"
        class="q-ml-sm"
      ></q-icon>

      <!-- ... -->
    </div>

    <!-- default slot -->

    <slot name="default"></slot>

    <!-- ... -->
  </q-btn>
</template>

<script>
export default {
  name: "BaseButton",

  props: {
    label: {
      type: String,
      required: true,
    },

    color: {
      type: String,
      default: "primary",
    },

    iconLeft: {
      type: String,
      default: "",
    },

    iconRight: {
      type: String,
      default: "",
    },

    isFlat: {
      type: Boolean,
      default: false,
    },

    isDisabled: {
      type: Boolean,
      default: false,
    },

    isRounded: {
      type: Boolean,
      default: false,
    },

    noCaps: {
      type: Boolean,
      default: false,
    },

    isLoading: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped></style>
