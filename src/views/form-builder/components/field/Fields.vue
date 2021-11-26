<template>
  <div class="relative-position">
    <!-- fields -->

    <Draggable
      :value="value"
      group="fields"
      inner-class="row q-col-gutter-xs"
      @input="onInput"
    >
      <Field
        v-for="field in value"
        :key="field.id"
        :field="field"
        :selected-field="selectedField.id"
        @click.stop="selectField(field)"
        @edit="showSettings = true"
        @delete="showDeleteField = true"
      />
    </Draggable>

    <!-- ... -->

    <!-- settings -->

    <Settings
      v-model="showSettings"
      :selected-field="selectedField"
      @save="saveSettings"
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

    <DeleteField v-model="showDeleteField" @delete="deleteField" />

    <!-- ... -->
  </div>
</template>

<script>
import Draggable from "@/components/common/Draggable.vue";

import Field from "./Field.vue";
import Settings from "./Settings.vue";
import DeleteField from "./DeleteField.vue";

import FieldContent from "./FieldContent.vue";

export default {
  name: "Fields",

  components: {
    Draggable,
    Settings,
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

  data() {
    return {
      selectedField: {},
      showSettings: false,
      fieldContent: false,
      showDeleteField: false,
    };
  },

  methods: {
    onInput(fields) {
      this.$emit("input", fields);
    },

    deSelectField() {
      this.selectedField = {};
    },

    selectField(field) {
      this.$emit("clear");
      this.selectedField = field;
    },

    deleteField() {
      const fieldIdx = this.value.findIndex(
        (field) => field.id === this.selectedField.id
      );

      this.selectedField = {};
      this.value.splice(fieldIdx, 1);
    },

    saveSettings(settings) {
      const fieldIdx = this.value.findIndex(
        (field) => field.id === this.selectedField.id
      );

      this.value[fieldIdx] = settings;
      this.deSelectField();
    },

    editFieldContent() {
      this.fieldContent = true;
    },

    saveFieldContent(fieldContent) {
      const fieldIdx = this.value.findIndex(
        (field) => field.id === this.selectedField.id
      );

      this.$emit("save-content", fieldIdx, fieldContent);
      this.deSelectField();
    },
  },
};
</script>

<style lang="scss" scoped></style>
