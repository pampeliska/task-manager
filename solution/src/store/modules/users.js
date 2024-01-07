import { v4 as uuidv4 } from "uuid";

const state = {
  users: [],
};

const getters = {
  getUsers(state) {
    return state.userList;
  },
};

const mutations = {
  SET_USERS(state, payload) {
    state.users = payload;
  },
};

const actions = {
  loadUsers(context) {
    const userList = require("@/data/users.json");
    context.commit("SET_USERS", userList);
    // commit("SET_TOKEN", payload);
  },
  deleteUser(context, userId) {
    let clonedUsers = state.users.map((a) => {
      return { ...a };
    });
    clonedUsers = clonedUsers.filter((u) => u.id !== userId);
    context.commit("SET_USERS", clonedUsers);
  },
  saveUser(context, user) {
    let clonedUsers = state.users.map((a) => {
      return { ...a };
    });
    if (user.id !== null) {
      let editedUser = clonedUsers.find((u) => u.id === user.id);
      editedUser.name = user.name;
      editedUser.surname = user.surname;
    } else {
      user.id = uuidv4();
      clonedUsers.push(user);
    }
    context.commit("SET_USERS", clonedUsers);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
