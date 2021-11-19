<template>
  <BaseScrollbar height="calc(100vh - 57px)" width="320px" class="form-fields">
    <!-- title -->

    <div class="title">Form Fields</div>

    <!-- ... -->

    <div class="q-px-md">
      <!-- tabs -->

      <Tabs
        v-model="tab"
        :tabs="tabs"
        equal-tab-size
        color="secondary"
        class="q-mb-md"
      />

      <!-- ... -->

      <!-- fields -->

      <Field
        v-for="field in _fields"
        :key="field.id"
        :field="field"
        @dragstart="(e) => onFieldDragStart(e, field.type)"
      />

      <!-- ... -->
    </div>
  </BaseScrollbar>
</template>

<script>
import Tabs from "@/components/common/tab/Tabs.vue";

import Field from "./Field.vue";

export default {
  name: "Fields",

  components: { Tabs, Field },

  data() {
    return {
      tab: "basic",
      tabs: [
        {
          id: this.$nano.id(),
          label: "basic fields",
          value: "basic",
        },
        {
          id: this.$nano.id(),
          label: "advanced fields",
          value: "advanced",
        },
      ],
      fields: [
        {
          id: this.$nano.id(),
          name: "title",
          type: "TITLE",
          icon: "mdi-format-text",
          group: "basic",
        },
        {
          id: this.$nano.id(),
          name: "short text",
          type: "SHORT_TEXT",
          icon: "mdi-form-textbox",
          group: "basic",
        },
        {
          id: this.$nano.id(),
          name: "long text",
          type: "LONG_TEXT",
          icon: "mdi-form-textarea",
          group: "basic",
        },
        {
          id: this.$nano.id(),
          name: "number",
          type: "NUMBER",
          icon: "mdi-numeric",
          group: "basic",
        },
        {
          id: this.$nano.id(),
          name: "date",
          type: "DATE",
          icon: "eva-calendar-outline",
          group: "basic",
        },
        {
          id: this.$nano.id(),
          name: "time",
          type: "TIME",
          icon: "eva-clock-outline",
          group: "basic",
        },
        {
          id: this.$nano.id(),
          name: "single select",
          type: "SINGLE_SELECT",
          icon: "mdi-form-dropdown",
          group: "basic",
        },
        {
          id: this.$nano.id(),
          name: "multi select",
          type: "MULTI_SELECT",
          icon: "mdi-form-select",
          group: "basic",
        },
        {
          id: this.$nano.id(),
          name: "single choice",
          type: "SINGLE_CHOICE",
          icon: "eva-radio-button-on",
          group: "basic",
        },
        {
          id: this.$nano.id(),
          name: "multiple choice",
          type: "MULTIPLE_CHOICE",
          icon: "eva-checkmark-square-2-outline",
          group: "basic",
        },
        {
          id: this.$nano.id(),
          name: "fill in the blanks",
          type: "FILL_IN_THE_BLANKS",
          icon: "mdi-format-letter-matches",
          group: "advanced",
        },
        {
          id: this.$nano.id(),
          name: "matrix",
          type: "MATRIX",
          icon: "mdi-table",
          group: "advanced",
        },
        {
          id: this.$nano.id(),
          name: "grid",
          type: "GRID",
          icon: "mdi-grid",
          group: "advanced",
        },
        {
          id: this.$nano.id(),
          name: "image",
          type: "IMAGE",
          icon: "eva-image-outline",
          group: "advanced",
        },
        {
          id: this.$nano.id(),
          name: "image upload",
          type: "IMAGE_UPLOAD",
          icon: "mdi-file-image",
          group: "basic",
        },
        {
          id: this.$nano.id(),
          name: "file upload",
          type: "file_UPLOAD",
          icon: "mdi-file-document-outline",
          group: "basic",
        },
        {
          id: this.$nano.id(),
          name: "signature",
          type: "SIGNATURE",
          icon: "mdi-signature-freehand",
          group: "advanced",
        },
        {
          id: this.$nano.id(),
          name: "divider",
          type: "DIVIDER",
          icon: "mdi-format-vertical-align-center",
          group: "basic",
        },
      ],
    };
  },

  computed: {
    _fields() {
      return this.fields.filter((field) => field.group === this.tab);
    },
  },

  methods: {
    onFieldDragStart(e, fieldName) {
      e.dataTransfer.setData("field", fieldName);
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
  height: 56px;
  display: flex;
  align-items: center;
  color: $gray-10;
  font-size: 13px;
  font-weight: bold;
  padding: 0px 16px;
}

.form-fields {
  background-color: white;
  border-right: 1px solid $gray-2;
}
</style>
