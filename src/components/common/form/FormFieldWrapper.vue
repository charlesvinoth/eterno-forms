<template>
  <div
    class="form-field-wrapper"
    :class="{
      'field-has-error': hasError,
      'field-is-focused': isFocused,
    }"
  >
    <!-- field -->

    <div class="form-field">
      <slot name="default"></slot>
    </div>

    <!-- ... -->

    <!-- action -->

    <div v-if="hasAction" class="form-field-action">
      <slot name="action"></slot>
    </div>

    <!-- ... -->

    <!-- clear icon -->

    <div
      v-if="isClearable"
      class="form-field-clear-icon"
      @click.stop="$emit('clear')"
    >
      <q-icon name="eva-close" size="20px"></q-icon>
    </div>

    <!-- ... -->
  </div>
</template>

<script>
export default {
  name: "FormFieldWrapper",

  props: {
    isFocused: {
      type: Boolean,
      default: false,
    },

    isClearable: {
      type: Boolean,
      default: false,
    },

    hasError: {
      type: Boolean,
      default: false,
    },

    hasAction: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.form-field-wrapper {
  display: flex;
  align-items: center;
  min-height: 36px;
  border: 1px solid $gray-3;
  border-radius: 4px;

  .form-field {
    flex: 1;
    height: 100%;
  }

  .form-field-action {
    margin-right: 4px;
    cursor: pointer;
  }

  .form-field-clear-icon {
    color: $gray-4;
    margin-right: 4px;

    &:hover {
      cursor: pointer;
    }
  }
}
</style>
