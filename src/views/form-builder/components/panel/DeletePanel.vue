<template>
  <Confirm
    :value="value"
    icon="eva-trash-2-outline"
    @input="onClose"
    @no="onClose"
    @yes="onYes"
  >
    <template #title>Delete Panel</template>

    <template #description>
      Are you sure want to delete this Panel? If you delete the panel all the
      data associated with it will also be deleted. You can't undo this action.
    </template>
  </Confirm>
</template>

<script>
import Confirm from "@/components/common/popup/Confirm.vue";

export default {
  name: "DeletePanel",

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
