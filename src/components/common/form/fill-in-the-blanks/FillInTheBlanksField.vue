<template>
  <div>
    <div
      :class="{
        'field-is-readonly': isReadonly,
        'field-is-disabled': isDisabled,
      }"
    >
      <!-- field label -->

      <FormFieldLabel
        v-if="label"
        :is-mandatory="isMandatory"
        :tooltip="tooltip"
      >
        {{ label }}
      </FormFieldLabel>

      <!-- ... -->

      <!-- field -->

      <div v-if="content.html" class="">
        <RenderFieldContent
          :html="html"
          :fields-model="fieldsModel"
          @input="onInput"
        />
      </div>

      <!-- ... -->

      <!-- no content -->

      <div v-else class="no-content">
        Click edit to add appropriate fields and text
      </div>

      <!-- ... -->

      <!-- field error -->

      <FormFieldError v-if="error">
        {{ error }}
      </FormFieldError>

      <!-- ... -->
    </div>

    <!-- ... -->
  </div>
</template>

<script>
import FormFieldLabel from "../FormFieldLabel.vue";
import FormFieldError from "../FormFieldError.vue";

import RenderFieldContent from "./RenderFieldContent.vue";

export default {
  name: "FillInTheBlanksField",

  components: { FormFieldLabel, FormFieldError, RenderFieldContent },

  props: {
    value: {
      type: Object,
      required: true,
    },

    content: {
      type: Object,
      required: true,
    },

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
      html: "",
      fields: [],
      fieldsModel: {},
    };
  },

  watch: {
    content: {
      immediate: true,
      deep: true,
      handler() {
        // <field-placeholder type="text" id="PUGoWEuVHvezbryz9s2iG"></field-placeholder>

        this.html = this.content.html;
        this.fields = this.content.fields;

        this.html = this.html.replaceAll(
          /<field-placeholder type="\S*" id="\S*"><\/field-placeholder>/gm,
          "### FIELD ###"
        );

        this.fields.forEach((field) => {
          this.fieldsModel[field.id] = this.fieldsModel[field.id] || "";
          this.html = this.html.replace("### FIELD ###", this.getField(field));
        });
      },
    },
  },

  methods: {
    getField(field) {
      switch (field.type) {
        case "TEXT":
          return `<InputField v-model="fieldsModel['${field.id}']" class="inline-field" />`;
        case "NUMBER":
          return `<InputField v-model="fieldsModel['${field.id}']" type="number" class="inline-field" />`;
        case "DATE":
          return `<DateField v-model="fieldsModel['${field.id}']" class="inline-field" />`;
        case "TIME":
          return `<TimeField v-model="fieldsModel['${field.id}']" class="inline-field" />`;
        case "SINGLE_SELECT":
          return `<SingleSelectField v-model="fieldsModel['${field.id}']" v-bind:options="[]" class="inline-field" />`;
      }
    },

    onInput(value) {
      this.$emit("input", value);
    },
  },
};
</script>

<style lang="scss" scoped>
.no-content {
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
