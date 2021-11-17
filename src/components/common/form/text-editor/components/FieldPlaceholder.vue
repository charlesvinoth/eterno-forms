<template>
  <node-view-wrapper class="node-view-wrapper">
    <div class="label">{{ label }}</div>

    <q-space />

    <q-icon
      name="eva-close"
      size="20px"
      color="gray-4"
      class="cursor-pointer"
      @click="deleteField"
    />
  </node-view-wrapper>
</template>

<script>
import { capitalize } from "lodash-es";
import { NodeViewWrapper, nodeViewProps } from "@tiptap/vue-2";

export default {
  name: "FieldPlaceholder",

  components: { NodeViewWrapper },

  props: nodeViewProps, //editor, node, getPos, HTMLAttributes, decorations, extension, updateAttributes, deleteNode

  computed: {
    label() {
      return capitalize(this.node.attrs.type);
    },
  },

  methods: {
    deleteField() {
      this.deleteNode();
    },
  },
};
</script>

<style lang="scss">
.node-view-wrapper {
  display: inline-flex;
  align-items: center;
  height: 36px;
  width: 180px;
  border: 1px solid $gray-3;
  border-radius: 4px;
  margin: 4px;
  padding: 4px;

  .label {
    color: $gray-6;
    font-size: 13px;
  }
}
</style>
