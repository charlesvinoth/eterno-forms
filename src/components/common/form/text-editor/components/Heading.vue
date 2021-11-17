<template>
  <BaseIconButton
    v-tooltip.top="'heading'"
    is-flat
    icon="mdi-format-size"
    color="gray-6"
  >
    <Menu class="hidden" alignment="left">
      <MenuItem
        v-for="heading in headings"
        :key="heading.id"
        :label="heading.label"
        :icon="heading.icon"
        icon-color="gray"
        :style="{ fontSize: heading.size }"
        @click="onClick(heading.level)"
      ></MenuItem>
    </Menu>
  </BaseIconButton>
</template>

<script>
import Menu from "@/components/common/menu/Menu.vue";
import MenuItem from "@/components/common/menu/MenuItem.vue";

export default {
  name: "Heading",

  components: { Menu, MenuItem },

  data() {
    return {
      headings: [
        {
          id: this.$nano.id(),
          label: "heading 1",
          icon: "mdi-format-header-1",
          size: "36px",
          level: 1,
        },
        {
          id: this.$nano.id(),
          label: "heading 2",
          icon: "mdi-format-header-2",
          size: "32px",
          level: 2,
        },
        {
          id: this.$nano.id(),
          label: "heading 3",
          icon: "mdi-format-header-3",
          size: "28px",
          level: 3,
        },
        {
          id: this.$nano.id(),
          label: "heading 4",
          icon: "mdi-format-header-4",
          size: "24px",
          level: 4,
        },
        {
          id: this.$nano.id(),
          label: "heading 5",
          icon: "mdi-format-header-5",
          size: "20px",
          level: 5,
        },
        {
          id: this.$nano.id(),
          label: "heading 6",
          icon: "mdi-format-header-6",
          size: "16px",
          level: 6,
        },
        {
          id: this.$nano.id(),
          label: "normal",
          icon: "mdi-format-paragraph",
          size: "14px",
          level: 7,
        },
      ],
    };
  },

  methods: {
    onClick(level) {
      this.$emit("toggle", level);
    },
  },
};
</script>

<style lang="scss" scoped></style>
