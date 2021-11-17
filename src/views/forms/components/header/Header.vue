<template>
  <div class="header">
    <!-- title -->

    <div>
      <div class="title">My Forms</div>
      <div class="subtitle">You have {{ formCount }} forms in total</div>
    </div>

    <!-- ... -->

    <q-space />

    <!-- ... -->

    <template v-if="selectedForm.id">
      <!-- submissions -->

      <Submissions
        v-if="['published', 'archive'].includes(selectedForm.status)"
        class="q-mr-sm"
      />

      <!-- ... -->

      <!-- share -->

      <Share v-if="selectedForm.status === 'published'" class="q-mr-sm" />

      <!-- ... -->

      <!-- edit -->

      <Edit class="q-mr-sm" />

      <!-- ... -->

      <!-- delete -->

      <Delete class="q-mr-sm">
        <template #title>Delete {{ selectedForm.name }}?</template>

        <template #description>
          <div class="q-mb-md">
            Are you sure want to delete this Form? If you delete the form all
            the data associated with it will also be deleted.
          </div>

          <div>
            Don't worry, You can restore the deleted form anytime from the
            Trash.
          </div>
        </template>
      </Delete>

      <!-- ... -->

      <!-- move to -->

      <MoveTo :selected-form="selectedForm" />

      <!-- ... -->
    </template>

    <!-- ... -->

    <template v-else>
      <!-- search -->

      <Search width="240px" class="q-mr-sm" @search="onSearch" />

      <!-- ... -->

      <!-- sort by -->

      <Sort class="q-mr-sm" @sort="onSort" />

      <!-- ... -->

      <!-- new form -->

      <BaseButton label="New Form" no-caps icon-left="eva-plus-circle" />

      <!-- ... -->
    </template>

    <!-- ... -->
  </div>
</template>

<script>
import Search from "./components/Search.vue";
import Sort from "./components/Sort.vue";
import Submissions from "./components/Submissions.vue";
import Share from "./components/Share.vue";
import Edit from "./components/Edit.vue";
import Delete from "./components/Delete.vue";
import MoveTo from "./components/MoveTo.vue";

export default {
  name: "Header",

  components: { Search, Sort, Submissions, Share, Edit, Delete, MoveTo },

  props: {
    formCount: {
      type: Number,
      required: true,
    },

    selectedForm: {
      type: Object,
      required: true,
    },
  },

  methods: {
    onSort(sortBy) {
      this.$emit("sort", sortBy);
    },

    onSearch(query) {
      this.$emit("search", query);
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  margin-bottom: 16px;

  .title {
    color: $gray-10;
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 2px;
  }

  .subtitle {
    color: $gray;
    font-size: 12px;
  }
}
</style>
