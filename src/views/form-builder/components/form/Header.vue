<template>
  <div class="header">
    <!-- form info -->

    <div class="form-info-wrapper" @click="$emit('settings')">
      <BaseIconButton
        is-flat
        icon="eva-file-text-outline"
        color="gray-6"
        class="q-mr-md border border-gray-2"
      />

      <div class="form-info">
        <div class="title">{{ form.name }}</div>
        <div class="description">
          {{ form.description }}
        </div>
      </div>
    </div>

    <!-- ... -->

    <!-- save -->

    <BaseButton
      label="save"
      color="secondary"
      icon-left="eva-save-outline"
      class="q-mr-sm"
      @click="$emit('save')"
    />

    <!-- ... -->

    <!-- publish -->

    <BaseButton
      label="publish"
      icon-left="eva-external-link"
      @click="$emit('publish')"
    />
    <!-- ... -->
  </div>
</template>

<script>
export default {
  name: "Header",

  props: {
    form: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  height: 56px;
  background-color: white;
  display: flex;
  align-items: center;
  padding: 0px 16px;
  border-bottom: 1px solid $gray-2;
}

.form-info-wrapper {
  flex: 1;
  display: flex;
  align-items: center;
  cursor: pointer;

  .form-info {
    .title {
      color: $gray-10;
      font-weight: bold;
      text-transform: capitalize;
    }

    .description {
      color: $gray-5;
      font-size: 12px;
    }
  }
}
</style>
