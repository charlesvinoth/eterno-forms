<template>
  <div class="search-bar" :style="{ width }">
    <q-icon name="eva-search" size="20px" color="gray" />

    <div class="search-input">
      <input
        v-model="searchTerm"
        type="text"
        :placeholder="placeHolder"
        @keypress.enter="onSearch"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "Search",

  props: {
    placeHolder: {
      type: String,
      default: "Search",
    },

    width: {
      type: String,
      default: "100%",
    },
  },

  data() {
    return {
      searchTerm: "",
    };
  },

  methods: {
    onSearch() {
      this.$emit("search", this.searchTerm);
    },
  },
};
</script>

<style lang="scss" scoped>
.search-bar {
  height: 36px;
  display: flex;
  align-items: center;
  background-color: white;
  border: 1px solid $gray-2;
  border-radius: 4px;
  padding: 8px;
  box-shadow: 0 1px 2px 0 rgba(15, 23, 42, 0.05);

  .search-input {
    width: 100%;
    flex: 1;
    margin-left: 4px;
  }
}
</style>
