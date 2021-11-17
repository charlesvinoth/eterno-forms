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

    <!-- actions -->

    <div v-if="!isReadonly" class="actions">
      <q-btn
        round
        flat
        size="xs"
        icon="eva-plus"
        color="secondary"
        class="bg-secondary-1 q-mr-xs"
        @click="addRow"
      />

      <q-btn
        round
        flat
        size="xs"
        icon="eva-minus"
        color="red"
        class="bg-red-1"
        @click="removeRow"
      />
    </div>

    <!-- ... -->

    <!-- field -->

    <BaseScrollbar class="grid-field">
      <table>
        <thead>
          <tr>
            <th v-for="column in columns" :key="column.id">
              {{ column.name }}
            </th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(row, index) in model" :key="index">
            <td v-for="column in columns" :key="column.id">
              <InputField
                v-if="column.type === 'TEXT'"
                v-model="row[column.name]"
              />

              <InputField
                v-if="column.type === 'NUMBER'"
                v-model="row[column.name]"
                type="number"
              />

              <DateField
                v-if="column.type === 'DATE'"
                v-model="row[column.name]"
              />

              <TimeField
                v-if="column.type === 'TIME'"
                v-model="row[column.name]"
              />

              <SingleSelectField
                v-if="column.type === 'SINGLE_SELECT'"
                v-model="row[column.name]"
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
  name: "GridField",

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

      if (this.value.length) {
        this.value.forEach((_, rowIdx) => {
          const _row = {};

          this.columns.forEach((column) => {
            _row[column.name] = this.value[rowIdx][column.name] || "";
          });

          this.model.push(_row);
        });
      } else {
        this.addRow();
      }
    },

    addRow() {
      const row = {};

      this.columns.forEach((column) => {
        row[column.name] = "";
      });

      this.model.push(row);
    },

    removeRow() {
      if (this.model.length > 1) {
        this.model.pop();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.actions {
  display: flex;
  align-items: center;
  position: absolute;
  right: 0;
  top: -8px;
}

.grid-field {
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
      height: 48px;
      padding: 4px;
    }
  }
}
</style>
