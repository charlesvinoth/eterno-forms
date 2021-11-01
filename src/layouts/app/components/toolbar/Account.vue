<template>
  <div class="account">
    <div class="text-right">
      <div class="greetings">Hello, Amelia</div>
      <div class="role">Administrator</div>
    </div>

    <div class="avatar">
      <img src="@/assets/avatar.jpg" alt="avatar" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Account",
};
</script>

<style lang="scss" scoped>
.account {
  display: flex;
  align-items: center;
  margin-right: 16px;
}

.greetings {
  color: $gray-5;
  font-size: 12px;
  line-height: 1;
  font-weight: 500;
  letter-spacing: 0.025em;
  margin-bottom: 2px;
}

.role {
  display: inline-block;
  padding: 4px;
  color: $secondary;
  background-color: $secondary-1;
  border-radius: 4px;
  font-size: 11px;
  font-weight: bold;
  letter-spacing: 0.1em;
  line-height: 1;
  text-transform: uppercase;
}

.avatar {
  margin-left: 8px;
  width: 38px;
  height: 38px;
  border-radius: 100%;
  overflow: hidden;

  img {
    height: 38px;
  }
}
</style>
