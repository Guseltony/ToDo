import { renderTasks } from "./renderTasks.js";
import { todos } from "./tasksapi.js";

export function fetchFromLocaleStorage() {
  // taking from the localStorage
  console.log("from local storage");
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  if (tasks.length === 0) {
    tasks = [...todos];
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  renderTasks(tasks);
  console.log("from local storage:", tasks);

  return tasks;
}
