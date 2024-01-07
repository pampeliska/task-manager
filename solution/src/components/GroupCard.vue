<template>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">{{ group.name }}</h5>
      <p class="card-text mt-4">
        {{ group.description }}
      </p>
      <p class="card-text">Počet úkolů: {{ getTasksCount }}</p>
      <router-link
        tag="button"
        class="btn btn-primary me-3"
        :to="{ name: 'group-detail', query: { groupId: group.id } }"
      >
        Vstoupit
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "GroupCard",
  props: {
    group: Object,
    tasks: Array,
  },
  computed: {
    getTasksCount() {
      return this.tasks.filter((task) => task.groupId === this.group.id).length;
    },
  },
};
</script>

<style scoped lang="scss"></style>
