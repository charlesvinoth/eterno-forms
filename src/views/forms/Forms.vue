<template>
  <AppLayout>
    <div slot="page-content" class="q-pa-lg">
      <!-- header -->

      <Header :selected-forms="selectedForms" @toggle-view="onToggleView" />

      <!-- ... -->

      <Tabs v-model="tab" :tabs="tabs" class="q-mb-lg" />

      <!-- forms -->

      <div v-if="view === 'GRID'" class="row q-col-gutter-md">
        <div v-for="form in forms" :key="form.id" class="col-sm-4 col-lg-3">
          <FormCard
            :form="form"
            :is-selected="isFormSelected(form.id)"
            @select="selectForm(form.id)"
            @favorite="form.isFavorite = !form.isFavorite"
          />
        </div>
      </div>

      <div v-if="view === 'LIST'" class="form-tiles">
        <FormTile
          v-for="form in forms"
          :key="form.id"
          :form="form"
          :is-selected="isFormSelected(form.id)"
          class="form-tile"
          @select="selectForm(form.id)"
          @favorite="form.isFavorite = !form.isFavorite"
        />
      </div>

      <!-- ... -->
    </div>
  </AppLayout>
</template>

<script>
import AppLayout from "@/layouts/app/AppLayout.vue";

import Tabs from "@/components/common/tab/Tabs.vue";

import Header from "./components/header/Header.vue";
import FormCard from "./components/FormCard.vue";
import FormTile from "./components/FormTile.vue";

export default {
  name: "Forms",

  components: {
    AppLayout,
    Tabs,
    Header,
    FormCard,
    FormTile,
  },

  data() {
    return {
      tab: {},
      tabs: [
        {
          id: this.$nano.id(),
          label: "all",
          icon: "mdi-view-dashboard-outline",
        },
        {
          id: this.$nano.id(),
          label: "favorite",
          icon: "eva-star-outline",
        },
        {
          id: this.$nano.id(),
          label: "published",
          icon: "eva-external-link-outline",
        },
        {
          id: this.$nano.id(),
          label: "drafts",
          icon: "mdi-text-box-outline",
        },
        {
          id: this.$nano.id(),
          label: "archive",
          icon: "eva-archive-outline",
        },
        {
          id: this.$nano.id(),
          label: "trash",
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
          status: "PUBLISHED",
          isFavorite: false,
          lastModified: "2021-10-24T15:12:20.011Z",
          layout: "CLASSIC",
          panels: [],
          submissions: 5,
        },
        {
          id: this.$nano.id(),
          name: "Student registration",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit",
          status: "DRAFTED",
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
          status: "PUBLISHED",
          isFavorite: false,
          lastModified: "2021-10-24T15:12:20.011Z",
          layout: "CLASSIC",
          panels: [],
          submissions: 9,
        },
        {
          id: this.$nano.id(),
          name: "Appointment request",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit",
          status: "TRASHED",
          isFavorite: true,
          lastModified: "2021-10-24T15:12:20.011Z",
          layout: "CARD",
          panels: [],
          submissions: 23,
        },
        {
          id: this.$nano.id(),
          name: "Purchase order",
          description:
            " Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde cupiditate, velit vitae repellendus nulla?",
          status: "ARCHIVED",
          isFavorite: true,
          lastModified: "2021-10-24T15:12:20.011Z",
          layout: "CLASSIC",
          panels: [],
          submissions: 15,
        },
      ],
      selectedForms: [],
    };
  },

  methods: {
    onToggleView(view) {
      this.view = view;
    },

    isFormSelected(formId) {
      return Boolean(this.selectedForms.find((_formId) => _formId === formId));
    },

    selectForm(formId) {
      const formIdx = this.selectedForms.findIndex(
        (_formId) => _formId === formId
      );

      if (formIdx === -1) {
        this.selectedForms.push(formId);
      } else {
        this.selectedForms.splice(formIdx, 1);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
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
