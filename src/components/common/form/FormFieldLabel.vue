<template>
  <div class="form-field-label">
    <div class="label">
      <slot name="default"></slot>
    </div>

    <div v-if="isMandatory" class="is-mandatory">*</div>

    <q-icon
      v-if="hasTooltip"
      v-tooltip:secondary.top="tooltip"
      name="mdi-help-circle"
      size="16px"
      color="secondary"
      class="help"
    ></q-icon>
  </div>
</template>

<script>
export default {
  name: "FormFieldLabel",

  props: {
    isMandatory: {
      type: Boolean,
      default: false,
    },

    tooltip: {
      type: String,
      default: "",
    },
  },

  computed: {
    hasTooltip() {
      return Boolean(this.tooltip);
    },
  },
};
</script>

<style lang="scss" scoped>
.form-field-label {
  display: flex;
  align-items: center;
  margin-bottom: 8px;

  .label {
    font-size: 12px;
    color: $gray-6;
    text-transform: capitalize;
    line-height: 1;
  }

  .is-mandatory {
    color: $red-5;
    margin-left: 2px;
    line-height: 1;
  }

  .help {
    margin-left: 4px;
    cursor: pointer;
  }
}
</style>
