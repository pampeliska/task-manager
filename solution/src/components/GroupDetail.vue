<template>
  <div class="container mt-5">
    <div class="row justify-content-between">
      <div class="col-4">
        <h3>{{ getGroupName }}</h3>
      </div>
      <div class="col-4">
        <button
          class="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#addTaskModal"
          @click="addTask()"
        >
          Přidat úkol
        </button>
      </div>
    </div>
  </div>

  <div class="container-md">
    <div class="row row-cols-1 row-cols-md-4 g-4 mt-3">
      <div class="col">
        <div class="card" style="min-height: 46rem">
          <div class="card-body">
            <h5 class="card-title text-center">To do</h5>
            <hr />
            <div class="vstack gap-2" v-for="task in tasks" :key="task.id">
              <Task
                :task="task"
                v-if="
                  task.status === 'ToDo' &&
                  task.groupId === this.$route.query.groupId
                "
              />
            </div>
          </div>
        </div>
      </div>

      <div class="col">
        <div class="card" style="min-height: 46rem">
          <div class="card-body">
            <h5 class="card-title text-center">In Progress</h5>
            <hr />
            <div class="vstack gap-2" v-for="task in tasks" :key="task.id">
              <Task
                :task="task"
                v-if="
                  task.status === 'InProgress' &&
                  task.groupId === this.$route.query.groupId
                "
              />
            </div>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card" style="min-height: 46rem">
          <div class="card-body">
            <h5 class="card-title text-center">In review</h5>
            <hr />
            <div class="vstack gap-2" v-for="task in tasks" :key="task.id">
              <Task
                :task="task"
                v-if="
                  task.status === 'InReview' &&
                  task.groupId === this.$route.query.groupId
                "
              />
            </div>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card" style="min-height: 46rem">
          <div class="card-body">
            <h5 class="card-title text-center">Done</h5>
            <hr />
            <div class="vstack gap-2" v-for="task in tasks" :key="task.id">
              <Task
                :task="task"
                v-if="
                  task.status === 'Done' &&
                  task.groupId === this.$route.query.groupId
                "
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div
      class="modal fade"
      id="addTaskModal"
      tabindex="-1"
      aria-labelledby="addTaskModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addTaskModalLabel">Přidat</h5>
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
                  v-model="selectedItem.name"
                  class="form-control"
                  id="name1"
                />
              </div>
              <div class="mb-3">
                <label for="description1" class="form-label">Popis</label>
                <input
                  type="text"
                  v-model="selectedItem.description"
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
                  v-model="selectedItem.userId"
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
              @click="saveTask(getSaveTaskItemObject)"
            >
              Uložit
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Task from "@/components/Task.vue";
import { mapActions, mapState } from "vuex";

export default {
  name: "GroupDetail",
  components: {
    Task,
  },
  data() {
    return {
      selectedItem: {},
    };
  },
  methods: {
    ...mapActions("tasks", ["saveTask"]),
    addTask() {
      this.selectedItem = {};
    },
  },
  computed: {
    ...mapState("tasks", ["tasks"]),
    ...mapState("users", ["users"]),
    ...mapState("groups", ["groups"]),

    getGroupName() {
      return this.groups.find((group) => group.id === this.$route.query.groupId)
        .name;
    },
    getSaveTaskItemObject() {
      return {selectedItem: this.selectedItem, groupId: this.$route.query.groupId};
    }
  },
};
</script>

<style scoped lang="scss"></style>
