<template>
  <Sheet :value="value" title="form settings" has-footer @input="close">
    <template #default>
      <div class="form-settings">
        <!-- name -->

        <div class="setting">
          <InputField
            v-model="formName"
            label="name"
            is-mandatory
            :error="formNameError"
          />
        </div>

        <!-- ... -->

        <!-- description -->

        <div class="setting">
          <TextareaField v-model="formDescription" label="description" />
        </div>

        <!-- ... -->

        <!-- layout -->

        <div class="setting">
          <ChooseField v-model="formLayout" label="layout" :options="layouts" />
        </div>

        <!-- ... -->
      </div>
    </template>

    <template #footer>
      <BaseButton is-flat label="cancel" class="q-mr-sm" @click="onCancel" />
      <BaseButton label="save" @click="onSave" />
    </template>
  </Sheet>
</template>

<script>
import { required } from "vuelidate/lib/validators";

import Sheet from "@/components/common/popup/Sheet.vue";
import InputField from "@/components/common/form/InputField.vue";
import TextareaField from "@/components/common/form/TextareaField.vue";
import ChooseField from "@/components/common/form/ChooseField.vue";

export default {
  name: "Settings",

  components: { Sheet, InputField, TextareaField, ChooseField },

  props: {
    value: {
      type: Boolean,
      default: false,
    },

    form: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      formName: "",
      formDescription: "",
      formLayout: "",
      layouts: [
        {
          id: this.$nano.id(),
          icon: "mdi-text-box-outline",
          color: "gray",
          value: "CLASSIC",
          title: "classic",
          description: "Show all panels on one page",
        },
        {
          id: this.$nano.id(),
          icon: "mdi-text-box-multiple-outline",
          color: "gray",
          value: "CARD",
          title: "card",
          description: "Show one panel per page",
        },
      ],
    };
  },

  validations: {
    formName: { required },
  },

  computed: {
    formNameError() {
      if (this.$v.formName.$error) {
        if (!this.$v.formName.required) return "name is required";
      }

      return "";
    },
  },

  watch: {
    value: {
      immediate: true,
      handler() {
        this.formName = this.form.name;
        this.formDescription = this.form.description;
        this.formLayout = this.form.layout;
      },
    },
  },

  methods: {
    close() {
      this.$emit("input", false);
    },

    onCancel() {
      this.$v.$reset();
      this.close();
    },

    onSave() {
      this.$v.$touch();

      if (!this.$v.$error) {
        this.$emit("save", {
          name: this.formName,
          description: this.formDescription,
          layout: this.formLayout,
        });

        this.close();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.form-settings {
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
