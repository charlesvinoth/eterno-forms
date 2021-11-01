<template>
  <q-dialog :value="value" @input="onInput">
    <div class="modal box-shadow-2xl">
      <div class="header">
        <div class="avatar" :class="bgColor">
          <q-icon :name="icon" size="20px" :color="color"></q-icon>
        </div>

        <div class="title">
          <slot name="title"></slot>
        </div>
      </div>

      <div class="description">
        <slot name="description"></slot>
      </div>

      <div class="actions">
        <BaseButton
          is-flat
          label="no"
          :color="color"
          class="q-mr-sm"
          @click="$emit('no')"
        />

        <BaseButton :label="action" :color="color" @click="$emit('yes')" />
      </div>
    </div>
  </q-dialog>
</template>

<script>
export default {
  name: "Confirm",

  props: {
    value: {
      type: Boolean,
      required: true,
    },

    icon: {
      type: String,
      required: true,
    },

    color: {
      type: String,
      default: "red",
    },

    action: {
      type: String,
      default: "yes",
    },
  },

  computed: {
    bgColor() {
      return `text-${this.color}-1`;
    },
  },

  methods: {
    onInput(value) {
      this.$emit("input", value);
    },
  },
};
</script>

<style lang="scss" scoped>
.modal {
  background-color: white;
  border-radius: 4px;
  width: 320px;
  padding: 16px;

  .header {
    display: flex;
    align-items: center;
    margin-bottom: 16px;

    .avatar {
      height: 36px;
      width: 36px;
      background: currentColor;
      border-radius: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 16px;
    }

    .title {
      color: $gray-8;
      font-size: 14px;
      font-weight: bold;
    }
  }

  .description {
    color: $gray-6;
    font-size: 12px;
  }

  .actions {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-top: 24px;
  }
}
</style>
