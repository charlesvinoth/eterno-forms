<template>
  <div class="option-picker">
    <!-- search option -->

    <div v-if="!hideSearch" class="search-option">
      <input
        autofocus
        placeholder="Search option"
        @input="onInput"
        @keypress.enter="onKeypress"
      />
    </div>

    <!-- ... -->

    <!-- options -->

    <BaseScrollbar height="240px">
      <template v-if="options.length">
        <div
          v-for="option in options"
          :key="option.id"
          class="option"
          @click="onClick(option)"
        >
          <q-icon
            :name="getOptionIcon(option)"
            :color="getOptionColor(option)"
            class="q-mr-sm"
            size="20px"
          ></q-icon>

          <div>{{ option.label }}</div>
        </div>
      </template>

      <div v-else class="no-data">
        <div class="q-mb-sm">No option found</div>
        <div v-if="newOption">Press "Enter" to add new option</div>
      </div>
    </BaseScrollbar>

    <!-- ... -->
  </div>
</template>

<script>
export default {
  name: "OptionsPicker",

  props: {
    value: {
      type: [Object, Array],
      required: true,
    },

    options: {
      type: Array,
      required: true,
    },

    isMultiple: {
      type: Boolean,
      default: false,
    },

    newOption: {
      type: Boolean,
      default: false,
    },

    hideSearch: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    isSelected(option) {
      if (this.isMultiple) {
        const index = this.value.findIndex(
          (_option) => _option.id === option.id
        );
        return index === -1 ? false : true;
      } else {
        return this.value.label === option.label;
      }
    },

    onClick(option) {
      this.$emit("select", option);
    },

    onInput(e) {
      this.$emit("filter", e.target.value);
    },

    onKeypress(e) {
      if (this.newOption) {
        this.$emit("add", e.target.value);
        e.target.value = "";
      }
    },

    getOptionIcon(option) {
      const isSelected = this.isSelected(option);

      if (isSelected) {
        return this.isMultiple
          ? "eva-checkmark-square-2"
          : "eva-radio-button-on";
      } else {
        return this.isMultiple ? "eva-square" : "eva-radio-button-off";
      }
    },

    getOptionColor(option) {
      const isSelected = this.isSelected(option);
      return isSelected ? "secondary" : "gray-4";
    },
  },
};
</script>

<style lang="scss" scoped>
.option-picker {
  padding: 8px 0px;
}

.search-option {
  margin: 0px 8px 8px 8px;

  input {
    border: 1px solid $gray-3;
    border-radius: 4px;
    min-height: 36px;
  }
}

.option {
  display: flex;
  align-items: center;
  padding: 10px 24px;
  font-size: 13px;
  font-weight: 500;
  color: $gray-10;
  user-select: none;
  transition: all 0.25s ease;

  &:hover {
    background-color: $gray-2;
    cursor: pointer;
    border-radius: 4px;
  }
}

.no-data {
  font-size: 12px;
  color: $gray-5;
  text-align: center;
  margin-top: 8px;
}
</style>
