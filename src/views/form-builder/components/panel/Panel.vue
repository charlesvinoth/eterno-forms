<template>
  <div v-on="$listeners" class="panel">
    <!-- drag indicator -->

    <div class="drag-icon">
      <q-icon name="drag_indicator" size="20px" color="gray-4" />
    </div>

    <!-- ... -->

    <!-- header -->

    <div class="q-mb-md q-px-sm">
      <div v-if="panel.title" class="title">{{ panel.title }}</div>
      <div v-if="panel.description" class="description">
        {{ panel.description }}
      </div>
    </div>

    <!-- ... -->

    <!-- fields -->

    <!-- <Fields
      v-model="panel.fields"
      ref="fields"
      @clear="clearSelection"
      @save-content="
        (fieldIdx, fieldContent) =>
          saveFieldContent(index, fieldIdx, fieldContent)
      "
      @save-settings="
        (fieldIdx, fieldSettings) =>
          saveFieldSettings(index, fieldIdx, fieldSettings)
      "
      @delete="(fieldIdx) => deleteField(index, fieldIdx)"
    /> -->

    <!-- ... -->
  </div>
</template>

<script>
// import Fields from "../field/Fields.vue";

export default {
  name: "Panel",

  // components: { Fields },

  props: {
    panel: {
      type: Object,
      required: true,
    },
  },

  methods: {
    deselectFields() {
      // this.$refs.fields.forEach((field) => field.clearSelection());
    },
  },
};
</script>

<style lang="scss" scoped>
.panel {
  padding: 16px 12px;
  background-color: white;
  border-radius: 4px;
  margin-bottom: 24px;
  cursor: pointer;
  border: 1px solid $gray-2;
  box-shadow: 0 1px 2px 0 rgba(15, 23, 42, 0.05) !important;
  position: relative;

  .drag-icon {
    position: absolute;
    top: 16px;
    left: -32px;
  }

  .title {
    font-weight: bold;
    color: $gray-10;
    text-transform: capitalize;
  }

  .description {
    font-size: 12px;
    color: $gray-5;
  }

  &.selected,
  &.active {
    border: 1px dashed $primary;
  }
}
</style>
