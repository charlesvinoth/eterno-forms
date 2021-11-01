<template>
  <div class="header">
    <!-- row 1 -->

    <div class="row-1">
      <!-- title -->

      <div class="q-mr-xl">
        <div class="title">My Forms</div>
        <div class="subtitle">You have 5 forms in total</div>
      </div>

      <!-- ... -->

      <q-space />

      <template v-if="selectedForms.length">
        <div class="actions">
          <div v-ripple:white class="action">
            <q-icon name="mdi-table-eye" size="20px" class="icon" />

            <div class="label">submissions</div>
          </div>

          <q-separator vertical inset color="gray-2" class="q-mx-xs" />

          <div v-ripple:white class="action">
            <q-icon name="eva-edit" size="20px" class="icon" />

            <div class="label">edit</div>
          </div>

          <q-separator vertical inset color="gray-2" class="q-mx-xs" />

          <div v-ripple:white class="action">
            <q-icon name="eva-trash-2" size="20px" class="icon" />

            <div class="label">delete</div>
          </div>

          <q-separator vertical inset color="gray-2" class="q-mx-xs" />

          <div v-ripple:white class="action">
            <q-icon name="mdi-file-move" size="20px" class="icon" />

            <div class="label q-mr-sm">move to</div>

            <q-icon name="eva-chevron-down" size="20px" class="icon" />
          </div>
        </div>
      </template>

      <template v-else>
        <!-- sort by -->

        <SortBy class="q-mr-md" />

        <!-- ... -->

        <!-- view toggle -->

        <ViewToggle
          class="q-mx-md hidden"
          @toggle="(view) => $emit('toggle-view', view)"
        />

        <!-- ... -->

        <!-- new form -->

        <BaseButton label="new form" icon-left="eva-plus-circle" />

        <!-- ... -->
      </template>
    </div>

    <!-- ... -->

    <!-- row 2 -->

    <div class="row-2"></div>

    <!-- ... -->
  </div>
</template>

<script>
import SortBy from "./components/Sort.vue";
import ViewToggle from "./components/ViewToggle.vue";

export default {
  name: "Header",

  components: {
    SortBy,
    ViewToggle,
  },

  props: {
    selectedForms: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style lang="scss" scoped>
.row-1 {
  display: flex;
  align-items: center;
  margin-bottom: 16px;

  .title {
    color: $gray-8;
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 2px;
  }

  .subtitle {
    color: $gray;
    font-size: 12px;
  }

  .actions {
    height: 36px;
    display: flex;
    align-items: center;
    border-radius: 4px;
    border: 1px solid $gray-2;
    background-color: white;

    .action {
      height: 100%;
      display: flex;
      align-items: center;
      padding: 0px 10px;
      position: relative;

      .icon {
        color: $gray;
      }

      .label {
        color: $gray-8;
        font-size: 13px;
        font-weight: 500;
        text-transform: capitalize;
        margin-left: 8px;
      }

      &:hover {
        cursor: pointer;
        background-color: $tertiary;
        border-radius: 4px;
        box-shadow: 0 1px 3px 0 rgba(15, 23, 42, 0.1),
          0 1px 2px 0 rgba(15, 23, 42, 0.06) !important;

        .icon {
          color: white;
        }

        .label {
          color: white;
        }
      }
    }
  }
}
</style>
