<template>
  <BaseButton
    is-flat
    icon-left="eva-plus-circle"
    label="add field"
    color="gray-6"
    class="bg-gray-2"
  >
    <Menu class="hidden">
      <MenuItem
        v-for="field in fields"
        :key="field.id"
        v-close-popup
        :label="field.label"
        :icon="field.icon"
        icon-color="gray"
        @click="onClick(field.type)"
      ></MenuItem>
    </Menu>
  </BaseButton>
</template>

<script>
import Menu from "@/components/common/menu/Menu.vue";
import MenuItem from "@/components/common/menu/MenuItem.vue";

export default {
  name: "AddField",

  components: {
    Menu,
    MenuItem,
  },

  data() {
    return {
      fields: [
        {
          id: this.$nano.id(),
          label: "text",
          type: "TEXT",
          icon: "mdi-format-text",
        },
        {
          id: this.$nano.id(),
          label: "number",
          type: "NUMBER",
          icon: "mdi-numeric",
        },
        {
          id: this.$nano.id(),
          label: "date",
          type: "DATE",
          icon: "eva-calendar-outline",
        },
        {
          id: this.$nano.id(),
          label: "time",
          type: "TIME",
          icon: "eva-clock-outline",
        },
        {
          id: this.$nano.id(),
          label: "select",
          type: "SINGLE_SELECT",
          icon: "mdi-form-dropdown",
        },
      ],
    };
  },

  methods: {
    onClick(fieldType) {
      this.$emit("add", fieldType);
    },
  },
};
</script>

<style lang="scss"></style>
