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

    <div class="row q-col-gutter-sm">
      <div v-for="option in options" :key="option.id" :class="_optionsPerLine">
        <!-- option -->

        <div
          class="option"
          :tabindex="0"
          @click="selectOption(option.value)"
          @keypress.space="selectOption(option.value)"
        >
          <!-- option avatar -->

          <div class="option-avatar" :class="avatarColor(option.color)">
            <q-icon :name="option.icon" size="20px" :color="option.color" />
          </div>

          <!-- ... -->

          <!-- option info -->

          <div class="option-info">
            <div class="title">{{ option.title }}</div>
            <div class="description">{{ option.description }}</div>
          </div>

          <!-- ... -->

          <!-- option check -->

          <div v-if="value === option.value" class="option-check">
            <q-icon
              name="eva-checkmark"
              color="white"
              size="16px"
              class="option-check-icon"
            ></q-icon>
          </div>

          <!-- ... -->
        </div>
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
import FormFieldLabel from "./FormFieldLabel.vue";
import FormFieldError from "./FormFieldError.vue";

export default {
  name: "ChooseField",

  components: { FormFieldLabel, FormFieldError },

  props: {
    value: {
      type: String,
      required: true,
    },

    label: {
      type: String,
      default: "",
    },

    tooltip: {
      type: String,
      default: "",
    },

    isMandatory: {
      type: Boolean,
      default: false,
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

    isDisabled: {
      type: Boolean,
      default: false,
    },

    isReadonly: {
      type: Boolean,
      default: false,
    },

    error: {
      type: String,
      default: "",
    },
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

  methods: {
    avatarColor(optionColor) {
      return `text-${optionColor}-1`;
    },

    selectOption(option) {
      this.$emit("input", option);
    },
  },
};
</script>

<style lang="scss" scoped>
.option {
  border: 1px solid $gray-3;
  border-radius: 4px;
  padding: 12px;
  display: flex;
  align-items: center;
  position: relative;

  .option-avatar {
    height: 36px;
    width: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100%;
    background-color: currentColor;
  }

  .option-info {
    flex: 1;
    margin-left: 16px;

    .title {
      color: $gray-8;
      font-size: 13px;
      font-weight: bold;
      text-transform: capitalize;
    }

    .description {
      color: $gray-5;
      font-size: 12px;
    }
  }

  &:hover {
    background-color: $gray-1;
    cursor: pointer;
  }

  &:focus {
    outline: none;
    border: 1px solid $secondary;
  }
}

.option-check {
  height: 28px;
  width: 28px;
  position: absolute;
  top: 0;
  right: 0;
  background-color: $secondary;
  border-radius: 100% 0% 0% 100% / 0% 100% 0% 100%;

  .option-check-icon {
    position: absolute;
    top: 0;
    right: 0;
    margin: 4px;
  }
}
</style>
