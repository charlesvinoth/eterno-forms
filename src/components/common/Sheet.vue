<template>
  <q-dialog :value="value" position="right" maximized @input="onInput">
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
          ></BaseIconButton>
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
  },

  computed: {
    scrollBarHeight() {
      const negativeHeight = this.hasFooter ? 140 : 70;
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
  padding: 16px;
  border-bottom: 1px solid $gray-2;
}

.sheet-title {
  font-weight: bold;
  color: $gray-10;
  text-transform: capitalize;
  flex-grow: 1;
}

.sheet-footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 16px;
  border-top: 1px solid $gray-2;
}
</style>
