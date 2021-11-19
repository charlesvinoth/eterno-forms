<template>
  <div class="relative-position">
    <!-- fields -->

    <Draggable
      :value="value"
      group="fields"
      v-bind="{ animation: 200 }"
      @start="draggingField = true"
      @end="draggingField = false"
      @input="onInput"
    >
      <transition-group
        type="transition"
        :name="draggingField ? null : 'flip-list'"
        class="row q-col-gutter-xs"
      >
        <div
          v-for="field in value"
          :key="field.id"
          ref="field"
          :data-id="field.id"
          :class="[getFieldSize(field.size), field.id]"
          @click.stop="selectField(field)"
        >
          <!-- field -->

          <div class="field" :class="{ active: selectedField.id === field.id }">
            <!-- title -->
            <div
              v-if="field.type === 'TITLE'"
              :style="{ textAlign: field.titleAlignment }"
            >
              <div :style="getTitleStyle(field)">
                {{ field.titleText }}
              </div>
              <div v-if="field.subTitle" class="subtitle">
                {{ field.subTitle }}
              </div>
            </div>

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

            <!-- fill in the blanks field -->

            <FillInTheBlanksField
              v-if="field.type === 'FILL_IN_THE_BLANKS'"
              v-model="FILL_IN_THE_BLANKS"
              :label="field.label"
              :tooltip="field.tooltip"
              :content="field.content"
              is-readonly
            />

            <!-- ... -->

            <!-- grid field -->

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

            <!-- matrix field -->

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

            <!-- image field -->

            <ImageField
              v-if="field.type === 'IMAGE'"
              v-model="IMAGE"
              :label="field.label"
              :tooltip="field.tooltip"
              :is-mandatory="field.isMandatory"
              is-readonly
            />

            <!-- ... -->

            <!-- signature field -->

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
          </div>

          <!-- ... -->
        </div>
      </transition-group>
    </Draggable>

    <!-- ... -->

    <!-- actions -->

    <FieldActions
      v-if="selectedField.id"
      :show-edit-btn="selectedField.type === 'FILL_IN_THE_BLANKS'"
      class="actions"
      :style="{ top: actionTopPos }"
      @edit="editFieldContent"
      @settings="editFieldSettings"
      @delete="confirmDeleteField"
    />

    <!-- ... -->

    <!-- field settings -->

    <FieldSettings
      v-model="fieldSettings"
      :field="selectedField"
      @save="saveFieldSettings"
    />

    <!-- ... -->

    <!-- field content -->

    <FieldContent
      v-model="fieldContent"
      :content="selectedField.content"
      @save="saveFieldContent"
    />

    <!-- ... -->

    <!-- confirm delete field -->

    <Confirm
      v-model="deleteFieldConfirm"
      icon="eva-trash-2-outline"
      @no="cancelDeleteField"
      @yes="deleteField"
    >
      <template #title>Delete Field</template>

      <template #description>
        Upon deleting this field, the data associated with it will be deleted
        and cannot be retrieved. Do you still wish to proceed?
      </template>
    </Confirm>

    <!-- ... -->
  </div>
</template>

<script>
import { isEmpty } from "lodash-es";

import Draggable from "vuedraggable";

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
import Confirm from "@/components/common/popup/Confirm.vue";

import FieldActions from "./FieldActions.vue";
import FieldSettings from "./FieldSettings.vue";
import FieldContent from "./FieldContent.vue";

import form from "../../mixins/form.js";

export default {
  name: "Fields",

  components: {
    Draggable,
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
    FieldActions,
    FieldSettings,
    FieldContent,
    Confirm,
  },

  props: {
    value: {
      type: Array,
      required: true,
    },
  },

  mixins: [form],

  data() {
    return {
      draggingField: false,
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
      selectedField: {},
      fieldSettings: false,
      fieldContent: false,
      deleteFieldConfirm: false,
    };
  },

  computed: {
    actionTopPos() {
      if (isEmpty(this.selectedField)) return 0;

      const refIdx = this.$refs.field.findIndex(
        (field) => field.dataset.id === this.selectedField.id
      );

      return this.$refs.field[refIdx].offsetTop + "px";
    },
  },

  methods: {
    onInput(fields) {
      this.$emit("input", fields);
    },

    clearSelection() {
      this.selectedField = {};
    },

    selectField(field) {
      this.$emit("clear");
      this.selectedField = field;
    },

    confirmDeleteField() {
      this.deleteFieldConfirm = true;
    },

    cancelDeleteField() {
      this.deleteFieldConfirm = false;
    },

    deleteField() {
      this.deleteFieldConfirm = false;

      const fieldIdx = this.value.findIndex(
        (field) => field.id === this.selectedField.id
      );

      this.selectedField = {};
      this.$emit("delete", fieldIdx);
    },

    editFieldSettings() {
      this.fieldSettings = true;
    },

    saveFieldSettings(fieldSettings) {
      const fieldIdx = this.value.findIndex(
        (field) => field.id === this.selectedField.id
      );

      this.$emit("save-settings", fieldIdx, fieldSettings);
      this.clearSelection();
    },

    editFieldContent() {
      this.fieldContent = true;
    },

    saveFieldContent(fieldContent) {
      const fieldIdx = this.value.findIndex(
        (field) => field.id === this.selectedField.id
      );

      this.$emit("save-content", fieldIdx, fieldContent);
      this.clearSelection();
    },
  },
};
</script>

<style lang="scss" scoped>
.field {
  position: relative;
  padding: 8px;
  border: 1px solid transparent;
}

.active {
  border: 1px dashed $secondary;
  border-radius: 4px;
}

.subtitle {
  color: $gray-5;
  font-size: 12px;
  margin-top: 2px;
}

.actions {
  position: absolute;
  right: -48px;
}
</style>
