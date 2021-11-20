<template>
  <div v-on="$listeners" class="empty-state">
    <div class="avatar">
      <q-icon name="eva-file-text-outline" class="icon" size="64px" />
    </div>

    <div class="title">Start building!</div>

    <div class="description">
      Drag fields from the left panel and drop here to add them to your form
    </div>
  </div>
</template>

<script>
export default {
  name: "EmptyState",

  props: {},
};
</script>

<style lang="scss" scoped>
.empty-state {
  height: calc(100vh - 162px);
  width: 720px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px dashed $gray-3;
  border-radius: 4px;

  &.active {
    border: 1px dashed $secondary;
  }

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
