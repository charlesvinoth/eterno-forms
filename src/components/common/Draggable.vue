<template>
  <Dragable
    :value="value"
    :group="group"
    v-bind="{ animation: 200 }"
    @start="dragging = true"
    @end="dragging = false"
    @input="onInput"
  >
    <transition-group
      type="transition"
      :name="dragging ? null : 'flip-list'"
      :class="innerClass"
    >
      <slot name="default"></slot>
    </transition-group>
  </Dragable>
</template>

<script>
import Dragable from "vuedraggable";

export default {
  name: "Draggable",

  components: { Dragable },

  props: {
    value: {
      type: Array,
      required: true,
    },

    innerClass: {
      type: String,
      default: "",
    },

    group: {
      type: String,
      default: "draggable",
    },
  },

  data() {
    return {
      dragging: false,
    };
  },

  methods: {
    onInput(input) {
      this.$emit("input", input);
    },
  },
};
</script>

<style lang="scss" scoped>
.flip-list-move {
  transition: transform 0.5s;
}
</style>
