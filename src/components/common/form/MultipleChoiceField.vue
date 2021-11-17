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

    <!-- field -->

    <div v-if="options.length" class="row items-center">
      <div
        v-for="option in options"
        :key="option.id"
        :tabindex="0"
        class="option"
        :class="_optionsPerLine"
        @click="selectOption(option)"
        @keypress.space.stop="selectOption(option)"
      >
        <div class="icon">
          <q-icon
            :name="isSelected(option) ? 'eva-checkmark-square-2' : 'eva-square'"
            :color="isSelected(option) ? 'secondary' : 'gray-4'"
            size="20px"
          />
        </div>

        <div class="label">{{ option.label }}</div>
      </div>
    </div>

    <!-- ... -->

    <!-- no option -->

    <div v-else class="no-option">Go to field settings to add options</div>

    <!-- ... -->

    <!-- field error -->

    <FormFieldError v-if="error">
      {{ error }}
    </FormFieldError>

    <!-- ... -->
  </div>
</template>

<script>
import { isEmpty } from "lodash-es";

import FormFieldLabel from "./FormFieldLabel.vue";
import FormFieldError from "./FormFieldError.vue";

export default {
  name: "MultipleChoiceField",

  components: {
    FormFieldLabel,
    FormFieldError,
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

    optionsPerLine: {
      type: Number,
      default: 1,
      validator(value) {
        return [0, 1, 2, 3, 4, 6].includes(value);
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

    emitValueOnly: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      isFocused: false,
      selectedOptions: [],
    };
  },

  computed: {
    _optionsPerLine() {
      switch (this.optionsPerLine) {
        case 0:
          return "col";
        case 2:
          return "col-6";
        case 3:
          return "col-4";
        case 4:
          return "col-3";
        case 6:
          return "col-2";
        default:
          return "col-12";
      }
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
  },

  methods: {
    isSelected(option) {
      if (isEmpty(this.selectedOptions)) return false;

      const isSelected = this.selectedOptions.find(
        (_option) => _option.id === option.id
      );

      return Boolean(isSelected);
    },

    selectOption(option) {
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
  },
};
</script>

<style lang="scss" scoped>
.option {
  display: flex;
  align-items: center;
  height: 36px;
  outline: 0;

  .icon {
    height: 36px;
    width: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100%;
    margin-right: 4px;
  }

  .label {
    color: $gray-10;
    font-weight: 500;
    font-size: 13px;
  }

  &:hover,
  &:focus {
    cursor: pointer;

    .icon {
      background-color: $gray-2;
    }
  }
}

.no-option {
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: $gray-5;
  font-size: 12px;
  border: 1px solid $gray-3;
  border-radius: 4px;
}
</style>
