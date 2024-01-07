<template>
  <div class="card">
    <div class="card-body">
      <div class="row">
        <div class="col-sm">
          <h5 class="card-title">{{ task.name }}</h5>
        </div>
        <div class="col-sm">
          <button
            v-if="task.status === 'ToDo'"
            class="btn btn-outline-primary btn-sm mb-1"
            data-bs-toggle="modal"
            :data-bs-target="'#editTaskModal' + task.id"
            @click="editSelectedTask(task)"
          >
            Editovat
          </button>
        </div>
      </div>

      <p class="card-text">
        {{ task.description }}
      </p>

      <p class="card-text">Přiřazen: {{ getUserName(task.userId) }}</p>

      <div>
        <button
          v-if="task.status !== 'Done'"
          class="btn btn-primary btn-sm me-1 mb-1"
          @click="forwardTask(task.id)"
        >
          Posunout
        </button>
        <button
          v-if="task.status === 'ToDo' || task.status === 'Done'"
          class="btn btn-outline-primary btn-sm mb-1"
          @click="deleteTask(task.id)"
        >
          Smazat
        </button>
      </div>
    </div>
  </div>

  <!-- Modal -->
  <div
    v-if="task.status === 'ToDo'"
    class="modal fade"
    :id="'editTaskModal' + task.id"
    tabindex="-1"
    :aria-labelledby="'editTaskModalLabel' + task.id"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" :id="'editTaskModalLabel' + task.id">
            Editovat
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="mb-3">
              <label for="name1" class="form-label">Název</label>
              <input
                type="text"
                v-model="selectedTask.name"
                class="form-control"
                id="name1"
              />
            </div>
            <div class="mb-3">
              <label for="description1" class="form-label">Popis</label>
              <input
                type="text"
                v-model="selectedTask.description"
                class="form-control"
                id="description1"
              />
            </div>
            <div class="mb-3">
              <label for="description1" class="form-label"
                >Přiřazený uživatel</label
              >
              <select
                class="form-select"
                aria-label="select"
                v-model="selectedTask.userId"
              >
                <option v-for="user in users" :key="user.id" :value="user.id">
                  {{ `${user.name} ${user.surname}` }}
                </option>
              </select>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Zavřít
          </button>
          <button
            type="button"
            class="btn btn-primary"
            data-bs-dismiss="modal"
            @click="editTask(selectedTask)"
          >
            Uložit
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "",
  props: {
    task: Object,
  },
  data() {
    return {
      selectedTask: {},
    };
  },
  methods: {
    ...mapActions("tasks", ["deleteTask", "editTask", "forwardTask"]),
    getUserName(id) {
      let user = this.users.find((u) => u.id === id);
      return `${user.name} ${user.surname}`;
    },    
    editSelectedTask(task) {
      this.selectedTask = { ...task };
    },
  },
  computed: {
    ...mapState("tasks", ["tasks"]),
    ...mapState("users", ["users"]),
  },
};
</script>

<style scoped lang="scss"></style>
