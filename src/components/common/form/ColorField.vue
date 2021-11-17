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
      :is-focused="isFocused || colorPicker"
      :is-clearable="isClearable"
      :has-error="hasError"
      has-action
      @clear="onClear"
    >
      <template #default>
        <div
          :tabindex="0"
          class="color-field"
          @focus="isFocused = true"
          @blur="isFocused = false"
          @click="toggleColorPicker"
          @keypress.space.stop="toggleColorPicker"
        >
          {{ value }}
        </div>
      </template>

      <template #action>
        <q-icon
          name="eva-color-palette-outline"
          color="gray-6"
          size="20px"
          @click="toggleColorPicker"
        />
      </template>
    </FormFieldWrapper>

    <!-- ... -->

    <!-- field error -->

    <FormFieldError v-if="error">
      {{ error }}
    </FormFieldError>

    <!-- ... -->

    <!-- color picker -->

    <q-menu
      :target="$refs.wrapper"
      v-model="colorPicker"
      no-parent-event
      content-class="box-shadow-2xl"
    >
      <ColorPicker v-if="showCustomPicker" :value="value" @input="onInput" />

      <q-color
        v-else
        minimal
        :value="value"
        default-view="palette"
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
import ColorPicker from "./ColorPicker.vue";

export default {
  name: "ColorField",

  components: { FormFieldLabel, FormFieldWrapper, FormFieldError, ColorPicker },

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

    showCustomPicker: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      isFocused: false,
      colorPicker: false,
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
    toggleColorPicker() {
      this.colorPicker = !this.colorPicker;
    },

    onInput(value) {
      this.$emit("input", value);
    },

    onClear() {
      this.colorPicker = false;
      this.$emit("input", "");
    },
  },
};
</script>

<style lang="scss" scoped>
.color-field {
  cursor: pointer;
  color: $gray-8;
  font-weight: 500;
  font-size: 13px;
  padding: 4px;
  height: 34px;
  display: flex;
  align-items: center;
  outline: none;
  text-transform: capitalize;
}
</style>
