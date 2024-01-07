<template>
  <div class="container my-5">
    <div class="row justify-content-between">
      <div class="col-4">
        <h3>Uživatelé</h3>
      </div>
      <div class="col-4">
        <button
          class="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#addEditUserModal"
          @click="addNewUser()"
        >
          Přidat uživatele
        </button>
      </div>
    </div>
  </div>

  <!-- Modal -->
  <div
    class="modal fade"
    id="addEditUserModal"
    tabindex="-1"
    aria-labelledby="addEditUserModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="addEditUserModalLabel">
            Přidání/Editace záznamu
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
              <label for="name1" class="form-label">Jméno</label>
              <input
                type="text"
                v-model="selectedItem.name"
                class="form-control"
                id="name1"
              />
            </div>
            <div class="mb-3">
              <label for="surname1" class="form-label">Přijmení</label>
              <input
                type="text"
                v-model="selectedItem.surname"
                class="form-control"
                id="surname1"
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
            @click="saveUser(selectedItem)"
          >
            Uložit
          </button>
        </div>
      </div>
    </div>
  </div>

  <div class="container-md">
    <div class="table-responsive">
      <table class="table table-hover table-bordered align-middle">
        <thead>
          <tr class="d-flex" height="60rem">
            <th scope="col" class="col-4 text-center">Name</th>
            <th scope="col" class="col-4 text-center">Surname</th>
            <th scope="col" class="col-4 text-center">Options</th>
          </tr>
        </thead>
        <tbody>
          <tr class="d-flex" v-for="user in users" :key="user.id">
            <td class="col-4 text-center">{{ user.name }}</td>
            <td class="col-4 text-center">{{ user.surname }}</td>
            <td class="col-4 text-center">
              <button
                class="btn-outline-primary btn-sm m-1"
                data-bs-toggle="modal"
                data-bs-target="#addEditUserModal"
                @click="editSelectedUser(user)"
              >
                Editovat
              </button>
              <button
                class="btn-outline-primary btn-sm m-1"
                @click="deleteSelectedUser(user)"
              >
                Smazat
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div
      v-if="userHasTask"
      class="alert alert-warning text-center alert-dismissible fade show"
      role="alert"
    >
      <h5>Uživatele nelze smazat pokud má přiřazený úkol.</h5>
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
        @click="closeAlert()"
      ></button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "UsersTable",

  data() {
    return {
      selectedItem: {},
      userHasTask: false,
      isConfirmVisible: false,
    };
  },
  computed: {
    ...mapState("users", ["users"]),
    ...mapState("tasks", ["tasks"]),
  },
  methods: {
    ...mapActions("users", ["deleteUser", "saveUser"]),
    deleteSelectedUser(user) {
      const userHasSomeTask = this.tasks.some(
        (task) => task.userId === user.id
      );
      if (userHasSomeTask) {
        this.userHasTask = true;
        setTimeout(() => {
          this.userHasTask = false;
        }, 3000);
      } else {
        this.isConfirmVisible = true;
        this.deleteUser(user.id);
      }
    },
    closeAlert() {
      this.userHasTask = false;
    },
    editSelectedUser(user) {
      this.selectedItem = { ...user };
    },
    addNewUser() {
      let newUser = {
        name: "",
        surname: "",
        id: null,
      };
      this.selectedItem = newUser;
    },
  },
};
</script>
<style scoped lang="scss"></style>
