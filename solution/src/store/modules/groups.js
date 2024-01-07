import { v4 as uuidv4 } from "uuid";

const state = {
  groups: [],
};

const getters = {
  getGroups(state) {
    return state.groupList;
  },
};

const mutations = {
  SET_GROUPS(state, payload) {
    state.groups = payload;
  },
};

const actions = {
  loadGroups(context) {
    const groupList = require("@/data/groups.json");
    context.commit("SET_GROUPS", groupList);
  },
  saveGroup(context, group) {
    group.id = uuidv4();
    let clonedGroups = state.groups.map((a) => {
      return { ...a };
    });
    clonedGroups.push(group);
    context.commit("SET_GROUPS", clonedGroups);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
