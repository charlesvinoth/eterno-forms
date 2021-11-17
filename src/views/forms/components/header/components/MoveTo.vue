<template>
  <Action
    icon="mdi-file-move-outline"
    label="Move To"
    icon-right="eva-chevron-down"
  >
    <Menu>
      <MenuItem
        v-for="option in _options"
        :key="option.id"
        :label="option.label"
        :icon="option.icon"
        @click="setMoveTo(option.value)"
      ></MenuItem>
    </Menu>
  </Action>
</template>

<script>
import Menu from "@/components/common/menu/Menu.vue";
import MenuItem from "@/components/common/menu/MenuItem.vue";

import Action from "@/components/common/Action.vue";

export default {
  name: "MoveTo",

  components: { Action, Menu, MenuItem },

  props: {
    selectedForm: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      options: [
        {
          id: this.$nano.id(),
          label: "archive",
          value: "archive",
          icon: "eva-archive-outline",
        },
        {
          id: this.$nano.id(),
          label: "draft",
          value: "draft",
          icon: "mdi-text-box-outline",
        },
        {
          id: this.$nano.id(),
          label: "published",
          value: "published",
          icon: "eva-external-link-outline",
        },
      ],
    };
  },

  computed: {
    _options() {
      return this.options.filter(
        (option) => option.label !== this.selectedForm.status
      );
    },
  },

  methods: {
    setMoveTo(option) {
      this.$emit(option);
    },
  },
};
</script>

<style lang="scss" scoped></style>
