<template>
  <div class="relative-position">
    <!-- fields -->

    <Draggable :value="value" group="fields" @input="onInput">
      <Field
        v-for="field in value"
        :key="field.id"
        :field="field"
        ref="field"
        :data-id="field.id"
        inner-class="row q-col-gutter-xs"
        :class="[
          getFieldSize(field.size),
          { active: selectedField.id === field.id },
        ]"
        @click.stop="selectField(field)"
      />
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

    <!-- delete field -->

    <DeleteField v-model="showDeleteField" @yes="deleteField" />

    <!-- ... -->
  </div>
</template>

<script>
import { isEmpty } from "lodash-es";

import Draggable from "@/components/common/Draggable.vue";

import Field from "./Field.vue";
import DeleteField from "./DeleteField.vue";

import FieldActions from "./FieldActions.vue";
import FieldSettings from "./FieldSettings.vue";
import FieldContent from "./FieldContent.vue";

import form from "../../mixins/form.js";

export default {
  name: "Fields",

  components: {
    Draggable,
    FieldActions,
    FieldSettings,
    FieldContent,
    Field,
    DeleteField,
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
      selectedField: {},
      fieldSettings: false,
      fieldContent: false,
      showDeleteField: false,
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
      this.showDeleteField = true;
    },

    deleteField() {
      this.showDeleteField = false;

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
