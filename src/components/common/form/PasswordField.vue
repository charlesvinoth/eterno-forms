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
      ref="wrapper"
      :is-focused="isFocused"
      :is-clearable="isClearable"
      :has-error="hasError"
      has-action
      @clear="onClear"
    >
      <template #default>
        <div>
          <input
            :value="value"
            :type="showPassword ? 'text' : 'password'"
            @input="onInput"
            @focus="isFocused = true"
            @blur="isFocused = false"
          />
        </div>
      </template>

      <template #action>
        <q-icon
          v-if="value"
          :name="showPassword ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
          color="gray-6"
          size="20px"
          @click="showPassword = !showPassword"
        />
      </template>
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
  name: "PasswordField",

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
      showPassword: false,
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

<style lang="scss" scoped>
.password-field {
  color: $gray-10;
  font-weight: 500;
  font-size: 13px;
  padding: 4px;
  display: flex;
  align-items: center;
  outline: none;
}
</style>
