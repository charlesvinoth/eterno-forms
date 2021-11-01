<template>
  <div class="tabs">
    <!-- tabs -->

    <Tab
      v-for="(tab, index) in tabs"
      ref="tab"
      :key="tab.id"
      :icon="tab.icon"
      :label="tab.label"
      :color="color"
      :is-active="value.id === tab.id"
      @click="setActiveTab(index)"
    ></Tab>

    <!-- ... -->

    <!-- tab indicator -->

    <div ref="indicator" class="tab-indicator" :class="indicatorColor"></div>

    <!-- ... -->
  </div>
</template>

<script>
import Tab from "./Tab";

export default {
  name: "Tabs",

  components: { Tab },

  props: {
    value: {
      type: Object,
      required: true,
    },

    tabs: {
      type: Array,
      required: true,
    },

    color: {
      type: String,
      default: "primary",
    },

    isRouteTabs: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    indicatorColor() {
      return `text-${this.color}`;
    },
  },

  mounted() {
    if (this.isRouteTabs) {
      const tabIdx = this.tabs.findIndex(
        (tab) => tab.route === this.$route.name
      );
      this.setActiveTab(tabIdx === -1 ? 0 : tabIdx);
    } else {
      const tabIdx = this.tabs.findIndex((tab) => tab.id === this.value.id);
      this.setActiveTab(tabIdx === -1 ? 0 : tabIdx);
    }
  },

  methods: {
    setIndicatorData(target) {
      const left = target.$el.offsetLeft;
      this.$refs.indicator.style.left = `${left}px`;

      const width = target.$el.clientWidth;
      this.$refs.indicator.style.width = `${width}px`;
    },

    setActiveTab(tabIdx) {
      this.$emit("input", this.tabs[tabIdx]);
      this.setIndicatorData(this.$refs.tab[tabIdx]);
    },
  },
};
</script>

<style lang="scss" scoped>
.tabs {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  border-bottom: 1px solid $gray-2;
  position: relative;
}

.tab-indicator {
  position: absolute;
  bottom: -1.5px;
  height: 3px;
  background-color: currentColor;
  border-radius: 4px 4px 0px 0px;
  transition: all 0.3s ease;
}
</style>
