<template>
  <Confirm
    :value="value"
    icon="eva-trash-2-outline"
    @input="onClose"
    @no="onClose"
    @yes="onYes"
  >
    <template #title>Delete Field</template>

    <template #description>
      Are you sure want to delete this Field? If you delete the field all the
      data associated with it will also be deleted. You can't undo this action.
    </template>
  </Confirm>
</template>

<script>
import Confirm from "@/components/common/popup/Confirm.vue";

export default {
  name: "DeleteField",

  components: { Confirm },

  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    onClose() {
      this.$emit("input", false);
    },

    onYes() {
      this.$emit("yes");
    },
  },
};
</script>

<style lang="scss" scoped></style>
