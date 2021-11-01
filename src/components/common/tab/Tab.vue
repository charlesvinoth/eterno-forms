<template>
  <div class="tab" :class="activeClass" @click="$emit('click')">
    <!-- icon -->

    <q-icon v-if="icon" :name="icon" size="20px" class="tab-icon" />

    <!-- ... -->

    <!-- label -->

    <div class="tab-label">{{ label }}</div>

    <!-- ... -->
  </div>
</template>

<script>
export default {
  name: "TabItem",

  props: {
    label: {
      type: String,
      required: true,
    },

    icon: {
      type: String,
      default: "",
    },

    isActive: {
      type: Boolean,
      default: false,
    },

    color: {
      type: String,
      default: "primary",
    },
  },

  computed: {
    activeClass() {
      return this.isActive ? `active text-${this.color}` : "text-gray-6";
    },
  },
};
</script>

<style lang="scss" scoped>
.tab {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  padding: 16px;
  user-select: none;
  color: currentColor;
  border-radius: 4px;
  transition: all 0.3s ease;

  .tab-icon {
    margin-right: 8px;
  }

  .tab-label {
    font-size: 13px;
    font-weight: 500;
    line-height: 1;
    text-transform: capitalize;
  }
}

.tab:hover {
  cursor: pointer;
  background-color: $gray-2;
}

.tab.active {
  font-weight: bold;
}
</style>
