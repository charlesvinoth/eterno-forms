<template>
  <BaseButton
    is-flat
    no-caps
    color="gray"
    label="Sort"
    icon-left="mdi-sort"
    icon-right="eva-chevron-down"
    class="bg-gray-3"
  >
    <Menu>
      <MenuItem
        v-for="option in options"
        :key="option"
        :label="option"
        :icon="
          sortBy === option ? 'eva-checkmark-circle-2' : 'eva-radio-button-off'
        "
        :icon-color="sortBy === option ? 'secondary' : 'gray-4'"
        @click="onOptionClick(option)"
      >
      </MenuItem>

      <q-separator inset color="gray-2" class="q-my-xs" />

      <MenuItem
        label="Sort descendingly"
        :icon="
          sortOrder === 'DESC' ? 'eva-checkmark-square-2' : 'eva-square-outline'
        "
        :icon-color="sortOrder === 'DESC' ? 'tertiary' : 'gray-4'"
        @click="toggleSortOrder"
      ></MenuItem>
    </Menu>
  </BaseButton>
</template>

<script>
import Menu from "@/components/common/menu/Menu.vue";
import MenuItem from "@/components/common/menu/MenuItem.vue";

export default {
  name: "SortBy",

  components: { Menu, MenuItem },

  data() {
    return {
      options: [
        "None",
        "Name",
        "Description",
        "Status",
        "Submissions",
        "Last Modified",
      ],
      sortBy: "None",
      sortOrder: "ASC",
    };
  },

  methods: {
    emit() {
      this.$emit("sort", {
        sortBy: this.sortBy,
        sortOrder: this.sortOrder,
      });
    },

    onOptionClick(option) {
      this.sortBy = option;
      this.emit();
    },

    toggleSortOrder() {
      this.sortOrder = this.sortOrder === "ASC" ? "DESC" : "ASC";
      this.emit();
    },
  },
};
</script>

<style lang="scss" scoped></style>
