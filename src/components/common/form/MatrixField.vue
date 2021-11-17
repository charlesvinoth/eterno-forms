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

    <BaseScrollbar class="matrix-field">
      <table>
        <thead>
          <tr>
            <th></th>

            <th v-for="column in columns" :key="column.id">
              {{ column.name }}
            </th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(row, index) in rows" :key="row.id">
            <th>{{ row.name }}</th>

            <td v-for="column in columns" :key="column.id">
              <InputField
                v-if="vectorType(row, column) === 'TEXT'"
                v-model="model[index][column.name]"
              />

              <InputField
                v-if="vectorType(row, column) === 'NUMBER'"
                v-model="model[index][column.name]"
                type="number"
              />

              <DateField
                v-if="vectorType(row, column) === 'DATE'"
                v-model="model[index][column.name]"
              />

              <TimeField
                v-if="vectorType(row, column) === 'TIME'"
                v-model="model[index][column.name]"
              />

              <SingleSelectField
                v-if="vectorType(row, column) === 'SINGLE_SELECT'"
                v-model="model[index][column.name]"
                :options="[]"
                emit-value-only
              />
            </td>
          </tr>
        </tbody>
      </table>
    </BaseScrollbar>

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
import DateField from "./DateField.vue";
import TimeField from "./TimeField.vue";
import SingleSelectField from "./SingleSelectField.vue";

export default {
  name: "MatrixField",

  components: {
    FormFieldLabel,
    FormFieldError,
    InputField,
    DateField,
    TimeField,
    SingleSelectField,
  },

  props: {
    value: {
      type: Array,
      required: true,
    },

    columns: {
      type: Array,
      required: true,
    },

    rows: {
      type: Array,
      required: true,
    },

    axis: {
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
      model: [],
    };
  },

  watch: {
    columns: {
      deep: true,
      handler: "createModel",
    },

    rows: {
      deep: true,
      handler: "createModel",
    },

    model: {
      deep: true,
      handler() {
        this.$emit("input", this.model);
      },
    },
  },

  created() {
    this.createModel();
  },

  methods: {
    createModel() {
      this.model = [];

      this.rows.forEach((_, rowIdx) => {
        const _row = {};

        this.columns.forEach((column) => {
          if (this.value[rowIdx]) {
            _row[column.name] = this.value[rowIdx][column.name] || "";
          } else {
            _row[column.name] = "";
          }
        });

        this.model.push(_row);
      });
    },

    vectorType(row, column) {
      if (this.axis === "COLUMN") return column.type;
      if (this.axis === "ROW") return row.type;
    },
  },
};
</script>

<style lang="scss" scoped>
.matrix-field {
  border: 1px solid $gray-3;
  border-radius: 4px;
  padding-bottom: 8px;

  table {
    width: 100%;
    table-layout: fixed;
    border-collapse: collapse;

    tr {
      border-bottom: 1px solid $gray-2;
    }

    th,
    td {
      width: 200px;
      height: 48px;
      border-right: 1px solid $gray-2;
    }

    th:last-child,
    td:last-child {
      border-right: none;
    }

    th {
      text-align: left;
      color: $gray-8;
      font-size: 13px;
      font-weight: 500;
      text-transform: capitalize;
      padding: 8px;
    }

    td {
      padding: 4px;
    }
  }
}
</style>
