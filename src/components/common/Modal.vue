<template>
  <q-dialog :value="value" @input="onInput">
    <div class="modal box-shadow-2xl">
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
  width: 480px;
}

.modal-header {
  display: flex;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid $gray-2;
}

.modal-title {
  font-weight: bold;
  color: $gray-10;
  text-transform: capitalize;
  flex-grow: 1;
}

.modal-footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 16px;
  border-top: 1px solid $gray-2;
}
</style>
