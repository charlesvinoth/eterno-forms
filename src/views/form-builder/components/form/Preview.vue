<template>
  <Sheet
    :value="value"
    width="720px"
    title="form preview"
    :has-footer="form.layout === 'CARD'"
    @input="closePreview"
  >
    <template #default>
      <div class="q-pa-md">
        <div v-for="panel in _panels" :key="panel.id" class="q-mb-lg">
          <!-- header -->

          <div v-if="panel.title" class="q-mb-lg">
            <div class="panel-title">{{ panel.title }}</div>
            <div v-if="panel.description" class="panel-description">
              {{ panel.description }}
            </div>
          </div>

          <!-- ... -->

          <!-- fields -->

          <div class="row q-col-gutter-md">
            <div
              v-for="field in panel.fields"
              :key="field.id"
              :class="getFieldSize(field.size)"
            >
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
              />

              <!-- ... -->

              <!-- long text -->

              <TextareaField
                v-if="field.type === 'LONG_TEXT'"
                v-model="LONG_TEXT"
                :label="field.label"
                :tooltip="field.tooltip"
                :is-mandatory="field.isMandatory"
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
              />

              <!-- ... -->

              <!-- date -->

              <DateField
                v-if="field.type === 'DATE'"
                v-model="DATE"
                :label="field.label"
                :tooltip="field.tooltip"
                :is-mandatory="field.isMandatory"
                :min-date="field.minDate"
                :max-date="field.maxDate"
              />

              <!-- ... -->

              <!-- time -->

              <TimeField
                v-if="field.type === 'TIME'"
                v-model="TIME"
                :label="field.label"
                :tooltip="field.tooltip"
                :is-mandatory="field.isMandatory"
                :min-time="field.minTime"
                :max-time="field.maxTime"
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
                emit-value-only
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
                emit-value-only
              />

              <!-- ... -->

              <!-- single choice -->

              <SingleChoiceField
                v-if="field.type === 'SINGLE_CHOICE'"
                v-model="SINGLECHOICE"
                :label="field.label"
                :tooltip="field.tooltip"
                :is-mandatory="field.isMandatory"
                :options="field.options"
                :options-per-line="field.optionsPerLine"
              />

              <!-- ... -->

              <!-- multiple choice -->

              <MultipleChoiceField
                v-if="field.type === 'MULTIPLE_CHOICE'"
                v-model="MULTIPLECHOICE"
                :label="field.label"
                :tooltip="field.tooltip"
                :is-mandatory="field.isMandatory"
                :options="field.options"
                :options-per-line="field.optionsPerLine"
              />

              <!-- ... -->

              <!-- fill in the blanks field -->

              <FillInTheBlanksField
                v-if="field.type === 'FILL_IN_THE_BLANKS'"
                v-model="FILL_IN_THE_BLANKS"
                :label="field.label"
                :tooltip="field.tooltip"
                :content="field.content"
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
              />

              <!-- ... -->

              <!-- image field -->

              <ImageField
                v-if="field.type === 'IMAGE'"
                v-model="IMAGE"
                :label="field.label"
                :tooltip="field.tooltip"
                :is-mandatory="field.isMandatory"
              />

              <!-- ... -->

              <!-- signature field -->

              <SignatureField
                v-if="field.type === 'SIGNATURE'"
                v-model="SIGNATURE"
                :label="field.label"
                :tooltip="field.tooltip"
                :is-mandatory="field.isMandatory"
              />

              <!-- ... -->
            </div>
          </div>

          <!-- ... -->
        </div>
      </div>
    </template>

    <template #footer>
      <BaseButton
        is-flat
        label="previous"
        class="q-mr-sm"
        :is-disabled="!hasPreviousPanel"
        @click="previousPanel"
      />

      <BaseButton
        label="next"
        :is-disabled="!hasNextPanel"
        @click="nextPanel"
      />
    </template>
  </Sheet>
</template>

<script>
import Sheet from "@/components/common/popup/Sheet.vue";

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
  name: "Preview",

  components: {
    Sheet,
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
    value: {
      type: Boolean,
      default: false,
    },

    form: {
      type: Object,
      required: true,
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
      SINGLECHOICE: "",
      MULTIPLECHOICE: [],
      FILL_IN_THE_BLANKS: {},
      GRID: [],
      MATRIX: [],
      IMAGE: "",
      SIGNATURE: "",
      activePanel: 0,
    };
  },

  computed: {
    _panels() {
      const panels = this.form.panels;

      if (this.form.layout === "CARD") {
        return this.form.panels.slice(this.activePanel, this.activePanel + 1);
      }

      return panels;
    },

    hasNextPanel() {
      return this.activePanel + 1 < this.form.panels.length;
    },

    hasPreviousPanel() {
      return this.activePanel - 1 >= 0;
    },
  },

  methods: {
    closePreview() {
      this.$emit("input", false);
    },

    nextPanel() {
      if (this.hasNextPanel) {
        this.activePanel++;
      }
    },

    previousPanel() {
      if (this.hasPreviousPanel) {
        this.activePanel--;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.panel-title {
  font-weight: bold;
  color: $gray-10;
  text-transform: capitalize;
}

.panel-description {
  font-size: 12px;
  color: $gray-5;
}
</style>
