<template>
  <Action icon="eva-trash-2-outline" label="delete" @click="show">
    <Confirm
      v-model="showConfirmation"
      icon="eva-trash-2-outline"
      @no="hide"
      @yes="confirmDelete"
    >
      <template #title>
        <slot name="title"></slot>
      </template>

      <template #description>
        <slot name="description"></slot>
      </template>
    </Confirm>
  </Action>
</template>

<script>
import Confirm from "@/components/common/popup/Confirm.vue";
import Action from "@/components/common/Action.vue";

export default {
  name: "Delete",

  components: { Action, Confirm },

  data() {
    return {
      showConfirmation: false,
    };
  },

  methods: {
    show() {
      this.showConfirmation = true;
    },

    hide() {
      this.showConfirmation = false;
    },

    confirmDelete() {
      this.showConfirmation = false;
      this.$emit("delete");
    },
  },
};
</script>

<style lang="scss" scoped></style>
