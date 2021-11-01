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
      ref="wrapper"
      :is-focused="isFocused || datePicker"
      :is-clearable="isClearable"
      :has-error="hasError"
      has-action
      @clear="onClear"
    >
      <template #default>
        <div
          :tabindex="0"
          class="date-field"
          @focus="isFocused = true"
          @blur="isFocused = false"
          @click="toggleDatePicker"
          @keypress.space.stop="toggleDatePicker"
        >
          {{ value }}
        </div>
      </template>

      <template #action>
        <q-icon
          name="eva-calendar-outline"
          color="gray-6"
          size="20px"
          @click="toggleDatePicker"
        />
      </template>
    </FormFieldWrapper>

    <!-- ... -->

    <!-- field error -->

    <FormFieldError v-if="error">
      {{ error }}
    </FormFieldError>

    <!-- ... -->

    <!-- date picker -->

    <q-menu
      :target="$refs.wrapper"
      v-model="datePicker"
      no-parent-event
      content-class="box-shadow-2xl"
    >
      <q-date minimal :value="value" :options="dateRange" @input="onInput" />
    </q-menu>

    <!-- ... -->
  </div>
</template>

<script>
import FormFieldLabel from "./FormFieldLabel.vue";
import FormFieldWrapper from "./FormFieldWrapper.vue";
import FormFieldError from "./FormFieldError.vue";

function validateDate(value) {
  // if empty string

  if (!value) {
    return true;
  }

  // should not be more than 10 characters (yyyy/mm/dd)

  if (value.length > 10) {
    return false;
  }

  // should be in format (yyyy/mm/dd)

  const regEx = /[0-9]{4}[\\/][0-9]{2}[\\/][0-9]{2}$/g;
  return regEx.test(value);
}

export default {
  name: "DateField",

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
      type: String,
      required: true,
      validator: validateDate,
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

    minDate: {
      type: String,
      default: "",
      validator: validateDate,
    },

    maxDate: {
      type: String,
      default: "",
      validator: validateDate,
    },
  },

  data() {
    return {
      isFocused: false,
      datePicker: false,
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
    toggleDatePicker() {
      this.datePicker = !this.datePicker;
    },

    onInput(value) {
      this.$emit("input", value);
    },

    onClear() {
      this.datePicker = false;
      this.$emit("input", "");
    },

    dateRange(date) {
      if (this.minDate && this.maxDate) {
        return date >= this.minDate && date <= this.maxDate;
      }

      if (this.minDate) {
        return date >= this.minDate;
      }

      if (this.maxDate) {
        return date <= this.minDate;
      }

      return true;
    },
  },
};
</script>

<style lang="scss" scoped>
.date-field {
  cursor: pointer;
  color: $gray-10;
  font-weight: 500;
  font-size: 13px;
  padding: 4px;
  height: 34px;
  display: flex;
  align-items: center;
  outline: none;
}
</style>
