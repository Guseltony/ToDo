// import { activeTab } from "../main.js";

import { activeTab, setActiveTab, storageTask } from "../main.js";
import { renderTasks } from "./renderTasks.js";

// const taskContainer = document.querySelector(".tasks");

const filterMap = {
  all: (tasks) => tasks,
  completed: (tasks) => tasks.filter((t) => t.completed),
  pending: (tasks) => tasks.filter((t) => !t.completed),
  due: (tasks) => tasks.filter((t) => t.due),
};

export function filterTodos(filterType) {
  const taskContainer = document.querySelector(".tasks");
  taskContainer.innerHTML = "";

  setActiveTab(filterType);

  // activeTab = filterType;

  console.log("filterType:", filterType);

  const filtered = filterMap[filterType](storageTask);
  console.log("activeTab:", activeTab);

  renderTasks(filtered);
}
