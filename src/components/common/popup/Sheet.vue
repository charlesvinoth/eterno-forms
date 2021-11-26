<template>
  <q-dialog
    :value="value"
    position="right"
    maximized
    :persistent="isPersistent"
    @input="onInput"
  >
    <div class="sheet box-shadow-2xl" :style="{ width }">
      <div class="sheet-header">
        <div class="sheet-title">{{ title }}</div>

        <div class="sheet-close-icon">
          <BaseIconButton
            is-flat
            is-dense
            icon="eva-close"
            color="gray-6"
            @click="onClick"
          />
        </div>
      </div>

      <BaseScrollbar :height="scrollBarHeight">
        <slot name="default"></slot>
      </BaseScrollbar>

      <div v-if="hasFooter" class="sheet-footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </q-dialog>
</template>

<script>
export default {
  name: "Sheet",

  props: {
    value: {
      type: Boolean,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    hasFooter: {
      type: Boolean,
      default: false,
    },

    width: {
      type: String,
      default: "360px",
    },

    isPersistent: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    scrollBarHeight() {
      const negativeHeight = this.hasFooter ? 128 : 64;
      return `calc(100vh - ${negativeHeight}px)`;
    },
  },

  methods: {
    onInput(value) {
      this.$emit("input", value);
    },

    onClick() {
      this.$emit("input", false);
    },
  },
};
</script>

<style lang="scss" scoped>
.sheet {
  background-color: white;
  border-radius: 4px;
  height: 100vh;
}

.sheet-header {
  display: flex;
  align-items: center;
  padding: 0px 16px;
  height: 64px;
  border-bottom: 1px solid $gray-2;
}

.sheet-title {
  color: $gray-10;
  font-size: 14px;
  font-weight: bold;
  text-transform: capitalize;
  flex-grow: 1;
}

.sheet-footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0px 16px;
  height: 64px;
  border-top: 1px solid $gray-2;
}
</style>
