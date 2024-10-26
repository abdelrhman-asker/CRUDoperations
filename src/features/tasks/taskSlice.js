// taskSlice.js
import { createSlice } from "@reduxjs/toolkit";
import {
  loadTasksFromLocalStorage,
  saveTasksToLocalStorage,
} from "../../utils/localStorage";

const initialState = {
  tasks: loadTasksFromLocalStorage(),
  filter: {
    state: "all",
    priority: "all",
    search: "",
  },
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
      saveTasksToLocalStorage(state.tasks);
    },
    updateTask: (state, action) => {
      const { id, data } = action.payload;
      const index = state.tasks.findIndex((task) => task.id === id);
      if (index !== -1) {
        state.tasks[index] = { ...state.tasks[index], ...data };
        saveTasksToLocalStorage(state.tasks);
      }
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      saveTasksToLocalStorage(state.tasks);
    },
    setFilter: (state, action) => {
      state.filter = { ...state.filter, ...action.payload };
    },
  },
});

export const { addTask, updateTask, deleteTask, setFilter } = taskSlice.actions;
export default taskSlice.reducer;
