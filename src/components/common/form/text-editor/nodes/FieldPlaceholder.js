import { Node, mergeAttributes } from "@tiptap/core";
import { VueNodeViewRenderer } from "@tiptap/vue-2";
import FieldPlaceholder from "../components/FieldPlaceholder.vue";

export default Node.create({
  name: "FieldPlaceholder",

  group: "inline",

  inline: true,

  selectable: false,

  atom: true,

  addAttributes() {
    return {
      type: {
        default: "TEXT",
        parseHTML: (element) => element.getAttribute("type"),
      },

      id: {
        default: "",
        parseHTML: (element) => element.getAttribute("id"),
      },
    };
  },

  parseHTML() {
    return [{ tag: "field-placeholder" }];
  },

  renderHTML({ HTMLAttributes }) {
    return ["field-placeholder", mergeAttributes(HTMLAttributes)];
  },

  addNodeView() {
    return VueNodeViewRenderer(FieldPlaceholder);
  },
});
