// src/utils/localStorage.js

const TASKS_STORAGE_KEY = "tasks";

export const loadTasksFromLocalStorage = () => {
  try {
    const serializedTasks = localStorage.getItem(TASKS_STORAGE_KEY);
    return serializedTasks ? JSON.parse(serializedTasks) : [];
  } catch (e) {
    console.warn("Error loading tasks from localStorage", e);
    return [];
  }
};

export const saveTasksToLocalStorage = (tasks) => {
  try {
    const serializedTasks = JSON.stringify(tasks);
    localStorage.setItem(TASKS_STORAGE_KEY, serializedTasks);
  } catch (e) {
    console.warn("Error saving tasks to localStorage", e);
  }
};
