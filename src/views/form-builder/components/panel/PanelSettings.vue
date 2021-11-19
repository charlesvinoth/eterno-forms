<template>
  <Sheet :value="value" title="panel settings" has-footer @input="close">
    <template #default>
      <div class="panel-settings">
        <!-- title -->

        <div class="setting">
          <InputField v-model="panelTitle" label="title" />
        </div>

        <!-- ... -->

        <!-- description -->

        <div class="setting">
          <TextareaField v-model="panelDescription" label="description" />
        </div>

        <!-- ... -->
      </div>
    </template>

    <template #footer>
      <BaseButton is-flat label="cancel" class="q-mr-sm" @click="close" />
      <BaseButton label="save" @click="save" />
    </template>
  </Sheet>
</template>

<script>
import Sheet from "@/components/common/popup/Sheet.vue";
import InputField from "@/components/common/form/InputField.vue";
import TextareaField from "@/components/common/form/TextareaField.vue";

export default {
  title: "PanelSettings",

  components: { Sheet, InputField, TextareaField },

  props: {
    value: {
      type: Boolean,
      default: false,
    },

    panel: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      panelTitle: "",
      panelDescription: "",
    };
  },

  watch: {
    value: {
      immediate: true,
      handler() {
        this.panelTitle = this.panel.title;
        this.panelDescription = this.panel.description;
      },
    },
  },

  methods: {
    close() {
      this.$emit("input", false);
    },

    save() {
      this.$emit("save", {
        title: this.panelTitle,
        description: this.panelDescription,
      });

      this.close();
    },
  },
};
</script>

<style lang="scss" scoped>
.panel-settings {
  padding: 16px;
  display: flex;
  align-items: center;
  flex-direction: column;

  .setting {
    width: 100%;
    margin-bottom: 24px;
  }
}
</style>
