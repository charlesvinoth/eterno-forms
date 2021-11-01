<template>
  <div class="chip" :class="[bgColor, textColor]">
    {{ status.toLowerCase() }}
  </div>
</template>

<script>
export default {
  name: "StatusChip",

  props: {
    status: {
      type: String,
      required: true,
    },
  },

  computed: {
    color() {
      switch (this.status) {
        case "PUBLISHED":
          return "green";
        case "DRAFTED":
          return "secondary";
        case "ARCHIVED":
          return "cyan";
        case "TRASHED":
          return "red";
        default:
          return "primary";
      }
    },

    bgColor() {
      return `bg-${this.color}-1`;
    },

    textColor() {
      return `text-${this.color}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.chip {
  padding: 2px 8px;
  font-size: 12px;
  font-weight: 500;
  text-transform: capitalize;
  letter-spacing: 0.05em;
  border-radius: 4px;
}
</style>
