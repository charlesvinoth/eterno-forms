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
      :is-focused="isFocused || optionPicker"
      :is-clearable="isClearable"
      :has-error="hasError"
      has-action
      class="cursor-pointer"
      @clear="onClear"
      @click="toggleOptionPicker"
    >
      <template #default>
        <div
          :tabindex="0"
          class="select-field"
          @focus="isFocused = true"
          @blur="isFocused = false"
          @click.stop="toggleOptionPicker"
          @keypress.space.stop="toggleOptionPicker"
        >
          {{ selectedOption.label }}
        </div>
      </template>

      <template #action>
        <q-icon
          name="eva-chevron-down"
          color="gray-6"
          size="20px"
          @click="toggleOptionPicker"
        />
      </template>
    </FormFieldWrapper>

    <!-- ... -->

    <!-- field error -->

    <FormFieldError v-if="error">
      {{ error }}
    </FormFieldError>

    <!-- ... -->

    <!-- option picker -->

    <q-menu
      :target="$refs.wrapper"
      v-model="optionPicker"
      fit
      no-refocus
      no-parent-event
      content-class="box-shadow-2xl"
    >
      <OptionsPicker
        :value="selectedOption"
        :options="filteredOptions"
        :hide-search="hideSearch"
        :new-option="newOption"
        @filter="filterOptions"
        @add="addNewOption"
        @select="onSelect"
      />
    </q-menu>

    <!-- ... -->
  </div>
</template>

<script>
import { lowerCase } from "lodash-es";

import FormFieldLabel from "./FormFieldLabel.vue";
import FormFieldWrapper from "./FormFieldWrapper.vue";
import FormFieldError from "./FormFieldError.vue";
import OptionsPicker from "./OptionsPicker";

export default {
  name: "SingleSelectField",

  components: {
    FormFieldLabel,
    FormFieldWrapper,
    FormFieldError,
    OptionsPicker,
  },

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
      type: [String, Number, Object, Boolean],
      required: true,
    },

    options: {
      type: Array,
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

    emitValueOnly: {
      type: Boolean,
      default: false,
    },

    hideSearch: {
      type: Boolean,
      default: false,
    },

    newOption: {
      type: Boolean,
      default: false,
    },

    hideClearBtn: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      isFocused: false,
      optionPicker: false,
      selectedOption: {},
      filterQuery: "",
      filteredOptions: [],
    };
  },

  computed: {
    hasError() {
      return Boolean(this.error);
    },

    isClearable() {
      if (this.hideClearBtn) return false;
      if (this.isDisabled) return false;
      if (this.isReadonly) return false;
      return Boolean(this.value);
    },
  },

  watch: {
    emitValueOnly: {
      immediate: true,
      handler() {
        if (this.emitValueOnly) {
          this.selectedOption =
            this.options.find((option) => option.value === this.value) || {};
          return;
        }

        this.selectedOption = this.value;
      },
    },

    filterQuery: {
      immediate: true,
      handler() {
        if (!this.filterQuery) {
          this.filteredOptions = this.options;
          return;
        }

        this.filteredOptions = this.options.filter((option) =>
          lowerCase(option.label).includes(lowerCase(this.filterQuery))
        );
      },
    },

    optionPicker() {
      if (!this.optionPicker) {
        this.filterQuery = "";
      }
    },
  },

  methods: {
    toggleOptionPicker() {
      this.optionPicker = !this.optionPicker;
    },

    onSelect(option) {
      this.selectedOption = option;
      this.optionPicker = false;

      if (this.emitValueOnly) {
        this.$emit("input", option.value);
        return;
      }

      this.$emit("input", option);
    },

    onClear() {
      this.selectedOption = {};
      this.optionPicker = false;

      if (this.emitValueOnly) {
        this.$emit("input", "");
        return;
      }

      this.$emit("input", {});
    },

    filterOptions(query) {
      this.filterQuery = query;
    },

    addNewOption(value) {
      const optionExists = this.options.find(
        (option) => lowerCase(option.label) === lowerCase(value)
      );

      if (!optionExists) {
        const newOption = {
          id: this.$nano.id(),
          label: value,
          value: value,
        };
        this.options.push(newOption);
        this.onSelect(newOption);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.select-field {
  cursor: pointer;
  color: $gray-10;
  font-weight: 500;
  font-size: 13px;
  padding: 4px;
  display: flex;
  align-items: center;
  outline: none;
}
</style>
