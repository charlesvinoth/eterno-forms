<template>
  <Modal
    :value="value"
    title="Editor"
    width="794px"
    has-footer
    @input="onCancel"
  >
    <template #default>
      <div class="q-pa-md">
        <!-- editor -->

        <TextEditor v-model="editorContent" />

        <!-- ... -->
      </div>
    </template>

    <template #footer>
      <BaseButton
        is-flat
        label="cancel"
        class="q-mr-sm"
        @click="showEditor = false"
      />

      <BaseButton label="save" @click="onSave" />
    </template>
  </Modal>
</template>

<script>
import Modal from "@/components/common/popup/Modal.vue";
import TextEditor from "@/components/common/form/text-editor/TextEditor.vue";

export default {
  name: "FieldContent",

  components: { Modal, TextEditor },

  props: {
    value: {
      type: Boolean,
      default: true,
    },

    content: {
      type: Object,
      default: () => ({ html: "", fields: [] }),
    },
  },

  data() {
    return {
      editorContent: {},
    };
  },

  watch: {
    value: {
      immediate: true,
      handler() {
        this.editorContent = this.content;
      },
    },
  },

  methods: {
    onCancel() {
      this.$emit("input", false);
    },

    onSave() {
      this.$emit("input", false);
      this.$emit("save", this.editorContent);
    },
  },
};
</script>

<style lang="scss" scoped></style>
