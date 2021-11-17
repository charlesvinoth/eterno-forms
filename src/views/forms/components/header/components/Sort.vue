<template>
  <Action icon="mdi-sort" label="sort" iconRight="eva-chevron-down">
    <Menu>
      <BaseScrollbar :height="scrollbarHeight" width="240px">
        <MenuItem
          v-for="option in options"
          :key="option.id"
          :label="option.label"
          :icon="
            sortBy === option.value
              ? 'eva-checkmark-circle-2'
              : 'eva-radio-button-off'
          "
          :icon-color="sortBy === option.value ? 'secondary' : 'gray-4'"
          @click="setSortBy(option.value)"
        ></MenuItem>
      </BaseScrollbar>

      <q-separator inset color="gray-2" class="q-my-xs" />

      <MenuItem
        label="Sort descendingly"
        :icon="
          sortOrder === 'DESC' ? 'eva-checkmark-square-2' : 'eva-square-outline'
        "
        :icon-color="sortOrder === 'DESC' ? 'deep-orange' : 'gray-4'"
        @click="setSortOrder"
      ></MenuItem>
    </Menu>
  </Action>
</template>

<script>
import Menu from "@/components/common/menu/Menu.vue";
import MenuItem from "@/components/common/menu/MenuItem.vue";

import Action from "@/components/common/Action.vue";

export default {
  name: "Sort",

  components: { Action, Menu, MenuItem },

  data() {
    return {
      options: [
        {
          id: this.$nano.id(),
          label: "None",
          value: "none",
        },
        {
          id: this.$nano.id(),
          label: "Name",
          value: "name",
        },
        {
          id: this.$nano.id(),
          label: "Description",
          value: "description",
        },
        {
          id: this.$nano.id(),
          label: "Status",
          value: "status",
        },
        {
          id: this.$nano.id(),
          label: "Favorites",
          value: "isFavorite",
        },
        {
          id: this.$nano.id(),
          label: "Submissions",
          value: "submissions",
        },
        {
          id: this.$nano.id(),
          label: "Last Modified",
          value: "lastModified",
        },
      ],
      sortBy: "none",
      sortOrder: "ASC",
    };
  },

  computed: {
    scrollbarHeight() {
      const height = this.options.length * 40;
      return height > 240 ? "240px" : `${height}px`;
    },
  },

  methods: {
    emit() {
      this.$emit("sort", {
        sortBy: this.sortBy,
        sortOrder: this.sortOrder,
      });
    },

    setSortBy(option) {
      this.sortBy = option;
      this.emit();
    },

    setSortOrder() {
      this.sortOrder = this.sortOrder === "ASC" ? "DESC" : "ASC";
      this.emit();
    },
  },
};
</script>

<style lang="scss" scoped></style>
