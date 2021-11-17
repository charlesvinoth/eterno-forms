<template>
  <div
    class="relative-position"
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

    <div
      class="q-pt-sm rounded"
      :class="{
        'field-has-error': hasError,
      }"
    >
      <div v-for="vector in value" :key="vector.id" class="vector-settings">
        <!-- field name -->

        <div class="wrapper">
          <InputField v-model="vector.name" is-readonly />
        </div>

        <!-- ... -->

        <div class="q-px-xs"></div>

        <!-- vector type -->

        <div class="wrapper">
          <SingleSelectField
            v-model="vector.type"
            :options="vectorTypes"
            hide-search
            hide-clear-btn
            emit-value-only
          />
        </div>

        <!-- ... -->

        <div class="q-px-xs"></div>

        <!-- vector settings -->

        <q-icon
          v-tooltip:secondary.top="'more settings'"
          name="eva-settings-2-outline"
          size="20px"
          color="secondary"
          class="cursor-pointer"
        />

        <!-- ... -->
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
import InputField from "./InputField.vue";
import SingleSelectField from "./SingleSelectField.vue";

export default {
  name: "VectorSettingsField",

  components: {
    FormFieldLabel,
    FormFieldError,
    InputField,
    SingleSelectField,
  },

  props: {
    value: {
      type: Array,
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

  data() {
    return {
      vectorTypes: [
        {
          id: this.$nano.id(),
          label: "Text",
          value: "TEXT",
        },
        {
          id: this.$nano.id(),
          label: "Number",
          value: "NUMBER",
        },
        {
          id: this.$nano.id(),
          label: "Date",
          value: "DATE",
        },
        {
          id: this.$nano.id(),
          label: "Time",
          value: "TIME",
        },
        {
          id: this.$nano.id(),
          label: "Select",
          value: "SINGLE_SELECT",
        },
      ],
    };
  },

  computed: {
    hasError() {
      return Boolean(this.error);
    },
  },
};
</script>

<style lang="scss" scoped>
.vector-settings {
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 8px;

  .wrapper {
    flex: 1;
  }
}
</style>
