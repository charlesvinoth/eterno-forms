<template>
  <div class="actions">
    <q-btn
      v-tooltip:primary.right="'panel settings'"
      round
      size="sm"
      icon="eva-settings-2-outline"
      color="primary"
      class="q-mb-xs"
      @click.stop="$emit('edit')"
    />

    <q-btn
      v-tooltip:red.right="'delete panel'"
      round
      size="sm"
      icon="eva-trash-2-outline"
      color="red"
      class="q-mb-xs"
      @click.stop="$emit('delete')"
    />
  </div>
</template>

<script>
export default {
  name: "Actions",
};
</script>

<style lang="scss" scoped>
.actions {
  display: flex;
  flex-direction: column;
}
</style>
