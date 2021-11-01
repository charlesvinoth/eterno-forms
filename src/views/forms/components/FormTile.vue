<template>
  <div class="form-tile" @click.stop="$emit('select')">
    <BaseIconButton
      is-flat
      :icon="isSelected ? 'mdi-checkbox-marked' : 'mdi-checkbox-blank-outline'"
      :color="isSelected ? 'primary' : 'gray-4'"
      :class="{ 'bg-primary-1': isSelected }"
    />

    <BaseIconButton
      is-flat
      :icon="form.isFavorite ? 'eva-star' : 'eva-star-outline'"
      :color="form.isFavorite ? 'amber' : 'gray-4'"
      @click.stop="$emit('favorite')"
    />

    <div class="status-chip">
      <StatusChip :status="form.status" />
    </div>

    <div class="q-mx-md">
      <div class="name">{{ form.name }}</div>
      <div class="description">
        {{ form.description }}
      </div>
    </div>

    <q-space />

    <div class="submission">
      <div class="">Submissions</div>
      <div class="count">{{ form.submissions }}</div>
    </div>

    <div class="last-modified">
      <div class="">Last Modified</div>
      <div class="count">24 Oct 2021 03:15 PM</div>
    </div>
  </div>
</template>

<script>
import StatusChip from "./StatusChip.vue";

export default {
  name: "FormTile",

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
.form-tile {
  background-color: white;
  padding: 16px;
  display: flex;
  align-items: center;

  .status-chip {
    width: 75px;
    display: flex;
    align-items: center;
    margin-left: 16px;
    margin-right: 4px;
  }

  .name {
    color: $gray-8;
    font-size: 14px;
    font-weight: bold;
  }

  .description {
    color: $gray-5;
    font-size: 12px;
  }

  .submission,
  .last-modified {
    font-size: 12px;
    color: $gray-5;

    .count {
      color: $gray-8;
      font-weight: bold;
    }
  }

  .submission {
    width: 120px;
    margin-left: 16px;

    &:hover {
      color: $tertiary;
      cursor: pointer;
      text-decoration: underline;
    }
  }

  .last-modified {
    margin-right: 16px;
  }

  &:hover {
    background-color: #f8fafc;
    cursor: pointer;
  }
}
</style>
