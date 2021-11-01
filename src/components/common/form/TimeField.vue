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
      :is-focused="isFocused || timePicker"
      :is-clearable="isClearable"
      :has-error="hasError"
      has-action
      @clear="onClear"
    >
      <template #default>
        <div
          :tabindex="0"
          class="time-field"
          @focus="isFocused = true"
          @blur="isFocused = false"
          @click="toggleTimePicker"
          @keypress.space.stop="toggleTimePicker"
        >
          {{ value }}
        </div>
      </template>

      <template #action>
        <q-icon
          name="eva-clock-outline"
          color="gray-6"
          size="20px"
          @click="toggleTimePicker"
        />
      </template>
    </FormFieldWrapper>

    <!-- ... -->

    <!-- field error -->

    <FormFieldError v-if="error">
      {{ error }}
    </FormFieldError>

    <!-- ... -->

    <!-- time picker -->

    <q-menu
      :target="$refs.wrapper"
      v-model="timePicker"
      no-parent-event
      content-class="box-shadow-2xl"
    >
      <TimePicker
        :value="value"
        :min-time="minTime"
        :max-time="maxTime"
        @input="onInput"
      />
    </q-menu>

    <!-- ... -->
  </div>
</template>

<script>
import FormFieldLabel from "./FormFieldLabel.vue";
import FormFieldWrapper from "./FormFieldWrapper.vue";
import FormFieldError from "./FormFieldError.vue";
import TimePicker from "./TimePicker.vue";

function validateTime(value) {
  // if empty string

  if (!value) {
    return true;
  }

  // should not be more than 5 characters (hh:mm aa)

  if (value.length > 8) {
    return false;
  }

  // should be in format (hh:mm aa)

  const regEx = /[0-9]{2}[:][0-9]{2} ([AP][M])$/g;
  const isValid = regEx.test(value);

  if (isValid) {
    const [time] = value.split(" ");
    const [hour, minute] = time.split(":");
    return Number(hour) <= 12 && Number(minute) <= 59;
  } else {
    return false;
  }
}

export default {
  name: "TimeField",

  components: { FormFieldLabel, FormFieldWrapper, FormFieldError, TimePicker },

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
      validator: validateTime,
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

    minTime: {
      type: String,
      default: "",
      validator: validateTime,
    },

    maxTime: {
      type: String,
      default: "",
      validator: validateTime,
    },
  },

  data() {
    return {
      isFocused: false,
      timePicker: false,
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
    toggleTimePicker() {
      this.timePicker = !this.timePicker;
    },

    onInput(value) {
      this.$emit("input", value);
    },

    onClear() {
      this.timePicker = false;
      this.$emit("input", "");
    },
  },
};
</script>

<style lang="scss" scoped>
.time-field {
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
