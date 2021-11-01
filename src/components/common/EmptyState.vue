<template>
  <div class="empty-state">
    <div class="avatar">
      <q-icon :name="icon" class="icon" size="64px"></q-icon>
    </div>

    <div class="title">{{ title }}</div>

    <div class="description">{{ description }}</div>

    <div v-if="action" class="action">
      <BaseButton :label="action" :icon-left="actionIcon" color="secondary" />
    </div>
  </div>
</template>

<script>
export default {
  name: "EmptyState",

  props: {
    icon: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    action: {
      type: String,
      default: "",
    },

    actionIcon: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss" scoped>
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .avatar {
    height: 96px;
    width: 96px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid $gray-2;
    border-radius: 100%;
    color: $gray-6;
    background-color: $gray-3;
  }

  .title {
    color: $gray-10;
    font-weight: bold;
    margin: 24px 0px 4px 0px;
  }

  .description {
    color: $gray-5;
    font-size: 12px;
  }

  .action {
    margin-top: 24px;
  }
}
</style>
