<template>
  <div
    :class="{
      'field-is-readonly': isReadonly,
      'field-is-disabled': isDisabled,
    }"
  >
    <!-- field label -->

    <FormFieldLabel :is-mandatory="isMandatory" :tooltip="tooltip">
      {{ label }}
    </FormFieldLabel>

    <!-- ... -->

    <!-- field -->

    <div
      class="image-field"
      :class="{
        'field-is-focused': isFocused,
        'field-has-error': hasError,
      }"
    >
      <!-- image preview -->

      <div v-if="imageSrc" class="image-preview">
        <div class="image">
          <img :src="imageSrc" alt="image" />
        </div>

        <!-- actions -->

        <div v-if="!isReadonly && !isDisabled" class="actions">
          <BaseIconButton
            v-tooltip:secondary.bottom="'edit image'"
            color="secondary"
            is-flat
            icon="eva-edit-outline"
            class="bg-secondary-1 q-mr-xs"
            @click="editImage"
          />

          <BaseIconButton
            v-tooltip:red.bottom="'delete image'"
            color="red"
            is-flat
            icon="eva-trash-2-outline"
            class="bg-red-1"
            @click="removeImage"
          />
        </div>

        <!-- ... -->
      </div>

      <!-- ... -->

      <!-- image uploader -->

      <div v-else class="image-uploader">
        <!-- hint -->

        <div class="hint-wrapper">
          <q-icon
            name="eva-image-outline"
            :color="isFocused ? 'secondary' : 'gray-4'"
            size="100px"
          ></q-icon>

          <div class="hint-1">
            <span>Drag & Drop your image here or</span>
            <span class="text-secondary q-ml-xs">Browse</span>
          </div>

          <div class="hint-2">We accept PNG, JPG & JPEG upto 1 MB</div>
        </div>

        <!-- ... -->

        <!-- dropzone -->

        <input
          type="file"
          class="dropzone"
          @input="setImage"
          @focus="isFocused = true"
          @blur="isFocused = false"
          @dragover.prevent="isFocused = true"
          @dragleave="isFocused = false"
        />

        <!-- ... -->
      </div>

      <!-- ... -->

      <!-- image cropper -->

      <ImageCropper
        v-model="imageCropper"
        :image="imageSrc"
        @crop="cropImage"
      ></ImageCropper>

      <!-- ... -->
    </div>

    <!-- ... -->

    <!-- field error -->

    <FormFieldError v-if="_error">
      {{ _error }}
    </FormFieldError>

    <!-- ... -->
  </div>
</template>

<script>
import { lowerCase } from "lodash-es";

import ImageCropper from "@/components/common/ImageCropper.vue";

import FormFieldLabel from "./FormFieldLabel.vue";
import FormFieldError from "./FormFieldError.vue";

export default {
  name: "ImageField",

  components: {
    FormFieldLabel,
    FormFieldError,
    ImageCropper,
  },

  props: {
    label: {
      type: String,
      required: true,
    },

    isMandatory: {
      type: Boolean,
      default: false,
    },

    tooltip: {
      type: String,
      default: "",
    },

    value: {
      type: String,
      required: true,
    },

    error: {
      type: String,
      default: "",
    },

    isDisabled: {
      type: Boolean,
      default: false,
    },

    isReadonly: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      isFocused: false,
      imageError: "",
      imageSrc: "",
      imageCropper: false,
    };
  },

  computed: {
    _error() {
      return this.imageError || this.error;
    },

    hasError() {
      return Boolean(this._error);
    },
  },

  methods: {
    setImage(e) {
      this.isFocused = false;

      const file = e.target.files[0];
      const fileType = file.type.split("/")[1];
      const fileSize = file.size;

      const isSupportedFileType = ["png", "jpg", "jpeg"].includes(
        lowerCase(fileType)
      );

      if (!isSupportedFileType) {
        this.imageError = "unsupported file type";
        return;
      }

      if (fileSize > 1000000) {
        this.imageError = "file size should be less than or equals 1 mb";
        return;
      }

      this.imageError = "";

      const reader = new FileReader();
      reader.onload = (event) => {
        this.imageSrc = event.target.result;
        this.$emit("input", this.imageSrc);
        this.editImage();
      };
      reader.readAsDataURL(file);
    },

    editImage() {
      this.imageCropper = true;
    },

    cropImage(croppedImage) {
      this.imageSrc = croppedImage;
      this.imageCropper = false;

      this.$emit("input", this.imageSrc);
    },

    removeImage() {
      this.imageSrc = "";
      this.$emit("input", this.imageSrc);
    },
  },
};
</script>

<style lang="scss" scoped>
.image-field {
  border: 1px solid $gray-3;
  border-radius: 4px;
}

.image-preview {
  padding: 4px;

  .image {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;

    img {
      border-radius: 4px;
      display: block;
    }
  }

  .actions {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 8px;
  }
}

.image-uploader {
  position: relative;

  .hint-wrapper {
    text-align: center;
    padding: 16px;

    .hint-1 {
      color: $gray-10;
      font-size: 13px;
      font-weight: bold;
      margin-right: 4px;
      margin-top: 8px;
    }

    .hint-2 {
      color: $gray-5;
      font-size: 11px;
      margin-top: 4px;
    }
  }

  .dropzone {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }
}
</style>
