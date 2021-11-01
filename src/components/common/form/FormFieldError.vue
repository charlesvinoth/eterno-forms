<template>
  <div class="form-field-error">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "FormFieldError",
};
</script>

<style lang="scss" scoped>
.form-field-error {
  margin-top: 8px;
  font-size: 12px;
  color: $red;
}
</style>
