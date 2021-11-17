<template>
  <div
    :class="{
      'field-is-readonly': isReadonly,
      'field-is-disabled': isDisabled,
    }"
  >
    <!-- field label -->

    <FormFieldLabel v-if="label" :is-mandatory="isMandatory" :tooltip="tooltip">
      {{ label }}
    </FormFieldLabel>

    <!-- ... -->

    <!-- field -->

    <div
      :tabindex="0"
      class="signature-field"
      :class="{
        'field-is-focused': isFocused,
        'field-has-error': hasError,
      }"
      @focus="isFocused = true"
      @blur="isFocused = false"
      @keypress.space.stop="browseSignature"
    >
      <!-- signature preview -->

      <div v-if="signatureSrc" class="signature-preview">
        <div class="signature">
          <img :src="signatureSrc" alt="signature" />
        </div>

        <!-- actions -->

        <div v-if="!isReadonly && !isDisabled" class="actions">
          <BaseIconButton
            v-tooltip:secondary.bottom="'edit signature'"
            color="secondary"
            is-flat
            icon="eva-edit-outline"
            class="bg-secondary-1 q-mr-xs"
            @click="editSignature"
          />

          <BaseIconButton
            v-tooltip:red.bottom="'delete signature'"
            color="red"
            is-flat
            icon="eva-trash-2-outline"
            class="bg-red-1"
            @click="removeSignature"
          />
        </div>

        <!-- ... -->
      </div>

      <!-- ... -->

      <!-- signature hint -->

      <div v-else class="signature-hint">
        <!-- hint -->

        <div class="hint-wrapper">
          <q-icon
            name="eva-edit-2"
            :color="isFocused ? 'secondary' : 'gray-4'"
            size="100px"
          ></q-icon>

          <div class="hint-1">
            <span class="link" @click="drawSignature">Draw</span>
            <span class="q-mx-xs">or</span>
            <span class="link q-mr-xs" @click="browseSignature">Upload</span>
            <span>your signature</span>
          </div>

          <div class="hint-2">We accept PNG, JPG & JPEG upto 1 MB</div>
        </div>

        <!-- ... -->

        <!-- dropzone -->

        <input ref="input" type="file" class="dropzone" @input="setSignature" />

        <!-- ... -->
      </div>

      <!-- ... -->

      <!-- signature cropper -->

      <ImageCropper
        v-model="signatureCropper"
        :image="signatureSrc"
        :aspect-ratio="16 / 9"
        :output-width="240"
        :output-height="135"
        @crop="cropSignature"
      ></ImageCropper>

      <!-- ... -->

      <!-- signature pad -->

      <SignaturePad v-model="signaturePad" @save="saveSignature"></SignaturePad>

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

import FormFieldLabel from "./FormFieldLabel.vue";
import FormFieldError from "./FormFieldError.vue";
import ImageCropper from "./ImageCropper.vue";
import SignaturePad from "./SignaturePad.vue";

export default {
  name: "SignatureField",

  components: {
    FormFieldLabel,
    FormFieldError,
    ImageCropper,
    SignaturePad,
  },

  props: {
    label: {
      type: String,
      default: "",
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
      signatureError: "",
      signatureSrc: "",
      signatureCropper: false,
      signaturePad: false,
    };
  },

  computed: {
    _error() {
      return this.signatureError || this.error;
    },

    hasError() {
      return Boolean(this._error);
    },
  },

  methods: {
    browseSignature() {
      this.$refs.input.click();
    },

    setSignature(e) {
      this.isFocused = false;

      const file = e.target.files[0];
      const fileType = file.type.split("/")[1];
      const fileSize = file.size;

      const isSupportedFileType = ["png", "jpg", "jpeg"].includes(
        lowerCase(fileType)
      );

      if (!isSupportedFileType) {
        this.signatureError = "unsupported file type";
        return;
      }

      if (fileSize > 1000000) {
        this.signatureError = "file size should be less than or equals 1 mb";
        return;
      }

      this.signatureError = "";

      const reader = new FileReader();
      reader.onload = (event) => {
        this.signatureSrc = event.target.result;
        this.$emit("input", this.signatureSrc);
        this.editSignature();
      };
      reader.readAsDataURL(file);
    },

    editSignature() {
      this.signatureCropper = true;
    },

    cropSignature(croppedSignature) {
      this.signatureSrc = croppedSignature;
      this.signatureCropper = false;

      this.$emit("input", this.signatureSrc);
    },

    removeSignature() {
      this.signatureSrc = "";
      this.$emit("input", this.signatureSrc);
    },

    drawSignature() {
      this.signaturePad = true;
    },

    saveSignature(signature) {
      this.signatureSrc = signature;
      this.signaturePad = false;

      this.$emit("input", this.signatureSrc);
    },
  },
};
</script>

<style lang="scss" scoped>
.signature-field {
  border: 1px solid $gray-3;
  border-radius: 4px;
  outline: 0;
}

.signature-preview {
  padding: 4px;

  .signature {
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

.signature-hint {
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

    .link {
      color: $secondary;
      cursor: pointer;
    }
  }

  .dropzone {
    opacity: 0;
    display: none;
  }
}
</style>
