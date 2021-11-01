<template>
  <div class="stats">
    <div
      v-for="stat in stats"
      :key="stat.id"
      class="stat"
      @click="$emit('click', stat.label)"
    >
      <!-- <q-separator
        v-if="index === 0"
        vertical
        inset
        color="gray-3"
        class="q-mx-md"
      /> -->

      <div class="icon" :class="bgColor(stat.color)">
        <q-icon :name="stat.icon" size="20px" :color="stat.color" />
      </div>

      <div class="info">
        <div class="label">{{ stat.label }}</div>
        <div class="count">{{ stat.count }}</div>
      </div>

      <!-- <q-separator
        v-if="index !== stats.length - 1"
        vertical
        inset
        color="gray-3"
        class="q-mx-md"
      /> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "Stats",

  data() {
    return {
      stats: [
        {
          id: this.$nano.id(),
          label: "Published",
          count: 7,
          icon: "eva-cloud-upload-outline",
          color: "green",
        },
        {
          id: this.$nano.id(),
          label: "Draft",
          count: 3,
          icon: "mdi-text-box-outline",
          color: "secondary",
        },
        {
          id: this.$nano.id(),
          label: "Favorite",
          count: 9,
          icon: "eva-star-outline",
          color: "amber",
        },
        {
          id: this.$nano.id(),
          label: "Archive",
          count: 5,
          icon: "eva-archive-outline",
          color: "cyan",
        },
        {
          id: this.$nano.id(),
          label: "Trash",
          count: 10,
          icon: "eva-trash-2-outline",
          color: "red",
        },
      ],
    };
  },

  methods: {
    bgColor(color) {
      return `bg-${color}-1`;
    },
  },
};
</script>

<style lang="scss" scoped>
.stats {
  display: flex;
  align-items: center;

  .stat {
    display: flex;
    align-items: center;
    padding: 8px 16px;

    .icon {
      height: 36px;
      width: 36px;
      border-radius: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid $gray-2;
    }

    .info {
      text-align: right;
      margin-left: 16px;

      .label {
        color: $gray;
        font-size: 11px;
        text-transform: capitalize;
      }

      .count {
        color: $gray-8;
        font-weight: bold;
      }
    }

    &:hover {
      cursor: pointer;
      background-color: white;
      border-radius: 4px;
    }
  }
}
</style>
