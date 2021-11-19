<template>
  <div @click="clearSelection">
    <BaseScrollbar height="calc(100vh - 114px)" class="q-pa-lg">
      <div class="wrapper" @click.self="clearSelection">
        <!-- panels -->

        <div v-if="panels.length" class="panels-wrapper">
          <!-- panels -->

          <Draggable
            v-model="panels"
            v-bind="{ animation: 200 }"
            @start="draggingPanel = true"
            @end="draggingPanel = false"
          >
            <transition-group
              type="transition"
              :name="draggingPanel ? null : 'flip-list'"
            >
              <div
                v-for="(panel, index) in panels"
                :key="panel.id"
                ref="panel"
                class="panel"
                :class="{
                  selected: selectedPanel.id === panel.id,
                  active: activePanel === panel.id,
                }"
                @click.stop="selectPanel(panel)"
                @dragover.prevent="dragOverPanel(panel.id)"
                @dragleave="dragLeavePanel"
                @drop="(e) => dropOnPanel(e, index)"
              >
                <!-- drag indicator -->

                <div class="drag-icon">
                  <q-icon name="drag_indicator" size="20px" color="gray-4" />
                </div>

                <!-- ... -->

                <!-- header -->

                <div class="q-mb-md q-px-sm">
                  <div v-if="panel.title" class="title">{{ panel.title }}</div>
                  <div v-if="panel.description" class="description">
                    {{ panel.description }}
                  </div>
                </div>

                <!-- ... -->

                <!-- fields -->

                <Fields
                  v-model="panel.fields"
                  ref="fields"
                  @clear="clearSelection"
                  @save-content="
                    (fieldIdx, fieldContent) =>
                      saveFieldContent(index, fieldIdx, fieldContent)
                  "
                  @save-settings="
                    (fieldIdx, fieldSettings) =>
                      saveFieldSettings(index, fieldIdx, fieldSettings)
                  "
                  @delete="(fieldIdx) => deleteField(index, fieldIdx)"
                />

                <!-- ... -->
              </div>
            </transition-group>
          </Draggable>

          <!-- ... -->

          <!-- actions -->

          <PanelActions
            v-if="selectedPanel.id"
            class="actions"
            :style="{ top: actionTopPos }"
            @edit="editPanelSettings"
            @delete="confirmDeletePanel"
          />

          <!-- ... -->

          <!-- add panel -->

          <div class="add-panel">
            <div class="separator"></div>
            <BaseButton
              is-rounded
              is-flat
              color="gray-6"
              label="add panel"
              class="add-btn"
              @click="addPanel"
            />
          </div>

          <!-- ... -->
        </div>

        <!-- ... -->

        <!-- empty state -->

        <div
          v-else
          class="empty-state-wrapper"
          :class="{ active: dragOverEmptyState }"
          @dragover.prevent="dragEnterEmptyState"
          @dragleave="dragLeaveEmptyState"
          @drop.stop="dropOnEmptyState"
        >
          <EmptyState
            icon="eva-file-text-outline"
            title="Start building!"
            description="Drag fields from the left panel and drop here to add them to your form"
          />
        </div>

        <!-- ... -->

        <!-- panel settings -->

        <PanelSettings
          v-model="panelSettings"
          :panel="selectedPanel"
          @save="savePanelSettings"
        />

        <!-- ... -->

        <!-- confirm delete panel -->

        <Confirm
          v-model="deletePanelConfirm"
          icon="eva-trash-2-outline"
          @no="cancelDeletePanel"
          @yes="deletePanel"
        >
          <template #title>Delete Panel</template>

          <template #description>
            Upon deleting this panel, the data associated with it will be
            deleted and cannot be retrieved. Do you still wish to proceed?
          </template>
        </Confirm>

        <!-- ... -->
      </div>
    </BaseScrollbar>
  </div>
</template>

<script>
import { lowerCase, isEmpty } from "lodash-es";

import Draggable from "vuedraggable";

import EmptyState from "@/components/common/EmptyState.vue";
import Confirm from "@/components/common/popup/Confirm.vue";

import PanelActions from "./PanelActions.vue";
import PanelSettings from "./PanelSettings.vue";
import Fields from "../field/Fields.vue";

export default {
  name: "Panels",

  components: {
    Draggable,
    EmptyState,
    PanelActions,
    PanelSettings,
    Fields,
    Confirm,
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
      panelSettings: false,
      deletePanelConfirm: false,
    };
  },

  computed: {
    actionTopPos() {
      if (isEmpty(this.selectedPanel)) return 0;

      const panelIdx = this.panels.findIndex(
        (panel) => panel.id === this.selectedPanel.id
      );

      return this.$refs.panel[panelIdx].offsetTop + "px";
    },
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

    dragOverPanel(panelId) {
      this.activePanel = panelId;
    },

    dragLeavePanel() {
      this.activePanel = "";
    },

    dropOnPanel(e, panelIdx) {
      this.activePanel = "";

      const fieldType = e.dataTransfer.getData("field");

      if (fieldType) {
        const field = this.newField(fieldType);
        this.panels[panelIdx].fields.push(field);
      }
    },

    clearSelection() {
      this.selectedPanel = {};
      this.activePanel = "";

      if (this.panels.length) {
        this.$refs.fields.forEach((field) => field.clearSelection());
      }
    },

    addPanel() {
      this.panels.push({
        id: this.$nano.id(),
        title: "panel title",
        description: "panel description",
        fields: [],
      });
    },

    selectPanel(panel) {
      this.clearSelection();
      this.selectedPanel = panel;
    },

    editPanelSettings() {
      this.panelSettings = true;
    },

    savePanelSettings(settings) {
      const panelIdx = this.panels.findIndex(
        (panel) => panel.id === this.selectedPanel.id
      );

      this.panels[panelIdx].title = settings.title;
      this.panels[panelIdx].description = settings.description;
    },

    confirmDeletePanel() {
      this.deletePanelConfirm = true;
    },

    cancelDeletePanel() {
      this.deletePanelConfirm = false;
    },

    deletePanel() {
      this.deletePanelConfirm = false;

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

.empty-state-wrapper {
  height: calc(100vh - 162px);
}

.empty-state-wrapper {
  border: 1px dashed $gray-3;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.empty-state-wrapper.active {
  border: 1px dashed $secondary;
}

.panel {
  padding: 16px 12px;
  background-color: white;
  border-radius: 4px;
  margin-bottom: 24px;
  cursor: pointer;
  border: 1px solid $gray-2;
  position: relative;

  .drag-icon {
    position: absolute;
    top: 16px;
    left: -32px;
  }

  .title {
    font-weight: bold;
    color: $gray-10;
    text-transform: capitalize;
  }

  .description {
    font-size: 12px;
    color: $gray-5;
  }
}

.panel.selected,
.panel.active {
  border: 1px dashed $primary;
}

.add-panel {
  position: relative;
  padding-bottom: 24px;
  display: flex;
  align-items: center;
  justify-content: center;

  .separator {
    width: 100%;
    border-bottom: 1px dashed $gray-4;
    position: absolute;
    top: 18px;
  }

  .add-btn {
    background-color: $gray-2;
  }
}

.actions {
  position: absolute;
  right: -36px;
}
</style>
