<template>
  <Modal :value="value" title="Crop Image" has-footer @input="onInput">
    <template #default>
      <!-- cropper -->

      <div class="q-px-md q-mt-md">
        <vue-cropper
          ref="cropper"
          drag-mode="move"
          :src="image"
          :aspect-ratio="aspectRatio"
          :container-style="{ height: '240px', width: '100%' }"
        ></vue-cropper>

        <!-- ... -->

        <!-- cropper actions -->

        <div class="cropper-actions">
          <BaseIconButton
            v-tooltip.left="'zoom out'"
            is-flat
            is-bordered
            is-dense
            color="gray-6"
            icon="eva-minimize-outline"
            class="q-mr-sm"
            @click="zoomOut"
          ></BaseIconButton>

          <BaseIconButton
            v-tooltip.bottom="'zoom in'"
            is-flat
            is-dense
            is-bordered
            color="gray-6"
            icon="eva-maximize-outline"
            @click="zoomIn"
          ></BaseIconButton>

          <q-separator
            vertical
            inset
            color="gray-2"
            class="q-mx-md"
          ></q-separator>

          <BaseIconButton
            v-tooltip.bottom="'rotate left'"
            is-flat
            is-dense
            is-bordered
            color="gray-6"
            icon="mdi-rotate-left"
            class="q-mr-sm"
            @click="rotateLeft"
          ></BaseIconButton>

          <BaseIconButton
            v-tooltip.bottom="'rotate right'"
            is-flat
            is-dense
            is-bordered
            color="gray-6"
            icon="mdi-rotate-right"
            @click="rotateRight"
          ></BaseIconButton>

          <q-separator
            vertical
            inset
            color="gray-2"
            class="q-mx-md"
          ></q-separator>

          <BaseIconButton
            v-tooltip.right="'reset'"
            is-flat
            is-dense
            is-bordered
            color="gray-6"
            icon="eva-refresh"
            @click="reset"
          ></BaseIconButton>
        </div>

        <!-- ... -->
      </div>
    </template>

    <template #footer>
      <div class="row items-center justify-end">
        <BaseButton
          label="don't crop"
          is-flat
          class="q-mr-sm"
          @click="dontCrop"
        ></BaseButton>

        <BaseButton label="crop" @click="crop"></BaseButton>
      </div>
    </template>
  </Modal>
</template>

<script>
import VueCropper from "vue-cropperjs";
import "cropperjs/dist/cropper.css";

import Modal from "@/components/common/popup/Modal.vue";

export default {
  name: "ImageCropper",

  components: { VueCropper, Modal },

  props: {
    value: {
      type: Boolean,
      default: false,
    },

    image: {
      type: String,
      default: "",
    },

    outputWidth: {
      type: Number,
      default: 200,
    },

    outputHeight: {
      type: Number,
      default: 200,
    },

    aspectRatio: {
      type: Number,
      default: 1,
    },
  },

  methods: {
    onInput(value) {
      this.$emit("input", value);
    },

    zoomIn() {
      this.$refs.cropper.relativeZoom(0.1);
    },

    zoomOut() {
      this.$refs.cropper.relativeZoom(-0.1);
    },

    rotateLeft() {
      this.$refs.cropper.rotate(-90);
    },

    rotateRight() {
      this.$refs.cropper.rotate(90);
    },

    reset() {
      this.$refs.cropper.reset();
    },

    dontCrop() {
      this.reset();
      this.$emit("input", false);
    },

    crop() {
      const cropedImage = this.$refs.cropper
        .getCroppedCanvas({
          width: this.outputWidth,
          maxHeight: this.outputHeight,
        })
        .toDataURL();
      this.$emit("crop", cropedImage);
    },
  },
};
</script>

<style lang="scss" scoped>
.cropper-actions {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 16px 0px;
}
</style>
