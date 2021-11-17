<template>
  <div
    :class="{
      'field-is-readonly': isReadonly,
      'field-is-disabled': isDisabled,
    }"
  >
    <!-- field label -->

    <FormFieldLabel v-if="label" :is-mandatory="isMandatory" :tooltip="tooltip">
      {{ label }}
    </FormFieldLabel>

    <!-- ... -->

    <!-- field wrapper -->

    <FormFieldWrapper
      :is-focused="isFocused"
      :is-clearable="isClearable"
      :has-error="hasError"
      @clear="onClear"
    >
      <textarea
        :value="value"
        rows="4"
        @input="onInput"
        @focus="isFocused = true"
        @blur="isFocused = false"
      ></textarea>
    </FormFieldWrapper>

    <!-- ... -->

    <!-- field error -->

    <FormFieldError v-if="error">
      {{ error }}
    </FormFieldError>

    <!-- ... -->
  </div>
</template>

<script>
import FormFieldLabel from "./FormFieldLabel.vue";
import FormFieldWrapper from "./FormFieldWrapper.vue";
import FormFieldError from "./FormFieldError.vue";

export default {
  name: "InputField",

  components: { FormFieldLabel, FormFieldWrapper, FormFieldError },

  props: {
    label: {
      type: String,
      default: "",
    },

    isMandatory: {
      type: Boolean,
      default: false,
    },

    tooltip: {
      type: String,
      default: "",
    },

    value: {
      type: String,
      required: true,
    },

    error: {
      type: String,
      default: "",
    },

    isDisabled: {
      type: Boolean,
      default: false,
    },

    isReadonly: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      isFocused: false,
    };
  },

  computed: {
    hasError() {
      return Boolean(this.error);
    },

    isClearable() {
      if (this.isDisabled) return false;
      if (this.isReadonly) return false;
      return Boolean(this.value);
    },
  },

  methods: {
    onInput(e) {
      this.$emit("input", e.target.value);
    },

    onClear() {
      this.$emit("input", "");
    },
  },
};
</script>

<style lang="scss" scoped></style>
