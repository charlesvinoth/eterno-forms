<template>
  <div class="form-card" @click.stop="$emit('select')">
    <div class="row items-center">
      <StatusChip :status="form.status" />

      <BaseIconButton
        is-flat
        :icon="form.isFavorite ? 'eva-star' : 'eva-star-outline'"
        :color="form.isFavorite ? 'amber' : 'gray-4'"
        class="q-ml-md"
        @click.stop="$emit('favorite')"
      />

      <q-space />

      <BaseIconButton
        is-flat
        :icon="
          isSelected ? 'mdi-checkbox-marked' : 'mdi-checkbox-blank-outline'
        "
        :color="isSelected ? 'primary' : 'gray-4'"
        :class="{ 'bg-primary-1': isSelected }"
      />
    </div>

    <div class="q-mt-md q-mb-xs">
      <div class="name">{{ form.name }}</div>
    </div>

    <div class="description">
      {{ form.description }}
    </div>

    <q-space />

    <q-separator color="gray-2" class="q-my-md" />

    <div class="footer">
      <div>
        <span class="submission">Submissions</span>:
        <span class="count">{{ form.submissions }}</span>
      </div>

      <q-space />

      <div>Last Modified: <span class="count">24 Oct 2021 03:15 PM</span></div>
    </div>
  </div>
</template>

<script>
import StatusChip from "./StatusChip.vue";

export default {
  name: "FormCard",

  components: { StatusChip },

  props: {
    form: {
      type: Object,
      required: true,
    },

    isSelected: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.form-card {
  background-color: white;
  border-radius: 8px;
  padding: 16px;
  height: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid $gray-2;
  transition: all 0.3s ease;

  .name {
    color: $gray-8;
    font-size: 14px;
    font-weight: bold;
  }

  .description {
    color: $gray-5;
    font-size: 12px;
  }

  .footer {
    display: flex;
    align-items: center;
    font-size: 12px;
    color: $gray-5;

    .count {
      color: $gray-8;
      font-weight: bold;
    }

    .submission:hover {
      color: $tertiary;
      cursor: pointer;
      text-decoration: underline;
    }
  }

  &:hover {
    cursor: pointer;
    transform: translateY(-8px);
    box-shadow: 0 25px 50px -12px rgba(15, 23, 42, 0.25) !important;
  }
}
</style>
