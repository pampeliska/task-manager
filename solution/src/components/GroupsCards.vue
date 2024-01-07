<template>
  <div class="container mt-5">
    <div class="row justify-content-between">
      <div class="col-4">
        <h3>Skupiny</h3>
      </div>
      <div class="col-4">
        <button
          data-bs-toggle="modal"
          data-bs-target="#addGroupModal"
          class="btn btn-primary"
          @click="addGroup()"
        >
          Přidat skupinu
        </button>
      </div>
    </div>
  </div>

  <div class="container-md">
    <div class="row mt-5">
      <div class="col-sm-3 mb-4" v-for="group in groups" :key="group.id">
        <GroupCard :group="group" :tasks="tasks" />
      </div>
    </div>

    <!-- Modal -->
    <div
      class="modal fade"
      id="addGroupModal"
      tabindex="-1"
      aria-labelledby="addGroupModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addGroupModalLabel">Přidání skupiny</h5>
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
              @click="saveGroup(selectedItem)"
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
import { mapState, mapActions } from "vuex";
import GroupCard from "@/components/GroupCard.vue";

export default {
  name: "GroupsCards",
  components: {
    GroupCard,
  },

  data() {
    return {
      selectedItem: {},
    };
  },
  methods: {
    ...mapActions("groups", ["saveGroup"]),
    addGroup() {
      let newGroup = {
        name: "",
        description: "",
        id: null,
      };
      this.selectedItem = newGroup;
    },
  },
  computed: {
    ...mapState("tasks", ["tasks"]),
    ...mapState("groups", ["groups"]),
  },
};
</script>

<style scoped lang="scss"></style>
