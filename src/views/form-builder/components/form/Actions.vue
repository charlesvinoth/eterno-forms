<template>
  <div class="form-actions">
    <!-- preview -->

    <BaseIconButton
      v-tooltip:secondary.left="'preview'"
      icon="eva-eye-outline"
      color="secondary"
      @click="$emit('preview')"
    />

    <!-- ... -->

    <!-- settings -->

    <BaseIconButton
      v-tooltip:primary.left="'settings'"
      icon="eva-settings-2-outline"
      class="q-mt-sm"
      @click="$emit('settings')"
    />

    <!-- ... -->
  </div>
</template>

<script>
export default {
  name: "Actions",
};
</script>

<style lang="scss" scoped>
.form-actions {
  position: fixed;
  right: 0;
  bottom: 0;
  margin: 16px;
}
</style>
