import Vuex from "vuex";
import users from "./modules/users";
import groups from "./modules/groups";
import tasks from "./modules/tasks";

const store = new Vuex.Store({
  state: {},
  modules: {
    users,
    groups,
    tasks,
  },
});

export default store;
