<template>
  <div
    v-on="$listeners"
    class="panel"
    :class="{
      selected: selectedPanel === panel.id,
      active: activePanel === panel.id,
    }"
  >
    <!-- drag indicator -->

    <div class="drag-indicator">
      <q-btn round flat size="sm" icon="drag_indicator" color="gray-5" />
    </div>

    <!-- ... -->

    <!-- fields -->

    <!-- <Fields
      v-model="panel.fields"
      ref="fields"
      
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

    <Fields v-model="panel.fields" ref="fields" @clear="$emit('clear')" />

    <!-- ... -->

    <!-- empty state -->

    <div v-if="!panel.fields.length" class="empty-state">
      Drag fields from the left panel and drop here to add them
    </div>

    <!-- ... -->

    <!-- actions -->

    <div v-if="selectedPanel === panel.id" class="actions">
      <q-btn
        v-tooltip:secondary.right="'delete panel'"
        round
        size="sm"
        icon="eva-trash-2-outline"
        color="secondary"
        @click.stop="$emit('delete')"
      />
    </div>

    <!-- ... -->
  </div>
</template>

<script>
import Fields from "../field/Fields.vue";

export default {
  name: "Panel",

  components: { Fields },

  props: {
    panel: {
      type: Object,
      required: true,
    },

    selectedPanel: {
      type: String,
      default: "",
    },

    activePanel: {
      type: String,
      default: "",
    },
  },

  methods: {
    deSelectField() {
      this.$refs.fields.deSelectField();
    },
  },
};
</script>

<style lang="scss" scoped>
.panel {
  padding: 16px;
  background-color: white;
  border-radius: 4px;
  margin-bottom: 24px;
  cursor: pointer;
  border: 1px solid $gray-2;
  box-shadow: 0 1px 2px 0 rgba(15, 23, 42, 0.05) !important;
  position: relative;

  .drag-indicator {
    position: absolute;
    top: 0;
    left: -36px;
  }

  .empty-state {
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: $gray-5;
    font-size: 12px;
  }

  .actions {
    position: absolute;
    top: 0;
    right: -36px;
    display: flex;
    flex-direction: column;
  }

  &.selected,
  &.active {
    border: 1px dashed $secondary;
  }
}
</style>
