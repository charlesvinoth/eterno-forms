<template>
  <AppLayout>
    <template #page-content>
      <div class="row">
        <!-- fields -->

        <Fields />

        <!-- ... -->

        <div class="col">
          <!-- header -->

          <Header :form="form" @settings="showSettings" />

          <!-- ... -->

          <!-- panels -->

          <Panels :form="form" @save="savePanels" />

          <!-- ... -->

          <!-- actions -->

          <Actions @settings="showSettings" @preview="showPreview" />

          <!-- ... -->

          <!-- settings -->

          <Settings v-model="settingsSheet" :form="form" @save="saveSettings" />

          <!-- ... -->

          <!-- preview -->

          <Preview v-model="previewSheet" :form="form" />

          <!-- ... -->
        </div>
      </div>
    </template>
  </AppLayout>
</template>

<script>
import AppLayout from "@/layouts/app/AppLayout.vue";

import Fields from "./components/form/Fields.vue";
import Header from "./components/form/Header.vue";
import Panels from "./components/panel/Panels.vue";
import Actions from "./components/form/Actions.vue";
import Settings from "./components/form/Settings.vue";
import Preview from "./components/form/Preview.vue";

export default {
  name: "FormBuilder",

  components: {
    AppLayout,
    Fields,
    Header,
    Panels,
    Actions,
    Settings,
    Preview,
  },

  data() {
    return {
      form: {
        name: "form name",
        description: "form description",
        layout: "CLASSIC",
        panels: [],
      },
      settingsSheet: false,
      previewSheet: false,
    };
  },

  methods: {
    showSettings() {
      this.settingsSheet = true;
    },

    saveSettings(settings) {
      this.form.name = settings.name;
      this.form.description = settings.description;
      this.form.layout = settings.layout;
    },

    savePanels(panels) {
      this.form.panels = panels;
    },

    showPreview() {
      this.previewSheet = true;
    },
  },
};
</script>

<style lang="scss" scoped></style>
