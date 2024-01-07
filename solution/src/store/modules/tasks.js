import { v4 as uuidv4 } from "uuid";

const state = {
  tasks: [],
};

const getters = {
  getTasks(state) {
    return state.taskList;
  },
};

const mutations = {
  SET_TASKS(state, payload) {
    state.tasks = payload;
  },
};

const actions = {
  loadTasks(context) {
    const taskList = require("@/data/tasks.json");
    context.commit("SET_TASKS", taskList);
  },
  saveTask(context, { selectedItem, groupId }) {
    let task = {
      name: selectedItem.name,
      description: selectedItem.description,
      userId: selectedItem.userId,
      groupId: groupId,
      id: uuidv4(),
      status: "ToDo",
    };
    let clonedTasks = state.tasks.map((a) => {
      return { ...a };
    });
    clonedTasks.push(task);
    context.commit("SET_TASKS", clonedTasks);
  },
  deleteTask(context, taskId) {
    let clonedTasks = state.tasks.map((a) => {
      return { ...a };
    });
    clonedTasks = clonedTasks.filter((u) => u.id !== taskId);
    context.commit("SET_TASKS", clonedTasks);
  },
  editTask(context, task) {
    let clonedTasks = state.tasks.map((a) => {
      return { ...a };
    });
    let taskToSave = clonedTasks.find((t) => t.id === task.id);
    taskToSave.name = task.name;
    taskToSave.description = task.description;
    taskToSave.userId = task.userId;
    context.commit("SET_TASKS", clonedTasks);
  },
  forwardTask(context, taskId) {
    let clonedTasks = state.tasks.map((a) => {
      return { ...a };
    });
    let taskToSave = clonedTasks.find((t) => t.id === taskId);
    if (taskToSave.status === "ToDo") {
      taskToSave.status = "InProgress";
    } else if (taskToSave.status === "InProgress") {
      taskToSave.status = "InReview";
    } else if (taskToSave.status === "InReview") {
      taskToSave.status = "Done";
    }
    context.commit("SET_TASKS", clonedTasks);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
