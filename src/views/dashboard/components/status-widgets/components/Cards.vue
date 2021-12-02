<template>
  <div class="cards">
    <div v-for="stat in stats" :key="stat.id" class="card">
      <div class="info">
        <div class="label">{{ stat.label }}</div>
        <div class="count">{{ stat.count }}</div>
      </div>

      <div
        class="avatar"
        :class="`text-${stat.color.name}`"
        :style="{ transform: `scale(${scale})` }"
      >
        <q-icon :name="stat.icon" size="20px" color="white" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Cards",

  data() {
    return {
      scale: 0,
    };
  },

  computed: {
    ...mapGetters("forms", ["stats"]),
  },

  created() {
    // for animation
    setTimeout(() => (this.scale = 1), 200);
  },
};
</script>

<style lang="scss" scoped>
.cards {
  display: flex;
  align-items: center;
  margin-bottom: 24px;

  .card {
    background-color: white;
    border-radius: 16px;
    border: 1px solid $gray-2;
    box-shadow: 0 1px 2px 0 rgba(15, 23, 42, 0.05) !important;
    padding: 16px 24px;
    display: flex;
    align-items: center;
    flex: 1;
    margin-right: 16px;

    &:last-child {
      margin-right: 0px;
    }

    .info {
      flex: 1;

      .label {
        color: $gray-5;
        font-size: 12px;
        text-transform: capitalize;
        margin-bottom: 4px;
      }

      .count {
        color: $gray-10;
        font-weight: bold;
        font-size: 16px;
      }
    }

    .avatar {
      height: 36px;
      width: 36px;
      border-radius: 16px 0px 16px 16px;
      background-color: currentColor;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 6px -1px rgba(15, 23, 42, 0.1),
        0 2px 4px -1px rgba(15, 23, 42, 0.06) !important;
      transition: all 0.3s ease;
    }
  }
}

.card {
}
</style>
