<template>
  <div @click="deselectAll">
    <BaseScrollbar height="calc(100vh - 114px)" class="q-pa-lg">
      <div class="wrapper" @click.self="deselectAll">
        <!-- panels -->

        <div v-if="panels.length" class="panels-wrapper">
          <!-- panels -->

          <Draggable v-model="panels">
            <Panel
              v-for="panel in panels"
              ref="panel"
              :key="panel.id"
              :data-id="panel.id"
              :panel="panel"
              :show-actions="selectedPanel.id === panel.id"
              :class="{
                selected: selectedPanel.id === panel.id,
                active: activePanel === panel.id,
              }"
              @click.stop="selectPanel(panel)"
              @dragover.prevent="dragOverPanel(panel.id)"
              @dragleave="dragLeavePanel"
              @drop="dropOnPanel"
              @edit="editSettings"
              @delete="showDeletePanel = true"
            />
          </Draggable>

          <!-- ... -->

          <!-- add panel -->

          <AddPanel @click="addPanel" />

          <!-- ... -->
        </div>

        <!-- ... -->

        <!-- empty state -->

        <EmptyState
          v-else
          :class="{ active: dragOverEmptyState }"
          @dragover.prevent="dragEnterEmptyState"
          @dragleave="dragLeaveEmptyState"
          @drop.stop="dropOnEmptyState"
        />

        <!-- ... -->

        <!-- panel settings -->

        <Settings
          v-model="settings"
          :panel="selectedPanel"
          @save="saveSettings"
        />

        <!-- ... -->

        <!-- delete panel -->

        <DeletePanel v-model="showDeletePanel" @yes="deletePanel" />

        <!-- ... -->
      </div>
    </BaseScrollbar>
  </div>
</template>

<script>
import { lowerCase } from "lodash-es";

import Draggable from "@/components/common/Draggable.vue";

import EmptyState from "./EmptyState.vue";
import Panel from "./Panel.vue";
import AddPanel from "./AddPanel.vue";
import DeletePanel from "./DeletePanel.vue";
import Settings from "./Settings.vue";

export default {
  name: "Panels",

  components: {
    Draggable,
    EmptyState,
    Panel,
    AddPanel,
    DeletePanel,
    Settings,
  },

  props: {
    form: {
      type: Object,
      requird: true,
    },
  },

  data() {
    return {
      dragOverEmptyState: false,
      panels: [],
      draggingPanel: false,
      selectedPanel: {},
      activePanel: "",
      settings: false,
      showDeletePanel: false,
    };
  },

  watch: {
    form: {
      immediate: true,
      handler() {
        this.panels = this.form.panels;
      },
    },

    panels: {
      deep: true,
      handler() {
        this.$emit("save", this.panels);
      },
    },
  },

  methods: {
    dragEnterEmptyState() {
      this.dragOverEmptyState = true;
    },

    dragLeaveEmptyState() {
      this.dragOverEmptyState = false;
    },

    dropOnEmptyState(e) {
      this.dragOverEmptyState = false;
      this.addPanel();

      const fieldType = e.dataTransfer.getData("field");

      if (fieldType) {
        const field = this.newField(fieldType);
        this.panels[0].fields.push(field);
      }
    },

    deselectAll() {
      this.activePanel = "";
      this.selectedPanel = {};
      this.$refs.panel.forEach((panel) => panel.deselectFields());
    },

    selectPanel(panel) {
      this.deselectAll();
      this.selectedPanel = panel;
    },

    dragOverPanel(panelId) {
      this.deselectAll();
      this.activePanel = panelId;
    },

    dragLeavePanel() {
      this.activePanel = "";
    },

    dropOnPanel(e) {
      const fieldType = e.dataTransfer.getData("field");

      if (fieldType) {
        const field = this.newField(fieldType);
        const panelIdx = this.panels.findIndex(
          (panel) => panel.id === this.activePanel
        );

        this.panels[panelIdx].fields.push(field);
      }

      this.activePanel = "";
    },

    addPanel() {
      this.panels.push({
        id: this.$nano.id(),
        title: "panel title",
        description: "panel description",
        fields: [],
      });
    },

    editSettings() {
      this.settings = true;
    },

    saveSettings(settings) {
      const panelIdx = this.panels.findIndex(
        (panel) => panel.id === this.selectedPanel.id
      );

      this.panels[panelIdx].title = settings.title;
      this.panels[panelIdx].description = settings.description;
    },

    deletePanel() {
      this.showDeletePanel = false;

      const panelIdx = this.panels.findIndex(
        (panel) => panel.id === this.selectedPanel.id
      );

      this.selectedPanel = {};
      this.panels.splice(panelIdx, 1);
    },

    newField(fieldType) {
      return {
        id: this.$nano.id(),
        type: fieldType,
        label: lowerCase(fieldType),
        tooltip: "",
        size: "LARGE",
        isMandatory: false,
        minDate: "",
        maxDate: "",
        minTime: "",
        maxTime: "",
        options: [],
        optionsPerLine: 1,
        titleText: "title",
        titleSize: "MEDIUM",
        titleColor: "#0f172a",
        titleAlignment: "LEFT",
        subTitle: "subtitle",
        dividerStyle: "SOLID",
        columns: [
          {
            id: this.$nano.id(),
            name: "Column-1",
            type: "TEXT",
          },
          {
            id: this.$nano.id(),
            name: "Column-2",
            type: "TEXT",
          },
          {
            id: this.$nano.id(),
            name: "Column-3",
            type: "TEXT",
          },
          {
            id: this.$nano.id(),
            name: "Column-4",
            type: "TEXT",
          },
        ],
        rows: [
          {
            id: this.$nano.id(),
            name: "Row-1",
            type: "TEXT",
          },
          {
            id: this.$nano.id(),
            name: "Row-2",
            type: "TEXT",
          },
          {
            id: this.$nano.id(),
            name: "Row-3",
            type: "TEXT",
          },
        ],
        matrixAxis: "COLUMN",
        content: {
          html: "",
          fields: [],
        },
      };
    },

    deleteField(panelIdx, fieldIdx) {
      this.panels[panelIdx].fields.splice(fieldIdx, 1);
    },

    saveFieldSettings(panelIdx, fieldIdx, fieldSettings) {
      this.panels[panelIdx].fields[fieldIdx] = fieldSettings;
    },

    saveFieldContent(panelIdx, fieldIdx, fieldContent) {
      this.panels[panelIdx].fields[fieldIdx].content = fieldContent;
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.panels-wrapper,
.empty-state-wrapper {
  width: 720px;
  position: relative;
}

.actions {
  position: absolute;
  right: -36px;
}
</style>
