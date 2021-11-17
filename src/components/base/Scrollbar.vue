<template>
  <SimpleBar
    :style="{ height, width }"
    :class="{ 'always-visible': !autoHide }"
  >
    <slot name="default"></slot>
  </SimpleBar>
</template>

<script>
import SimpleBar from "simplebar-vue";
import "simplebar/dist/simplebar.min.css";

export default {
  name: "BaseScrollbar",

  components: { SimpleBar },

  props: {
    height: {
      type: String,
      default: "100%",
    },

    width: {
      type: String,
      default: "100%",
    },

    autoHide: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss">
@import "@/styles/quasar.variables.scss";

.simplebar-content-wrapper {
  outline: none;
}

.simplebar-scrollbar::before {
  top: 0 !important;
  right: 0 !important;
  bottom: 0 !important;
  left: 0 !important;
  border-radius: 4px !important;
  background: $gray-4;
}

.simplebar-track.simplebar-vertical {
  width: 8px !important;
}

.simplebar-track.simplebar-horizontal,
.simplebar-track.simplebar-horizontal .simplebar-scrollbar {
  height: 8px !important;
}

.simplebar-track.simplebar-horizontal .simplebar-scrollbar {
  top: 0;
}

.simplebar-scrollbar.simplebar-visible::before {
  background: $gray-4;
  opacity: 1;
}

.always-visible .simplebar-scrollbar::before {
  opacity: 1;
}
</style>
