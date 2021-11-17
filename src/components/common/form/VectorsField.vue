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

    <!-- add vector -->

    <q-icon
      v-tooltip:secondary.top="addVectorTooltip"
      name="eva-plus"
      size="20px"
      color="secondary"
      class="add-vector-btn"
      @click="addVector"
    />

    <!-- ... -->

    <!-- field -->

    <div
      class="q-pt-sm rounded"
      :class="{
        'field-has-error': hasError,
      }"
    >
      <Draggable
        :value="vectors"
        group="vectors"
        v-bind="{ animation: 200 }"
        @start="draggingVector = true"
        @end="draggingVector = false"
        @input="onInput"
      >
        <transition-group
          type="transition"
          :name="draggingVector ? null : 'flip-list'"
          class="row q-col-gutter-xs"
        >
          <div
            v-for="(vector, index) in vectors"
            :key="vector.id"
            class="vector-field"
          >
            <!-- drag indicator -->

            <q-icon
              name="drag_indicator"
              size="20px"
              color="gray-4"
              class="q-mr-sm"
            />

            <!-- ... -->

            <!-- vector name -->

            <div class="wrapper">
              <InputField v-model="vector.name" />
            </div>

            <!-- ... -->

            <div class="q-px-xs"></div>

            <!-- remove vector -->

            <q-icon
              v-tooltip:red.top="'remove vector'"
              name="eva-close"
              size="20px"
              color="red"
              class="cursor-pointer"
              @click="removeVector(index)"
            />

            <!-- ... -->
          </div>
        </transition-group>
      </Draggable>
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
import { cloneDeep } from "lodash-es";

import Draggable from "vuedraggable";

import FormFieldLabel from "./FormFieldLabel.vue";
import FormFieldError from "./FormFieldError.vue";
import InputField from "./InputField.vue";

export default {
  name: "VectorsField",

  components: {
    FormFieldLabel,
    FormFieldError,
    Draggable,
    InputField,
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

    vectorType: {
      type: String,
      required: true,
      validator(value) {
        return ["COLUMN", "ROW"].includes(value);
      },
    },
  },

  data() {
    return {
      draggingVector: false,
      fieldTypes: [
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
      vectors: [],
    };
  },

  computed: {
    hasError() {
      return Boolean(this.error);
    },

    addVectorTooltip() {
      return `add ${this.vectorType}`;
    },
  },

  watch: {
    vectors: {
      deep: true,
      handler() {
        this.$emit("input", this.vectors);
      },
    },
  },

  created() {
    this.vectors = cloneDeep(this.value);
  },

  methods: {
    onInput(vectors) {
      this.vectors = vectors;
    },

    addVector() {
      this.vectors.push({
        id: this.$nano.id(),
        name: "",
        type: "TEXT",
        options: [],
      });
    },

    removeVector(vectorIdx) {
      this.vectors.splice(vectorIdx, 1);
    },
  },
};
</script>

<style lang="scss" scoped>
.add-vector-btn {
  position: absolute;
  right: 16px;
  top: 12px;
  cursor: pointer;
}

.vector-field {
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 8px;

  .wrapper {
    flex: 1;
  }
}
</style>
