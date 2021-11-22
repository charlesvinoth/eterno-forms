<template>
  <div v-on="$listeners" class="form-field" draggable>
    <q-icon name="drag_indicator" size="16px" color="gray-5"></q-icon>

    <div class="icon-wrapper">
      <q-icon :name="field.icon" size="20px" color="gray-6" />
    </div>

    <div class="label">{{ field.name }}</div>
  </div>
</template>

<script>
export default {
  name: "Field",

  props: {
    field: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.form-field {
  display: flex;
  align-items: center;
  padding: 8px;
  border-radius: 4px;
  user-select: none;
  transition: all 0.3s ease;

  .icon-wrapper {
    height: 36px;
    width: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: $gray-2;
    border-radius: 100%;
    margin: 0px 16px 0px 8px;
    transition: all 0.3s ease;
  }

  .label {
    color: $gray-10;
    font-size: 13px;
    font-weight: 500;
    text-transform: capitalize;
    flex-grow: 1;
  }

  &:hover {
    background-color: $gray-2;
    cursor: move;

    .icon-wrapper {
      background-color: $gray-3;
    }
  }
}
</style>
