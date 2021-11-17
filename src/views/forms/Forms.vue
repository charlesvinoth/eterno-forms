<template>
  <AppLayout>
    <template slot="page-content">
      <BaseScrollbar height="calc(100vh - 57px)">
        <div class="container">
          <!-- header -->

          <Header
            :form-count="forms.length"
            :selectedForm="selectedForm"
            @sort="onSort"
            @search="onSearch"
          />

          <!-- ... -->

          <div class="row items-center q-mb-lg">
            <!-- tabs -->

            <Tabs v-model="tab" :tabs="tabs" />

            <!-- ... -->

            <q-space />

            <!-- view toggle -->

            <ViewToggle v-model="view" />

            <!-- ... -->
          </div>

          <!-- forms -->

          <div v-if="view === 'GRID'" class="row q-col-gutter-md">
            <div
              v-for="form in _forms"
              :key="form.id"
              class="col-sm-4 col-lg-3"
            >
              <FormCard
                :form="form"
                :is-selected="selectedForm.id === form.id"
                @select="selectForm(form)"
                @favorite="form.isFavorite = !form.isFavorite"
              />
            </div>
          </div>

          <div v-if="view === 'LIST'" class="form-tiles">
            <FormTile
              v-for="form in _forms"
              :key="form.id"
              :form="form"
              :is-selected="selectedForm.id === form.id"
              class="form-tile"
              @select="selectForm(form)"
              @favorite="form.isFavorite = !form.isFavorite"
            />
          </div>

          <!-- ... -->

          <q-space />

          <!-- pagination -->

          <Pagination label="forms" :total-items="_forms.length" />

          <!-- ... -->
        </div>
      </BaseScrollbar>
    </template>
  </AppLayout>
</template>

<script>
import AppLayout from "@/layouts/app/AppLayout.vue";

import Tabs from "@/components/common/tab/Tabs.vue";
import Pagination from "@/components/common/Pagination.vue";

import Header from "./components/header/Header.vue";
import ViewToggle from "./components/ViewToggle.vue";
import FormCard from "./components/FormCard.vue";
import FormTile from "./components/FormTile.vue";

export default {
  name: "Forms",

  components: {
    AppLayout,
    Tabs,
    Header,
    ViewToggle,
    FormCard,
    FormTile,
    Pagination,
  },

  data() {
    return {
      tab: "",
      tabs: [
        {
          id: this.$nano.id(),
          label: "all",
          value: "all",
          count: "05",
          icon: "mdi-view-dashboard-outline",
        },
        {
          id: this.$nano.id(),
          label: "published",
          value: "published",
          count: "02",
          icon: "eva-external-link-outline",
        },
        {
          id: this.$nano.id(),
          label: "draft",
          value: "draft",
          count: "01",
          icon: "mdi-text-box-outline",
        },
        {
          id: this.$nano.id(),
          label: "archive",
          value: "archive",
          count: "01",
          icon: "eva-archive-outline",
        },
        {
          id: this.$nano.id(),
          label: "trash",
          value: "trash",
          count: "01",
          icon: "eva-trash-2-outline",
        },
      ],
      view: "GRID",
      forms: [
        {
          id: this.$nano.id(),
          name: "Leave request",
          description:
            " Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde cupiditate, velit vitae repellendus nulla?",
          status: "published",
          isFavorite: false,
          lastModified: "2021-11-13T05:22:20.011Z",
          layout: "CLASSIC",
          panels: [],
          submissions: 5,
        },
        {
          id: this.$nano.id(),
          name: "Student registration",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit",
          status: "draft",
          isFavorite: false,
          lastModified: "2021-10-24T15:12:20.011Z",
          layout: "CARD",
          panels: [],
          submissions: 9,
        },
        {
          id: this.$nano.id(),
          name: "Hotel booking",
          description:
            " Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde cupiditate, velit vitae repellendus nulla?",
          status: "published",
          isFavorite: false,
          lastModified: "2021-09-15T23:07:20.011Z",
          layout: "CLASSIC",
          panels: [],
          submissions: 9,
        },
        {
          id: this.$nano.id(),
          name: "Appointment request",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit",
          status: "trash",
          isFavorite: true,
          lastModified: "2021-11-17T10:36:20.011Z",
          layout: "CARD",
          panels: [],
          submissions: 23,
        },
        {
          id: this.$nano.id(),
          name: "Purchase order",
          description:
            " Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde cupiditate, velit vitae repellendus nulla?",
          status: "archive",
          isFavorite: true,
          lastModified: "2021-10-10T18:07:20.011Z",
          layout: "CLASSIC",
          panels: [],
          submissions: 15,
        },
      ],
      selectedForm: {},
      sortCriteria: {
        sortBy: "none",
        sortOrder: "ASC",
      },
      searchQuery: "",
    };
  },

  computed: {
    _forms() {
      const forms = [...this.forms];

      let filteredForms = this.searchForms(forms);
      filteredForms = this.filterForms(filteredForms);
      const sortedForms = this.sortForms(filteredForms);

      return sortedForms;
    },
  },

  methods: {
    selectForm(form) {
      this.selectedForm = this.selectedForm.id === form.id ? {} : form;
    },

    onSort(sortCriteria) {
      this.sortCriteria = sortCriteria;
    },

    searchForms(forms) {
      if (this.searchQuery === "") return forms;

      return forms.filter((form) => {
        for (let key in form) {
          const value = form[key].toString().toLowerCase();
          if (value.includes(this.searchQuery.toLowerCase())) return true;
        }

        return false;
      });
    },

    filterForms(forms) {
      if (this.tab === "all") return forms;
      return forms.filter((form) => form.status === this.tab);
    },

    sortForms(forms) {
      const { sortBy, sortOrder } = this.sortCriteria;
      if (sortBy === "none") return forms;

      const sortedForms = forms.sort((a, b) => {
        if (a[sortBy] > b[sortBy]) return 1;
        else if (a[sortBy] < b[sortBy]) return -1;
        else return 0;
      });

      return sortOrder === "DESC" ? sortedForms.reverse() : sortedForms;
    },

    onSearch(query) {
      this.searchQuery = query;
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  padding: 16px 16px 0px 16px;
  min-height: calc(100vh - 57px);
}

.form-tiles {
  overflow: hidden;
  border-radius: 8px;
  border: 1px solid $gray-2;

  .form-tile {
    border-bottom: 1px solid $gray-2;
  }

  .form-tile:last-child {
    border-bottom: none;
  }
}
</style>
