<template>
  <div class="add-panel">
    <div class="separator"></div>

    <BaseButton
      is-rounded
      is-flat
      color="gray-6"
      label="add panel"
      class="add-btn"
      @click="$emit('click')"
    />
  </div>
</template>

<script>
export default {
  name: "AddPanel",
};
</script>

<style lang="scss" scoped>
.add-panel {
  position: relative;
  padding-bottom: 24px;
  display: flex;
  align-items: center;
  justify-content: center;

  .separator {
    width: 100%;
    border-bottom: 1px dashed $gray-4;
    position: absolute;
    top: 18px;
  }

  .add-btn {
    background-color: $gray-3;
  }
}
</style>
