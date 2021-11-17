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
      :is-focused="isFocused || optionsPicker"
      :is-clearable="isClearable"
      :has-error="hasError"
      has-action
      @clear="onClear"
    >
      <template #default>
        <div
          :tabindex="0"
          class="select-field"
          @focus="isFocused = true"
          @blur="isFocused = false"
          @click="toggleOptionsPicker"
          @keypress.space.stop="toggleOptionsPicker"
        >
          <div
            v-for="(option, index) in selectedOptions"
            :key="option.id"
            class="selected-option"
          >
            <!-- label -->

            <div class="option-label">{{ option.label }}</div>

            <!-- ... -->

            <!-- remove icon -->

            <q-icon
              name="eva-close"
              size="18px"
              class="option-remove-icon"
              @click.stop="onRemoveOption(index)"
            ></q-icon>

            <!-- ... -->
          </div>
        </div>
      </template>

      <template #action>
        <q-icon
          name="eva-chevron-down"
          color="gray-6"
          size="20px"
          @click="toggleOptionsPicker"
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
      v-model="optionsPicker"
      fit
      no-refocus
      no-parent-event
      content-class="box-shadow-2xl"
    >
      <OptionsPicker
        is-multiple
        :value="selectedOptions"
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
  name: "MultiSelectField",

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
      type: Array,
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
  },

  data() {
    return {
      isFocused: false,
      optionsPicker: false,
      selectedOptions: [],
      filterQuery: "",
      filteredOptions: [],
    };
  },

  computed: {
    hasError() {
      return Boolean(this.error);
    },

    isClearable() {
      if (this.isDisabled) return false;
      if (this.isReadonly) return false;
      return Boolean(this.value.length);
    },
  },

  watch: {
    emitValueOnly: {
      immediate: true,
      handler() {
        if (this.emitValueOnly) {
          this.selectedOptions = this.value.map((value) =>
            this.options.find((option) => option.value === value)
          );
          return;
        }

        this.selectedOptions = this.value;
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

    optionsPicker() {
      if (!this.optionsPicker) {
        this.filterQuery = "";
      }
    },
  },

  methods: {
    toggleOptionsPicker() {
      this.optionsPicker = !this.optionsPicker;
    },

    onSelect(option) {
      const optionIdx = this.selectedOptions.findIndex(
        (_option) => _option.id === option.id
      );

      optionIdx == -1
        ? this.selectedOptions.push(option)
        : this.selectedOptions.splice(optionIdx, 1);

      if (this.emitValueOnly) {
        this.$emit(
          "input",
          this.selectedOptions.map((option) => option.value)
        );
        return;
      }

      this.$emit("input", this.selectedOptions);
    },

    onClear() {
      this.selectedOptions = [];
      this.optionsPicker = false;

      this.$emit("input", []);
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
        this.optionsPicker = false;
        this.options.push(newOption);
        this.onSelect(newOption);
      }
    },

    onRemoveOption(optionIdx) {
      this.selectedOptions.splice(optionIdx, 1);
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
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  outline: none;
  min-height: 34px;
  padding-bottom: 4px;
}

.selected-option {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  user-select: none;
  padding: 4px 8px;
  border-radius: 4px;
  background-color: $gray-2;
  margin-top: 4px;
  margin-left: 4px;

  .option-label {
    font-size: 13px;
    font-weight: 500;
    color: $gray-10;
  }

  .option-remove-icon {
    color: $gray-5;
    margin-left: 8px;

    &:hover {
      cursor: pointer;
    }
  }
}
</style>
