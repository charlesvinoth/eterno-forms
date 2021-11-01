<template>
  <div class="filter">
    <div class="label">filter</div>

    <div class="row items-center">
      <div class="filter-by">{{ filterBy }}</div>
      <q-icon name="eva-chevron-down" size="20px" color="gray-4" />
    </div>

    <Menu>
      <MenuItem
        v-for="option in options"
        :key="option"
        :label="option"
        :icon="
          filterBy === option
            ? 'eva-checkmark-circle-2'
            : 'eva-radio-button-off'
        "
        :icon-color="filterBy === option ? 'secondary' : 'gray-4'"
        @click="onOptionClick(option)"
      >
      </MenuItem>
    </Menu>
  </div>
</template>

<script>
const Menu = () => import("@/components/common/menu/Menu.vue");
const MenuItem = () => import("@/components/common/menu/MenuItem.vue");

export default {
  name: "FilterBy",

  components: { Menu, MenuItem },

  data() {
    return {
      options: ["All", "Published", "Draft", "Favorite", "Archive", "Trash"],
      filterBy: "All",
    };
  },

  methods: {
    onOptionClick(option) {
      this.filterBy = option;
      this.$emit("filter", this.filterBy);
    },
  },
};
</script>

<style lang="scss" scoped>
.filter {
  user-select: none;
  cursor: pointer;
  margin: 0px 16px;

  .label {
    color: $gray-5;
    font-size: 11px;
    text-transform: capitalize;
  }

  .filter-by {
    color: $gray-8;
    font-size: 13px;
    font-weight: 500;
    margin-right: 8px;
  }
}
</style>
