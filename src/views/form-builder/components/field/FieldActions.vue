<template>
  <div class="actions">
    <q-btn
      v-if="showEditBtn"
      v-tooltip:indigo.right="'edit field'"
      round
      size="sm"
      icon="eva-edit-outline"
      color="indigo"
      class="q-mb-xs"
      @click.stop="$emit('edit')"
    />

    <q-btn
      v-tooltip:secondary.right="'field settings'"
      round
      size="sm"
      icon="eva-settings-2-outline"
      color="secondary"
      class="q-mb-xs"
      @click.stop="$emit('settings')"
    />

    <q-btn
      v-tooltip:red.right="'delete field'"
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
  name: "FieldActions",

  props: {
    showEditBtn: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.actions {
  display: flex;
  flex-direction: column;
}
</style>
