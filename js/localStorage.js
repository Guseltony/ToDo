import { renderTasks } from "./renderTasks.js";
import { todos } from "./tasksapi.js";

export function fetchFromLocaleStorage() {
  // taking from the localStorage
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  if (tasks.length === 0) {
    tasks = [...todos];
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  renderTasks(tasks);

  return tasks;
}

export function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
