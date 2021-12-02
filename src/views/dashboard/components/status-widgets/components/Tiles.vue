<template>
  <div class="tiles">
    <div v-for="stat in _stats" :key="stat.id" class="tile">
      <div class="indicator" :class="`text-${stat.color.name}`"></div>
      <div class="name">{{ stat.label }}</div>
    </div>

    <div class="label">Percentage</div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Tiles",

  computed: {
    ...mapGetters("forms", ["stats"]),

    _stats() {
      // remove the first and the last element, since it is not needed

      const stats = [...this.stats];
      stats.shift();
      stats.pop();

      return stats;
    },
  },
};
</script>

<style lang="scss" scoped>
.tiles {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  position: relative;

  .tile {
    height: 36px;
    width: 120px;
    padding: 8px 16px;
    // background-color: $gray-1;
    // border: 1px solid $gray-2;
    border-radius: 4px;
    display: flex;
    align-items: center;

    .indicator {
      height: 14px;
      width: 14px;
      border-radius: 100%;
      background-color: currentColor;
      border: 2px solid white;
    }

    .name {
      color: $gray-5;
      font-size: 13px;
      font-weight: 500;
      text-transform: capitalize;
      margin-left: 8px;
    }
  }

  .label {
    color: $gray-5;
    font-size: 12px;
    position: absolute;
    bottom: -26px;
    width: 100%;
    text-align: right;
  }
}
</style>
