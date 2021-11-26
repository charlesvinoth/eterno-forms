<template>
  <div
    v-on="$listeners"
    class="field"
    :class="[getFieldSize(field.size), { active: selectedField === field.id }]"
  >
    <template>
      <!-- text -->

      <div v-if="field.type === 'TEXT'"></div>

      <!-- ... -->

      <!-- section -->

      <div v-if="field.type === 'SECTION'"></div>

      <!-- ... -->

      <!-- short text -->

      <InputField
        v-if="field.type === 'SHORT_TEXT'"
        v-model="SHORT_TEXT"
        :label="field.label"
        :tooltip="field.tooltip"
        :is-mandatory="field.isMandatory"
        is-readonly
      />

      <!-- ... -->

      <!-- long text -->

      <TextareaField
        v-if="field.type === 'LONG_TEXT'"
        v-model="LONG_TEXT"
        :label="field.label"
        :tooltip="field.tooltip"
        :is-mandatory="field.isMandatory"
        is-readonly
      />

      <!-- ... -->

      <!-- number -->

      <InputField
        v-if="field.type === 'NUMBER'"
        v-model="NUMBER"
        type="number"
        :label="field.label"
        :tooltip="field.tooltip"
        :is-mandatory="field.isMandatory"
        is-readonly
      />

      <!-- ... -->

      <!-- date -->

      <DateField
        v-if="field.type === 'DATE'"
        v-model="DATE"
        :label="field.label"
        :tooltip="field.tooltip"
        :is-mandatory="field.isMandatory"
        is-readonly
      />

      <!-- ... -->

      <!-- time -->

      <TimeField
        v-if="field.type === 'TIME'"
        v-model="TIME"
        :label="field.label"
        :tooltip="field.tooltip"
        :is-mandatory="field.isMandatory"
        is-readonly
      />

      <!-- ... -->

      <!-- single select -->

      <SingleSelectField
        v-if="field.type === 'SINGLE_SELECT'"
        v-model="SINGLE_SELECT"
        :label="field.label"
        :tooltip="field.tooltip"
        :is-mandatory="field.isMandatory"
        :options="field.options"
        is-readonly
      />

      <!-- ... -->

      <!-- multi select -->

      <MultiSelectField
        v-if="field.type === 'MULTI_SELECT'"
        v-model="MULTI_SELECT"
        :label="field.label"
        :tooltip="field.tooltip"
        :is-mandatory="field.isMandatory"
        :options="field.options"
        is-readonly
      />

      <!-- ... -->

      <!-- single choice -->

      <SingleChoiceField
        v-if="field.type === 'SINGLE_CHOICE'"
        v-model="SINGLE_CHOICE"
        :label="field.label"
        :tooltip="field.tooltip"
        :is-mandatory="field.isMandatory"
        :options="field.options"
        :options-per-line="field.optionsPerLine"
        is-readonly
      />

      <!-- ... -->

      <!-- multiple choice -->

      <MultipleChoiceField
        v-if="field.type === 'MULTIPLE_CHOICE'"
        v-model="MULTIPLE_CHOICE"
        :label="field.label"
        :tooltip="field.tooltip"
        :is-mandatory="field.isMandatory"
        :options="field.options"
        :options-per-line="field.optionsPerLine"
        is-readonly
      />

      <!-- ... -->

      <!-- fill in the blanks -->

      <FillInTheBlanksField
        v-if="field.type === 'FILL_IN_THE_BLANKS'"
        v-model="FILL_IN_THE_BLANKS"
        :label="field.label"
        :tooltip="field.tooltip"
        :content="field.content"
        is-readonly
      />

      <!-- ... -->

      <!-- grid -->

      <GridField
        v-if="field.type === 'GRID'"
        v-model="GRID"
        :label="field.label"
        :tooltip="field.tooltip"
        :is-mandatory="field.isMandatory"
        :columns="field.columns"
        is-readonly
      />

      <!-- ... -->

      <!-- matrix -->

      <MatrixField
        v-if="field.type === 'MATRIX'"
        v-model="MATRIX"
        :label="field.label"
        :tooltip="field.tooltip"
        :is-mandatory="field.isMandatory"
        :columns="field.columns"
        :rows="field.rows"
        :axis="field.matrixAxis"
        is-readonly
      />

      <!-- ... -->

      <!-- image -->

      <ImageField
        v-if="field.type === 'IMAGE'"
        v-model="IMAGE"
        :label="field.label"
        :tooltip="field.tooltip"
        :is-mandatory="field.isMandatory"
        is-readonly
      />

      <!-- ... -->

      <!-- signature -->

      <SignatureField
        v-if="field.type === 'SIGNATURE'"
        v-model="SIGNATURE"
        :label="field.label"
        :tooltip="field.tooltip"
        :is-mandatory="field.isMandatory"
        is-readonly
      />

      <!-- ... -->

      <!-- divider -->

      <div
        v-if="field.type === 'DIVIDER'"
        :style="getDividerStyle(field)"
      ></div>

      <!-- ... -->
    </template>

    <!-- actions -->

    <div v-if="selectedField === field.id" class="actions">
      <q-btn
        v-tooltip:tertiary.right="'field settings'"
        round
        size="sm"
        icon="eva-settings-2-outline"
        color="tertiary"
        class="q-mb-xs"
        @click.stop="$emit('edit')"
      />

      <q-btn
        v-tooltip:secondary.right="'delete field'"
        round
        size="sm"
        icon="eva-trash-2-outline"
        color="secondary"
        @click.stop="$emit('delete')"
      />
    </div>

    <!-- ... -->
  </div>
