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
            v-model="field.title"
            label="title"
            is-mandatory
            :error="titleError"
            class="field"
          />

          <!-- ... -->

          <!-- title size -->

          <SingleChoiceField
            v-model="field.titleSize"
            label="size"
            :options="sizes"
            :options-per-line="3"
            emit-value-only
            class="field"
          />

          <!-- ... -->

          <!-- title alignment -->

          <SingleChoiceField
            v-model="field.titleAlignment"
            label="alignment"
            :options="titleAlignments"
            :options-per-line="3"
            emit-value-only
            class="field"
          />

          <!-- ... -->

          <!-- title color -->

          <ColorField v-model="field.titleColor" label="color" class="field" />

          <!-- ... -->

          <!-- subtitle -->

          <InputField v-model="field.subTitle" label="subtitle" class="field" />

          <!-- ... -->
        </template>

        <!-- label -->

        <InputField
          v-if="showLabel"
          v-model="field.label"
          label="label"
          is-mandatory
          :error="labelError"
          class="field"
        />

        <!-- ... -->

        <!-- tooltip -->

        <InputField
          v-if="showTooltip"
          v-model="field.tooltip"
          label="tooltip"
          class="field"
        />

        <!-- ... -->

        <!-- field size -->

        <SingleChoiceField
          v-if="showSize"
          v-model="field.size"
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
          v-model="field.isMandatory"
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

          <DateField v-model="field.minDate" label="min date" class="field" />

          <!-- ... -->

          <!-- max date -->

          <DateField
            v-model="field.maxDate"
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

          <TimeField v-model="field.minTime" label="min time" class="field" />

          <!-- ... -->

          <!-- max time -->

          <TimeField
            v-model="field.maxTime"
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
          v-model="field.options"
          label="options"
          is-mandatory
          :error="optionsError"
          class="field"
        />
        <!-- ... -->

        <!-- options per line -->

        <SingleSelectField
          v-if="showOptionsPerLine"
          v-model="field.optionsPerLine"
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
          v-model="field.columns"
          label="columns"
          vector-type="COLUMN"
          :error="columnsError"
          class="field"
        />

        <!-- ... -->

        <!-- rows -->

        <VectorsField
          v-if="showRows"
          v-model="field.rows"
          label="rows"
          vector-type="ROW"
          class="field"
        />

        <!-- ... -->

        <!-- matrix axis -->

        <SingleChoiceField
          v-if="showRows"
          v-model="field.matrixAxis"
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
          v-model="field.vectors"
          :label="vectorAxis"
          class="field"
        />

        <!-- ... -->

        <!-- divider style -->

        <SingleChoiceField
          v-if="field.type === 'DIVIDER'"
          v-model="field.dividerStyle"
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
import SingleChoiceField from "@/components/common/form/SingleChoiceField.vue";
import DateField from "@/components/common/form/DateField.vue";
import TimeField from "@/components/common/form/TimeField.vue";
import OptionsField from "@/components/common/form/OptionsField.vue";
import SingleSelectField from "@/components/common/form/SingleSelectField.vue";
import ColorField from "@/components/common/form/ColorField.vue";
import VectorsField from "@/components/common/form/VectorsField.vue";
import VectorSettingsField from "@/components/common/form/VectorSettingsField.vue";

export default {
  title: "Settings",

  components: {
    Sheet,
    InputField,
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

    selectedField: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      field: {},
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
        if (value) {
          for (let i = 0; i < value.length; i++) {
            if (!value[i].name) return false;
          }
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
    selectedField: {
      immediate: true,
      handler() {
        this.field = cloneDeep(this.selectedField);
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
        this.$emit("save", this.field);
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
