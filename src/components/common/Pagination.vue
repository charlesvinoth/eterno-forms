<template>
  <div class="pagination">
    <!-- informator -->

    <div class="informator">
      <span>Showing </span>
      <span class="count">{{ totalItems ? itemFrom : 0 }}</span>
      <span> - </span>
      <span class="count">{{ itemTo }}</span>
      <span> of </span>
      <span class="count">{{ totalItems }}</span>
      <span class="text-capitalize"> {{ label }}</span>
    </div>

    <!-- ... -->

    <q-space />

    <!-- previous page -->

    <div
      class="page previous"
      :class="{ isDisabled: currentPage === 1 }"
      @click="goto(currentPage - 1)"
    >
      <q-icon name="navigate_before" size="16px"></q-icon>

      <div class="label q-ml-sm">prev</div>
    </div>

    <!-- ... -->

    <!-- current page -->

    <div class="current-page">
      <input
        v-model.number="page"
        :placeholder="pages"
        type="number"
        @keypress.enter="onKeypress"
      />
    </div>

    <!-- ... -->

    <!-- next page -->

    <div
      class="page next"
      :class="{ isDisabled: currentPage === totalPages }"
      @click="goto(currentPage + 1)"
    >
      <div class="label q-mr-sm">next</div>

      <q-icon name="navigate_next" size="16px"></q-icon>
    </div>

    <!-- ... -->
  </div>
</template>

<script>
export default {
  name: "Pagination",

  props: {
    totalItems: {
      type: Number,
      required: true,
    },

    label: {
      type: String,
      default: "items",
    },
  },

  data() {
    return {
      currentPage: 1,
      itemFrom: 1,
      itemTo: 50,
      itemsPerPage: 50,
      page: null,
    };
  },

  computed: {
    totalPages() {
      const _itemsPerPage =
        this.itemsPerPage > this.totalItems
          ? this.totalItems
          : this.itemsPerPage;
      return Math.ceil(this.totalItems / _itemsPerPage);
    },

    pages() {
      return this.totalItems ? `${this.currentPage} / ${this.totalPages}` : 0;
    },
  },

  watch: {
    totalItems: {
      immediate: true,
      handler() {
        this.itemTo =
          this.itemsPerPage > this.totalItems
            ? this.totalItems
            : this.itemsPerPage;
      },
    },
  },

  methods: {
    onKeypress() {
      if (!this.totalItems) {
        this.page = null;
        return;
      }

      if (this.page < 1) {
        this.goto(1);
      } else if (this.page > this.totalPages) {
        this.goto(this.totalPages);
      } else {
        this.page && this.goto(this.page);
      }

      this.page = null;
    },

    goto(page) {
      // if skipping pages
      const pageDifference = Math.abs(this.currentPage - page);

      // adjust
      const _itemsPerPage = this.itemsPerPage * pageDifference;

      // if going to the next page
      if (page > this.currentPage) {
        this.itemFrom = this.itemFrom + _itemsPerPage;
        this.itemTo = this.itemTo + _itemsPerPage;
      }

      // if going to the previous page
      if (page < this.currentPage) {
        this.itemFrom = this.itemFrom - _itemsPerPage;
        this.itemTo = this.itemTo - _itemsPerPage;
      }

      // if going back from the last page
      if (this.currentPage === this.totalPages) {
        this.itemTo = this.totalPages * this.itemsPerPage - _itemsPerPage;
      }

      // if going to the last page
      if (page === this.totalPages && this.itemTo > this.totalItems) {
        this.itemTo = this.totalItems;
      }

      this.currentPage = page;
      this.$emit("fetch", this.itemFrom, this.itemTo);
    },
  },
};
</script>

<style lang="scss" scoped>
.pagination {
  display: flex;
  align-items: center;
  user-select: none;
  margin-top: 48px;
  margin-bottom: 24px;

  .informator {
    font-size: 12px;
    color: $gray-6;

    .count {
      font-weight: bold;
      color: $gray-10;
    }
  }

  .page {
    display: flex;
    align-items: center;
    color: $gray-6;
    border-radius: 4px;
    transition: all 0.3s ease;

    .label {
      font-size: 12px;
      font-weight: 500;
      text-transform: capitalize;
    }

    &:hover {
      cursor: pointer;
      background-color: $gray-2;
    }
  }

  .page.previous {
    padding: 8px 12px 8px 8px;
  }

  .page.next {
    padding: 8px 8px 8px 12px;
  }

  .page.isDisabled {
    pointer-events: none;
    opacity: 0.75;
  }

  .current-page {
    height: 34px;
    width: 68px;
    border-radius: 4px;
    margin: 0px 8px;

    input {
      text-align: center;
      font-weight: bold;
      font-size: 12px;
      color: $gray-8;
      border: 1px solid $gray-3;

      &:focus {
        border: 1px solid $tertiary;
      }

      &::placeholder {
        color: $gray-8;
        font-weight: bold;
      }
    }
  }
}

.current-page {
  height: 36px;
  width: 72px;
}
</style>
