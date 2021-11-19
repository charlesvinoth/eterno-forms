<template>
  <Sheet
    :value="value"
    title="field settings"
    width="420px"
    has-footer
    @input="onCancel"
  >
    <template #default>
      <div class="field-settings">
        <template v-if="field.type === 'TITLE'">
          <!-- title -->

          <InputField
            v-model="title"
            label="title"
            is-mandatory
            :error="titleError"
            class="field"
          />

          <!-- ... -->

          <!-- title size -->

          <SingleChoiceField
            v-model="titleSize"
            label="size"
            :options="sizes"
            :options-per-line="3"
            emit-value-only
            class="field"
          />

          <!-- ... -->

          <!-- title alignment -->

          <SingleChoiceField
            v-model="titleAlignment"
            label="alignment"
            :options="titleAlignments"
            :options-per-line="3"
            emit-value-only
            class="field"
          />

          <!-- ... -->

          <!-- title color -->

          <ColorField v-model="titleColor" label="color" class="field" />

          <!-- ... -->

          <!-- subtitle -->

          <InputField v-model="subTitle" label="subtitle" class="field" />

          <!-- ... -->
        </template>

        <!-- label -->

        <InputField
          v-if="showLabel"
          v-model="label"
          label="label"
          is-mandatory
          :error="labelError"
          class="field"
        />

        <!-- ... -->

        <!-- tooltip -->

        <TextareaField
          v-if="showTooltip"
          v-model="tooltip"
          label="tooltip"
          class="field"
        />

        <!-- ... -->

        <!-- field size -->

        <SingleChoiceField
          v-if="showSize"
          v-model="size"
          label="size"
          :options="sizes"
          :options-per-line="3"
          emit-value-only
          class="field"
        />

        <!-- ... -->

        <!-- is mandatory -->

        <SingleChoiceField
          v-if="showIsMandatory"
          v-model="isMandatory"
          label="is mandatory"
          :options="binaryOptions"
          :options-per-line="3"
          emit-value-only
          class="field"
        />

        <!-- ... -->

        <!-- min & max date -->

        <template v-if="field.type === 'DATE'">
          <!-- min date -->

          <DateField v-model="minDate" label="min date" class="field" />

          <!-- ... -->

          <!-- max date -->

          <DateField
            v-model="maxDate"
            label="max date"
            :error="maxDateError"
            class="field"
          />

          <!-- ... -->
        </template>

        <!-- ... -->

        <!-- min & max time -->

        <template v-if="field.type === 'TIME'">
          <!-- min time -->

          <TimeField v-model="minTime" label="min time" class="field" />

          <!-- ... -->

          <!-- max time -->

          <TimeField
            v-model="maxTime"
            label="max time"
            :error="maxTimeError"
            class="field"
          />

          <!-- ... -->
        </template>

        <!-- ... -->

        <!-- options -->

        <OptionsField
          v-if="showOptions"
          v-model="options"
          label="options"
          is-mandatory
          :error="optionsError"
          class="field"
        />
        <!-- ... -->

        <!-- options per line -->

        <SingleSelectField
          v-if="showOptionsPerLine"
          v-model="optionsPerLine"
          label="options per line"
          :options="optionsPerLines"
          hide-search
          emit-value-only
          class="field"
        />

        <!-- ... -->

        <!-- columns -->

        <VectorsField
          v-if="showColumns"
          v-model="columns"
          label="columns"
          vector-type="COLUMN"
          :error="columnsError"
          class="field"
        />

        <!-- ... -->

        <!-- rows -->

        <VectorsField
          v-if="showRows"
          v-model="rows"
          label="rows"
          vector-type="ROW"
          class="field"
        />

        <!-- ... -->

        <!-- matrix axis -->

        <SingleChoiceField
          v-if="showRows"
          v-model="matrixAxis"
          label="matrix axis"
          :options="matrixAxes"
          :options-per-line="3"
          tooltip="Same input type for Column or Row"
          emit-value-only
          class="field"
        />

        <!-- ... -->

        <!-- vector settings -->

        <VectorSettingsField
          v-if="showColumns"
          v-model="vectors"
          :label="vectorAxis"
          class="field"
        />

        <!-- ... -->

        <!-- divider style -->

        <SingleChoiceField
          v-if="field.type === 'DIVIDER'"
          v-model="dividerStyle"
          label="divider style"
          :options="dividerStyles"
          :options-per-line="3"
          emit-value-only
          class="field"
        />

        <!-- ... -->
      </div>
    </template>

    <template #footer>
      <BaseButton is-flat label="cancel" class="q-mr-sm" @click="onCancel" />
      <BaseButton label="save" @click="onSave" />
    </template>
  </Sheet>
</template>

<script>
import { cloneDeep, lowerCase } from "lodash-es";

import { requiredIf } from "vuelidate/lib/validators";

