<template>
  <div id="editor">
    <!-- toolbar -->

    <div id="toolbar">
      <!-- heading -->

      <Heading @toggle="toggleHeading" />

      <!-- ... -->

      <q-separator vertical inset color="gray-3" class="q-mx-sm" />

      <!-- text color -->

      <TextColor @set="setTextColor" />

      <!-- ... -->

      <!-- background color -->

      <BgColor @set="setBgColor" />

      <!-- ... -->

      <q-separator vertical inset color="gray-3" class="q-mx-sm" />

      <!-- bold -->

      <Bold @toggle="toggleBold" />

      <!-- ... -->

      <!-- italic -->

      <Italic @toggle="toggleItalic" />

      <!-- ... -->

      <!-- underline -->

      <UnderLine @toggle="toggleUnderline" />

      <!-- ... -->

      <q-separator vertical inset color="gray-2" class="q-mx-sm" />

      <!-- align -->

      <Align @set="setAlign" />

      <!-- ... -->

      <q-separator vertical inset color="gray-2" class="q-mx-sm" />

      <!-- unordered list -->

      <UnorderedList @toggle="toggleUnorderedList" />

      <!-- ... -->

      <!-- ordered list -->

      <OrderedList @toggle="toggleOrderedList" />

      <!-- ... -->

      <q-separator vertical inset color="gray-2" class="q-mx-sm" />

      <!-- link -->

      <HyperLink :href="href" @set="setLink" @unset="unsetLink" />

      <!-- ... -->

      <q-separator vertical inset color="gray-2" class="q-mx-sm" />

      <!-- history -->

      <History @undo="undo" @redo="redo" />

      <!-- ... -->

      <q-separator vertical inset color="gray-2" class="q-mx-sm" />

      <q-space />

      <!-- add field -->

      <AddField @add="addField" />

      <!-- ... -->
    </div>

    <!-- ... -->

    <!-- content -->

    <editor-content :editor="editor" />

    <!-- ... -->
  </div>
</template>

<script>
import { Editor, EditorContent } from "@tiptap/vue-2";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";

import Heading from "./components/Heading.vue";
import TextColor from "./components/TextColor.vue";
import BgColor from "./components/BgColor.vue";
import Bold from "./components/Bold.vue";
import Italic from "./components/Italic.vue";
import UnderLine from "./components/UnderLine.vue";
import Align from "./components/Align.vue";
import OrderedList from "./components/OrderedList.vue";
import UnorderedList from "./components/UnorderedList.vue";
import HyperLink from "./components/HyperLink.vue";
import History from "./components/History.vue";
import AddField from "./components/AddField.vue";

import FieldPlaceholder from "./nodes/FieldPlaceholder.js";

export default {
  name: "TextEditor",

  components: {
    Heading,
    TextColor,
    BgColor,
    Bold,
    Italic,
    UnderLine,
    Align,
    OrderedList,
    UnorderedList,
    HyperLink,
    History,
    AddField,
    EditorContent,
  },

  props: {
    value: {
      type: Object,
      default: () => ({ html: "", fields: [] }),
    },
  },

  data() {
    return {
      editor: null,
      fields: [],
    };
  },

  mounted() {
    this.editor = new Editor({
      content: "",
      extensions: [
        StarterKit,
        Underline,
        TextStyle,
        Link,
        FieldPlaceholder,
        TextAlign.configure({
          types: ["heading", "paragraph"],
        }),
        Color.configure({
          types: ["textStyle"],
        }),
        Highlight.configure({
          multicolor: true,
        }),
      ],
      onUpdate: () => {
        this.emitValue();
      },
    });

    this.editor.commands.setContent(this.value.html || "Start typing ...");
    this.fields = this.value.fields;
  },

  beforeUnmount() {
    this.editor.destroy();
  },

  computed: {
    href() {
      return this.editor ? this.editor.getAttributes("link").href : "";
    },
  },

  methods: {
    toggleHeading(level) {
      if (level === 7) {
        return this.editor.chain().focus().clearNodes().run();
      }

      this.editor.chain().focus().toggleHeading({ level }).run();
    },

    toggleBold() {
      this.editor.chain().focus().toggleBold().run();
    },

    toggleItalic() {
      this.editor.chain().focus().toggleItalic().run();
    },

    toggleUnderline() {
      this.editor.chain().focus().toggleUnderline().run();
    },

    setTextColor(color) {
      this.editor.chain().focus().setColor(color).run();
    },

    setBgColor(color) {
      this.editor.chain().focus().setHighlight({ color }).run();
    },

    setAlign(position) {
      this.editor.chain().focus().setTextAlign(position).run();
    },

    toggleUnorderedList() {
      this.editor.chain().focus().toggleBulletList().run();
    },

    toggleOrderedList() {
      this.editor.chain().focus().toggleOrderedList().run();
    },

    setLink(link) {
      this.editor
        .chain()
        .focus()
        .toggleLink({ href: link, target: "_blank" })
        .run();
    },

    unsetLink() {
      this.editor.chain().focus().unsetLink().run();
    },

    undo() {
      this.editor.chain().focus().undo().run();
    },

    redo() {
      this.editor.chain().focus().redo().run();
    },

    addField(fieldType) {
      const id = this.$nano.id();

      this.fields.push({
        id,
        type: fieldType,
        isMandatory: false,
        minDate: "",
        maxDate: "",
        minTime: "",
        maxTime: "",
        options: [],
      });

      this.editor.commands.insertContent(
        `<field-placeholder id="${id}" type="${fieldType}"></field-placeholder>`
      );
    },

    removeDeletedFields() {
      const html = this.editor.getHTML();

      this.fields.forEach((field, index) => {
        const isExists = html.includes(field.id);
        if (!isExists) this.fields.splice(index, 1);
      });
    },

    emitValue() {
      this.removeDeletedFields();
      this.$emit("input", { html: this.editor.getHTML(), fields: this.fields });
    },
  },
};
</script>

<style lang="scss" scoped>
#editor {
  border: 1px solid $gray-3;
  border-radius: 4px;

  #toolbar {
    border-bottom: 1px solid $gray-3;
    padding: 4px;
    display: flex;
    align-items: center;
  }

  #content {
    padding: 16px;
  }
}
</style>
