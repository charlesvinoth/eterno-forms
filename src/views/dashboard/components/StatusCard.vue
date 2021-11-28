<template>
  <div class="status-card">
    <div class="info">
      <div class="label">{{ status.label }}</div>
      <div class="count">{{ status.count }}</div>
    </div>

    <div class="avatar" :class="color">
      <q-icon :name="status.icon" size="20px" color="white" />
    </div>
  </div>
</template>

<script>
export default {
  name: "StatusCard",

  props: {
    status: {
      type: Object,
      required: true,
    },
  },

  computed: {
    color() {
      return `text-${this.status.color}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.status-card {
  height: 80px;
  background-color: white;
  border-radius: 0px 24px 24px 24px;
  border: 1px solid $gray-2;
  box-shadow: 0 1px 2px 0 rgba(15, 23, 42, 0.05) !important;
  padding: 24px;
  display: flex;
  align-items: center;

  .info {
    flex: 1;

    .label {
      color: $gray-5;
      font-size: 12px;
      text-transform: capitalize;
      margin-bottom: 4px;
    }

    .count {
      color: $gray-10;
      font-weight: bold;
      font-size: 16px;
    }
  }

  .avatar {
    height: 36px;
    width: 36px;
    border-radius: 16px 0px 16px 16px;
    background-color: currentColor;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 6px -1px rgba(15, 23, 42, 0.1),
      0 2px 4px -1px rgba(15, 23, 42, 0.06) !important;
  }
}
</style>