</template>

<script>
import InputField from "@/components/common/form/InputField.vue";
import TextareaField from "@/components/common/form/TextareaField.vue";
import DateField from "@/components/common/form/DateField.vue";
import TimeField from "@/components/common/form/TimeField.vue";
import SingleSelectField from "@/components/common/form/SingleSelectField.vue";
import MultiSelectField from "@/components/common/form/MultiSelectField.vue";
import SingleChoiceField from "@/components/common/form/SingleChoiceField.vue";
import MultipleChoiceField from "@/components/common/form/MultipleChoiceField.vue";
import FillInTheBlanksField from "@/components/common/form/fill-in-the-blanks/FillInTheBlanksField.vue";
import GridField from "@/components/common/form/GridField.vue";
import MatrixField from "@/components/common/form/MatrixField.vue";
import ImageField from "@/components/common/form/ImageField.vue";
import SignatureField from "@/components/common/form/SignatureField.vue";

import form from "../../mixins/form.js";

export default {
  name: "Field",

  components: {
    InputField,
    TextareaField,
    DateField,
    TimeField,
    SingleSelectField,
    MultiSelectField,
    SingleChoiceField,
    MultipleChoiceField,
    FillInTheBlanksField,
    GridField,
    MatrixField,
    ImageField,
    SignatureField,
  },

  props: {
    field: {
      type: Object,
      required: true,
    },

    selectedField: {
      type: String,
      default: "",
    },
  },

  mixins: [form],

  data() {
    return {
      SHORT_TEXT: "",
      LONG_TEXT: "",
      NUMBER: "",
      DATE: "",
      TIME: "",
      SINGLE_SELECT: "",
      MULTI_SELECT: [],
      SINGLE_CHOICE: "",
      MULTIPLE_CHOICE: [],
      FILL_IN_THE_BLANKS: {},
      GRID: [],
      MATRIX: [],
      IMAGE: "",
      SIGNATURE: "",
    };
  },
};
</script>

<style lang="scss" scoped>
.field {
  padding: 8px;
  border: 1px solid transparent;

  &.active {
    border: 1px dashed $tertiary;
    border-radius: 4px;
  }

  .actions {
    position: absolute;
    top: 0;
    right: -56px;
    display: flex;
    flex-direction: column;
  }
}
</style>
