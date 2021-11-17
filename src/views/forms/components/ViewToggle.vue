<template>
  <div class="view-toggle">
    <div
      v-for="view in views"
      :key="view.id"
      class="icon-wrapper"
      :class="{ active: value === view.value }"
      @click="onViewClick(view.value)"
    >
      <q-icon :name="view.icon" size="20px" />
    </div>
  </div>
</template>

<script>
export default {
  name: "ViewToggle",

  props: {
    value: {
      type: String,
      required: true,
    },
  },

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
          icon: "eva-list",
        },
      ],
    };
  },

  methods: {
    onViewClick(view) {
      this.$emit("input", view);
    },
  },
};
</script>

<style lang="scss" scoped>
.view-toggle {
  padding: 4px;
  background-color: $gray-2;
  border-radius: 4px;
  display: flex;
  align-items: center;

  .icon-wrapper {
    height: 32px;
    width: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    color: $gray;
    cursor: pointer;

    &:hover {
      color: $secondary;
    }
  }

  .active {
    color: $secondary;
    background-color: white;
    box-shadow: 0 1px 3px 0 rgba(15, 23, 42, 0.1),
      0 1px 2px 0 rgba(15, 23, 42, 0.06);
  }
}
</style>
