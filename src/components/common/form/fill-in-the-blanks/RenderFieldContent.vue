<script>
import InputField from "@/components/common/form/InputField.vue";
import DateField from "@/components/common/form/DateField.vue";
import TimeField from "@/components/common/form/TimeField.vue";
import SingleSelectField from "@/components/common/form/SingleSelectField.vue";

export default {
  name: "RenderFieldContent",

  props: {
    html: {
      type: String,
      required: true,
    },

    fieldsModel: {
      type: Object,
      required: true,
    },
  },

  render(createElement) {
    const fieldsModel = { ...this.fieldsModel };

    const component = {
      name: "Content",

      template: `<div>${this.html}</div>`,

      components: {
        InputField,
        DateField,
        TimeField,
        SingleSelectField,
      },

      data() {
        return {
          fieldsModel,
        };
      },

      watch: {
        fieldsModel: {
          deep: true,
          handler() {
            this.$parent.$emit("input", this.fieldsModel);
          },
        },
      },
    };

    return createElement(component);
  },
};
</script>

<style lang="scss" scoped></style>
