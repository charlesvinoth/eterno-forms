<template>
  <div @click="deSelectAll">
    <BaseScrollbar height="calc(100vh - 114px)" class="q-pa-lg">
      <div class="wrapper" @click.self="deSelectAll">
        <!-- panels -->

        <div class="panels-wrapper">
          <!-- panels -->

          <Draggable :value="value" @input="onInput">
            <Panel
              v-for="panel in value"
              ref="panel"
              :key="panel.id"
              :panel="panel"
              :selected-panel="selectedPanel"
              :active-panel="activePanel"
              @click.stop="selectPanel(panel.id)"
              @dragover.prevent="dragOverPanel(panel.id)"
              @dragleave="dragLeavePanel"
              @drop="dropOnPanel"
              @clear="deSelectAll"
              @delete="showDeletePanel = true"
            />
          </Draggable>

          <!-- ... -->

          <!-- add panel -->

          <AddPanel @click="addPanel" />

          <!-- ... -->
        </div>

        <!-- ... -->
      </div>
    </BaseScrollbar>

    <!-- delete panel -->

    <DeletePanel v-model="showDeletePanel" @delete="deletePanel" />

    <!-- ... -->
  </div>
</template>

<script>
import { lowerCase } from "lodash-es";

import Draggable from "@/components/common/Draggable.vue";

import Panel from "./Panel.vue";
import AddPanel from "./AddPanel.vue";
import DeletePanel from "./DeletePanel.vue";

export default {
  name: "Panels",

  components: {
    Draggable,
    Panel,
    AddPanel,
    DeletePanel,
  },

  props: {
    value: {
      type: Array,
      requird: true,
    },
  },

  data() {
    return {
      selectedPanel: "",
      activePanel: "",
      showDeletePanel: false,
    };
  },

  methods: {
    onInput(panels) {
      this.$emit("input", panels);
    },

    deSelectAll() {
      this.activePanel = "";
      this.selectedPanel = "";
      this.$refs.panel.forEach((panel) => panel.deSelectField());
    },

    selectPanel(panelId) {
      this.deSelectAll();
      this.selectedPanel = panelId;
    },

    dragOverPanel(panelId) {
      this.deSelectAll();
      this.activePanel = panelId;
    },

    dragLeavePanel() {
      this.activePanel = "";
    },

    dropOnPanel(e) {
      const fieldType = e.dataTransfer.getData("field");

      if (fieldType) {
        const field = this.newField(fieldType);
        const panelIdx = this.value.findIndex(
          (panel) => panel.id === this.activePanel
        );

        this.value[panelIdx].fields.push(field);
      }

      this.activePanel = "";
    },

    addPanel() {
      this.value.push({
        id: this.$nano.id(),
        fields: [],
      });
    },

    deletePanel() {
      const panelIdx = this.value.findIndex(
        (panel) => panel.id === this.selectedPanel
      );

      this.value.splice(panelIdx, 1);
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
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.panels-wrapper {
  width: 720px;
}
</style>
