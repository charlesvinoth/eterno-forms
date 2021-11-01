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

    <!-- field -->

    <div
      class="options-wrapper"
      :class="{
        'field-has-error': hasError,
        'field-is-focused': isFocused,
      }"
    >
      <!-- options -->

      <BaseScrollbar :height="scrollbarHeight" class="q-pr-xs">
        <div
          v-for="(option, index) in options"
          :key="option.id"
          class="option"
          @mouseenter="activeOption = option"
          @mouseleave="activeOption = {}"
        >
          <!-- label -->

          <div class="label">{{ index + 1 }}. {{ option.label }}</div>

          <!-- ... -->

          <!-- actions -->

          <template v-if="option.id === activeOption.id">
            <q-icon
              v-tooltip:secondary.top="'edit'"
              name="eva-edit-outline"
              size="20px"
              color="secondary"
              class="q-mr-xs"
              @click="editOption(option)"
            />

            <q-icon
              v-tooltip:red.top="'delete'"
              name="eva-trash-2-outline"
              size="20px"
              color="red"
              @click="deleteOption(index)"
            />
          </template>

          <!-- ... -->
        </div>
      </BaseScrollbar>

      <!-- ... -->

      <!-- add option -->

      <div class="add-option">
        <input
          v-model="newOption"
          ref="input"
          type="text"
          placeholder="Type and press 'Enter' to add new option"
          @keypress.enter="saveOption"
          @focus="isFocused = true"
          @blur="isFocused = false"
        />

        <q-btn
          round
          flat
          size="sm"
          color="gray-5"
          icon="eva-save-outline"
          class="q-mr-xs"
          @click="saveOption"
        />
      </div>
    </div>

    <!-- ... -->

    <!-- field error -->

    <FormFieldError v-if="error">
      {{ error }}
    </FormFieldError>

    <!-- ... -->
  </div>
</template>

<script>
import { cloneDeep } from "lodash-es";

import FormFieldLabel from "./FormFieldLabel.vue";
import FormFieldError from "./FormFieldError.vue";

export default {
  name: "OptionField",

  components: {
    FormFieldLabel,
    FormFieldError,
  },

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
  },

  data() {
    return {
      options: [],
      activeOption: "",
      selectedOption: "",
      newOption: "",
      isFocused: false,
    };
  },

  computed: {
    scrollbarHeight() {
      const height = 28 * this.options.length;
      return height > 140 ? "140px" : `${height}px`;
    },

    hasError() {
      return Boolean(this.error);
    },
  },

  watch: {
    value: {
      immediate: true,
      deep: true,
      handler() {
        this.options = cloneDeep(this.value);
      },
    },
  },

  methods: {
    saveOption() {
      if (!this.newOption) return;

      if (this.selectedOption) {
        const optionIdx = this.options.findIndex(
          (option) => option.id === this.selectedOption
        );

        this.options[optionIdx] = {
          id: this.$nano.id(),
          label: this.newOption,
          value: this.newOption,
        };
      } else {
        this.options.push({
          id: this.$nano.id(),
          label: this.newOption,
          value: this.newOption,
        });
      }

      this.newOption = "";
      this.$emit("input", this.options);
    },

    editOption(option) {
      this.selectedOption = option.id;
      this.newOption = option.label;

      this.$refs.input.focus();
    },

    deleteOption(optionIdx) {
      this.options.splice(optionIdx, 1);
      this.$emit("input", this.options);
    },
  },
};
</script>

<style lang="scss" scoped>
.options-wrapper {
  border: 1px solid $gray-3;
  border-radius: 4px;

  .option {
    display: flex;
    align-items: center;
    height: 28px;
    cursor: pointer;
    margin: 0 4px;

    .label {
      color: $gray-10;
      font-size: 13px;
      font-weight: 500;
      flex: 1;
    }

    .input {
      border: 1px solid $secondary;
      border-radius: 4px;
      height: 28px;
      margin-right: 4px;
    }
  }

  .add-option {
    display: flex;
    align-items: center;
    height: 36px;
  }
}
</style>
