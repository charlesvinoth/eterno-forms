<template>
  <div class="logo">
    <div class="image-wrapper">
      <img src="@/assets/logo.png" />
    </div>

    <div class="title">
      <span class="text-primary">Eterno</span>
      <span class="text-secondary q-ml-xs">Forms</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Logo",
};
</script>

<style lang="scss" scoped>
.logo {
  display: flex;
  align-items: center;

  .image-wrapper {
    height: 56px;
    width: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  img {
    height: 24px;
  }

  .title {
    font-size: 18px;
    font-weight: bold;
  }
}
</style>
