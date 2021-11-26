<template>
  <q-dialog :value="value" ma @input="onInput">
    <div class="modal box-shadow-2xl" :style="{ width }">
      <div class="modal-header">
        <div class="modal-title">{{ title }}</div>

        <div class="modal-close-icon">
          <BaseIconButton
            is-flat
            is-dense
            icon="eva-close"
            color="gray-6"
            @click="onClick"
          ></BaseIconButton>
        </div>
      </div>

      <slot name="default"></slot>

      <div v-if="hasFooter" class="modal-footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </q-dialog>
</template>

<script>
export default {
  name: "Modal",

  props: {
    value: {
      type: Boolean,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    hasFooter: {
      type: Boolean,
      default: false,
    },

    width: {
      type: String,
      default: "480px",
    },
  },

  methods: {
    onInput(value) {
      this.$emit("input", value);
    },

    onClick() {
      this.$emit("input", false);
    },
  },
};
</script>

<style lang="scss" scoped>
.modal {
  background-color: white;
  border-radius: 4px;
  max-width: 80vw;
}

.modal-header {
  display: flex;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid $gray-2;
}

.modal-title {
  color: $gray-10;
  font-size: 14px;
  font-weight: bold;
  text-transform: capitalize;
  flex-grow: 1;
}

.modal-footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0px 16px;
  height: 64px;
  border-top: 1px solid $gray-2;
}
</style>
