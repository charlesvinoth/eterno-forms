<template>
  <div class="tabs">
    <!-- tabs -->

    <Tab
      v-for="tab in tabs"
      ref="tab"
      :key="tab.id"
      :icon="tab.icon"
      :label="tab.label"
      :count="tab.count"
      :color="color"
      :is-active="value === tab.value"
      :class="{ col: equalTabSize }"
      @click="setActiveTab(tab)"
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
      type: String,
      default: "",
    },

    tabs: {
      type: Array,
      required: true,
    },

    color: {
      type: String,
      default: "primary",
    },

    equalTabSize: {
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
    setTimeout(() => {
      const currentTab = this.value || this.tabs[0].value;
      const tab = this.tabs.find((tab) => tab.value === currentTab);
      this.setActiveTab(tab);
    }, 100);
  },

  methods: {
    setIndicatorData(tabId) {
      const tabIdx = this.tabs.findIndex((tab) => tab.id === tabId);
      const target = this.$refs.tab[tabIdx];

      const left = target.$el.offsetLeft;
      this.$refs.indicator.style.left = `${left}px`;

      const width = target.$el.clientWidth;
      this.$refs.indicator.style.width = `${width}px`;
    },

    setActiveTab(tab) {
      this.$emit("input", tab.value);
      this.setIndicatorData(tab.id);
    },
  },
};
</script>

<style lang="scss" scoped>
.tabs {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  position: relative;
}

.tab-indicator {
  position: absolute;
  bottom: -1.5px;
  width: 14px;
  height: 2px;
  background-color: currentColor;
  border-radius: 2px;
  transition: all 0.3s ease;
}
</style>
