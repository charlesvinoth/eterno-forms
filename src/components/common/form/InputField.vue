<template>
  <div
    :class="{
      'field-is-readonly': isReadonly,
      'field-is-disabled': isDisabled,
    }"
  >
    <!-- field label -->

    <FormFieldLabel :is-mandatory="isMandatory" :tooltip="tooltip">
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
      <input
        :value="value"
        :type="type"
        @input="onInput"
        @focus="isFocused = true"
        @blur="isFocused = false"
      />
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
      required: true,
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
      type: [String, Number],
      required: true,
    },

    type: {
      type: String,
      default: "text",
      validator(value) {
        return ["text", "number", "date", "time"].includes(value);
      },
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
      const value =
        this.type === "number" ? Number(e.target.value) : e.target.value;
      this.$emit("input", value);
    },

    onClear() {
      this.$emit("input", "");
    },
  },
};
</script>

<style lang="scss" scoped></style>
