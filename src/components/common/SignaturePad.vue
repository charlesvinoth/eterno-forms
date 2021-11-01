<template>
  <Modal :value="value" title="Draw Signature" has-footer @input="onInput">
    <template #default>
      <!-- sign pad -->

      <div class="q-mx-md rounded">
        <VueSignaturePad
          ref="signPad"
          height="216px"
          :options="signPadOptions"
        />
      </div>

      <!-- ... -->

      <!-- sign pad actions -->

      <div class="sign-pad-actions">
        <BaseIconButton
          v-tooltip.left="'undo signature'"
          is-flat
          is-dense
          is-bordered
          color="gray-6"
          icon="eva-undo-outline"
          class="q-mr-sm"
          @click="undoSign"
        ></BaseIconButton>

        <BaseIconButton
          v-tooltip.right="'clear signature'"
          is-flat
          is-dense
          is-bordered
          color="gray-6"
          icon="eva-trash-2-outline"
          @click="clearSign"
        ></BaseIconButton>
      </div>

      <!-- ... -->
    </template>

    <template #footer>
      <div class="row items-center justify-end">
        <BaseButton
          label="cancel"
          is-flat
          class="q-mr-sm"
          @click="cancel"
        ></BaseButton>

        <BaseButton label="save" @click="save"></BaseButton>
      </div>
    </template>
  </Modal>
</template>

<script>
import Modal from "@/components/common/Modal";

export default {
  name: "ImageCropper",

  components: { Modal },

  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      signPadOptions: {
        onBegin: () => {
          this.$refs.signPad.resizeCanvas();
        },
      },
    };
  },

  methods: {
    onInput(value) {
      this.$emit("input", value);
    },

    undoSign() {
      this.$refs.signPad.undoSignature();
    },

    clearSign() {
      this.$refs.signPad.clearSignature();
    },

    cancel() {
      this.$emit("input", false);
    },

    save() {
      if (this.$refs.signPad.isEmpty()) {
        this.$emit("save", "");
      } else {
        const sign = this.$refs.signPad.saveSignature().data;
        this.$emit("save", sign);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.sign-pad-actions {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 16px 0px;
}
</style>
