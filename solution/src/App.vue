<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light py-5">
    <div class="container">
      <a class="navbar-brand title" href="#"><h1>KANBAN</h1></a>
      <div>
        <router-link
          tag="button"
          class="btn btn-primary me-3"
          :to="{ name: 'users' }"
        >
          Uživatelé
        </router-link>
        <router-link
          tag="button"
          class="btn btn-primary"
          :to="{ name: 'groups' }"
        >
          Skupiny
        </router-link>
      </div>
    </div>
  </nav>
  <router-view />
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "app",
  methods: {
    ...mapActions("users", ["loadUsers"]),
    ...mapActions("tasks", ["loadTasks"]),
    ...mapActions("groups", ["loadGroups"]),
    loadData() {
      this.loadUsers();
      this.loadTasks();
      this.loadGroups();
    },
  },
  created() {
    this.loadData();
  },
};
</script>

<style lang="scss"></style>