import Sheet from "@/components/common/popup/Sheet.vue";
import InputField from "@/components/common/form/InputField.vue";
import TextareaField from "@/components/common/form/TextareaField.vue";
import SingleChoiceField from "@/components/common/form/SingleChoiceField.vue";
import DateField from "@/components/common/form/DateField.vue";
import TimeField from "@/components/common/form/TimeField.vue";
import OptionsField from "@/components/common/form/OptionsField.vue";
import SingleSelectField from "@/components/common/form/SingleSelectField.vue";
import ColorField from "@/components/common/form/ColorField.vue";
import VectorsField from "@/components/common/form/VectorsField.vue";
import VectorSettingsField from "@/components/common/form/VectorSettingsField.vue";

export default {
  title: "FieldSettings",

  components: {
    Sheet,
    InputField,
    TextareaField,
    SingleChoiceField,
    DateField,
    TimeField,
    OptionsField,
    SingleSelectField,
    ColorField,
    VectorsField,
    VectorSettingsField,
  },

  props: {
    value: {
      type: Boolean,
      default: false,
    },

    field: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      title: "",
      titleSize: "",
      titleAlignment: "",
      titleAlignments: [
        {
          id: this.$nano.id(),
          label: "Left",
          value: "LEFT",
        },
        {
          id: this.$nano.id(),
          label: "Center",
          value: "CENTER",
        },
        {
          id: this.$nano.id(),
          label: "Right",
          value: "RIGHT",
        },
      ],
      titleColor: "",
      subTitle: "",
      label: "",
      tooltip: "",
      isMandatory: false,
      size: "MEDIUM",
      sizes: [
        {
          id: this.$nano.id(),
          label: "Small",
          value: "SMALL",
        },
        {
          id: this.$nano.id(),
          label: "Medium",
          value: "MEDIUM",
        },
        {
          id: this.$nano.id(),
          label: "Large",
          value: "LARGE",
        },
      ],
      binaryOptions: [
        {
          id: this.$nano.id(),
          label: "Yes",
          value: true,
        },
        {
          id: this.$nano.id(),
          label: "No",
          value: false,
        },
      ],
      minDate: "",
      maxDate: "",
      minTime: "",
      maxTime: "",
      options: [],
      optionsPerLines: [
        {
          id: this.$nano.id(),
          label: "1",
          value: 1,
        },
        {
          id: this.$nano.id(),
          label: "2",
          value: 2,
        },
        {
          id: this.$nano.id(),
          label: "3",
          value: 3,
        },
        {
          id: this.$nano.id(),
          label: "4",
          value: 4,
        },
        {
          id: this.$nano.id(),
          label: "6",
          value: 6,
        },
        {
          id: this.$nano.id(),
          label: "Auto",
          value: 0,
        },
      ],
      dividerStyle: "",
      dividerStyles: [
        {
          id: this.$nano.id(),
          label: "Solid",
          value: "SOLID",
        },
        {
          id: this.$nano.id(),
          label: "Dashed",
          value: "DASHED",
        },
        {
          id: this.$nano.id(),
          label: "Dotted",
          value: "DOTTED",
        },
      ],
      columns: [],
      rows: [],
      matrixAxis: "COLUMN",
      matrixAxes: [
        {
          id: this.$nano.id(),
          label: "Column",
          value: "COLUMN",
        },
        {
          id: this.$nano.id(),
          label: "Row",
          value: "ROW",
        },
      ],
    };
  },

  validations: {
    title: {
      required: requiredIf(function () {
        return this.field.type === "TITLE";
      }),
    },

    label: {
      required: requiredIf(function () {
        return this.doesFieldNeedLabel;
      }),
    },

    maxDate: {
      shouldBeGreater(value) {
        if (value && this.minDate) {
          return this.$day.isDateGreater(this.minDate, value);
        }

        return true;
      },
    },

    maxTime: {
      shouldBeGreater(value) {
        if (value && this.minTime) {
          return this.$day.isTimeGreater(this.minTime, value);
        }

        return true;
      },
    },

    options: {
      required: requiredIf(function () {
        return this.showOptions;
      }),
    },

    columns: {
      required: requiredIf(function () {
        return this.showColumns;
      }),

      shoulNotHaveEmptyColumns(value) {
        for (let i = 0; i < value.length; i++) {
          if (!value[i].name) return false;
        }

        return true;
      },
    },
  },

  computed: {
    showLabel() {
      return [
        "SHORT_TEXT",
        "LONG_TEXT",
        "NUMBER",
        "DATE",
        "TIME",
        "SINGLE_SELECT",
        "MULTI_SELECT",
        "SINGLE_CHOICE",
        "MULTIPLE_CHOICE",
        "FILL_IN_THE_BLANKS",
        "GRID",
        "MATRIX",
        "IMAGE",
        "SIGNATURE",
      ].includes(this.field.type);
    },

    showSize() {
      return [
        "SHORT_TEXT",
        "LONG_TEXT",
        "NUMBER",
        "DATE",
        "TIME",
        "SINGLE_SELECT",
        "MULTI_SELECT",
        "SINGLE_CHOICE",
        "MULTIPLE_CHOICE",
        "FILL_IN_THE_BLANKS",
        "GRID",
        "MATRIX",
        "IMAGE",
        "SIGNATURE",
      ].includes(this.field.type);
    },

    showTooltip() {
      return [
        "SHORT_TEXT",
        "LONG_TEXT",
        "NUMBER",
        "DATE",
        "TIME",
        "SINGLE_SELECT",
        "MULTI_SELECT",
        "SINGLE_CHOICE",
        "MULTIPLE_CHOICE",
        "FILL_IN_THE_BLANKS",
        "GRID",
        "MATRIX",
        "IMAGE",
        "SIGNATURE",
      ].includes(this.field.type);
    },

    showIsMandatory() {
      return [
        "SHORT_TEXT",
        "LONG_TEXT",
        "NUMBER",
        "DATE",
        "TIME",
        "SINGLE_SELECT",
        "MULTI_SELECT",
        "SINGLE_CHOICE",
        "MULTIPLE_CHOICE",
        "FILL_IN_THE_BLANKS",
        "IMAGE",
        "SIGNATURE",
      ].includes(this.field.type);
    },

    showOptions() {
      return [
        "SINGLE_SELECT",
        "MULTI_SELECT",
        "SINGLE_CHOICE",
        "MULTIPLE_CHOICE",
      ].includes(this.field.type);
    },

    showOptionsPerLine() {
      return ["SINGLE_CHOICE", "MULTIPLE_CHOICE"].includes(this.field.type);
    },

    showColumns() {
      return ["GRID", "MATRIX"].includes(this.field.type);
    },

    showRows() {
      return this.field.type === "MATRIX";
    },

    vectors: {
      get() {
        return this.matrixAxis === "COLUMN" ? this.columns : this.rows;
      },

      set(value) {
        if (this.matrixAxis === "COLUMN") this.columns = value;
        else this.rows = value;
      },
    },

    vectorAxis() {
      return lowerCase(this.matrixAxis) + " settings";
    },

    titleError() {
      if (this.$v.title.$error) {
        if (!this.$v.title.required) return "title is required";
      }

      return "";
    },

    labelError() {
      if (this.$v.label.$error) {
        if (!this.$v.label.required) return "label is required";
      }

      return "";
    },

    maxDateError() {
      if (this.$v.maxDate.$error) {
        if (!this.$v.maxDate.shouldBeGreater)
          return "max date should be greater than min date";
      }

      return "";
    },

    maxTimeError() {
      if (this.$v.maxTime.$error) {
        if (!this.$v.maxTime.shouldBeGreater)
          return "max time should be greater than min time";
      }

      return "";
    },

    optionsError() {
      if (this.$v.options.$error) {
        if (!this.$v.options.required) return "options is required";
      }

      return "";
    },

    columnsError() {
      if (this.$v.columns.$error) {
        if (!this.$v.columns.required) return "columns is required";
        if (!this.$v.columns.shoulNotHaveEmptyColumns)
          return "should not contain empty columns";
      }

      return "";
    },
  },

  watch: {
    value: {
      immediate: true,
      handler() {
        const clonedField = cloneDeep(this.field);

        this.title = clonedField.titleText;
        this.titleSize = clonedField.titleSize;
        this.titleAlignment = clonedField.titleAlignment;
        this.titleColor = clonedField.titleColor;
        this.subTitle = clonedField.subTitle;
        this.label = clonedField.label;
        this.tooltip = clonedField.tooltip;
        this.size = clonedField.size;
        this.isMandatory = clonedField.isMandatory;
        this.minDate = clonedField.minDate;
        this.maxDate = clonedField.maxDate;
        this.minTime = clonedField.minTime;
        this.maxTime = clonedField.maxTime;
        this.options = clonedField.options;
        this.optionsPerLine = clonedField.optionsPerLine;
        this.dividerStyle = clonedField.dividerStyle;
        this.columns = clonedField.columns;
        this.rows = clonedField.rows;
        this.matrixAxis = clonedField.matrixAxis;
      },
    },
  },

  methods: {
    onCancel() {
      this.$v.$reset();
      this.$emit("input", false);
    },

    onSave() {
      this.$v.$touch();

      if (!this.$v.$error) {
        this.$emit("save", {
          ...this.field,
          titleText: this.title,
          titleSize: this.titleSize,
          titleAlignment: this.titleAlignment,
          titleColor: this.titleColor,
          subTitle: this.subTitle,
          label: this.label,
          tooltip: this.tooltip,
          size: this.size,
          isMandatory: this.isMandatory,
          minDate: this.minDate,
          maxDate: this.maxDate,
          minTime: this.minTime,
          maxTime: this.maxTime,
          options: this.options,
          optionsPerLine: this.optionsPerLine,
          dividerStyle: this.dividerStyle,
          columns: this.columns,
          rows: this.rows,
          matrixAxis: this.matrixAxis,
        });

        this.onCancel();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.field-settings {
  display: flex;
  align-items: center;
  flex-direction: column;

  .field {
    width: 100%;
    padding: 16px;
  }

  .sizes {
    display: flex;
    align-items: center;

    .size {
      flex-grow: 1;
    }
  }
}
</style>
