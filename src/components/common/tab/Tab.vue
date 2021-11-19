<template>
  <div class="tab" :class="_class" @click="$emit('click')">
    <q-icon v-if="icon" :name="icon" size="20px" class="tab-icon"></q-icon>

    <div class="tab-label">
      {{ label }}
      <span v-if="count" class="tab-count" :class="{ active: isActive }">
        {{ count }}
      </span>
    </div>
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

    count: {
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
    _class() {
      return this.isActive
        ? `text-weight-bold text-${this.color}`
        : "text-gray-6";
    },
  },
};
</script>

<style lang="scss" scoped>
.tab {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;
  padding: 16px;
  user-select: none;
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

    .tab-count {
      margin-left: 4px;
      padding: 2px 6px;
      background-color: $gray-3;
      border-radius: 36px;

      &.active {
        background-color: $tertiary;
        color: white;
      }
    }
  }
}

.tab:hover {
  cursor: pointer;
  background-color: $gray-2;
}
</style>
