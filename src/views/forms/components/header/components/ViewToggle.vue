<template>
  <div class="view-toggle">
    <div
      v-for="view in views"
      :key="view.id"
      v-tooltip:secondary.top="view.label"
      class="icon-wrapper"
      :class="{ active: selectedView === view.value }"
      @click="onViewClick(view.value)"
    >
      <q-icon :name="view.icon" size="20px" />
    </div>
  </div>
</template>

<script>
export default {
  name: "ViewToggle",

  data() {
    return {
      views: [
        {
          id: this.$nano.id(),
          label: "Grid View",
          value: "GRID",
          icon: "eva-grid-outline",
        },
        {
          id: this.$nano.id(),
          label: "List View",
          value: "LIST",
          icon: "eva-list-outline",
        },
      ],
      selectedView: "GRID",
    };
  },

  methods: {
    onViewClick(view) {
      this.selectedView = view;
      this.$emit("toggle", view);
    },
  },
};
</script>

<style lang="scss" scoped>
.view-toggle {
  padding: 4px;
  background-color: $gray-3;
  border-radius: 36px;
  display: flex;
  align-items: center;

  .icon-wrapper {
    height: 36px;
    width: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100%;
    color: $gray;
    cursor: pointer;
  }

  .active {
    color: $secondary;
    background-color: white;
    box-shadow: 0 1px 3px 0 rgba(15, 23, 42, 0.1),
      0 1px 2px 0 rgba(15, 23, 42, 0.06);
  }
}
</style>
