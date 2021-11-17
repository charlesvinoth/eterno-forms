<template>
  <BaseIconButton v-tooltip.top="'link'" is-flat icon="mdi-link" color="gray-6">
    <q-menu content-class="box-shadow-2xl">
      <div class="wrapper">
        <div class="input">
          <input v-model="link" type="text" placeholder="add link" />
        </div>

        <BaseIconButton
          v-tooltip.top="'save'"
          v-close-popup
          is-flat
          icon="eva-checkmark"
          color="gray-6"
          @click="save"
        />

        <BaseIconButton
          v-tooltip.top="'clear'"
          v-close-popup
          is-flat
          icon="eva-close"
          color="gray-6"
          @click="clear"
        />
      </div>
    </q-menu>
  </BaseIconButton>
</template>

<script>
export default {
  name: "HyperLink",

  props: {
    href: {
      type: String,
      default: "",
    },
  },

  data() {
    return {
      link: "",
    };
  },

  watch: {
    href: {
      immediate: true,
      handler() {
        this.link = this.href;
      },
    },
  },

  methods: {
    save() {
      this.$emit("set", this.link);
      this.link = "";
    },

    clear() {
      this.$emit("unset");
      this.link = "";
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  align-items: center;
  padding: 4px;

  .input {
    border: 1px solid $gray-3;
    border-radius: 4px;
    height: 36px;
    width: 240px;
    margin-right: 4px;

    input {
      height: 100%;
      width: 100%;
      outline: none;
      color: $gray-10;
      font-weight: 500;
      font-size: 13px;
    }
  }
}
</style>
