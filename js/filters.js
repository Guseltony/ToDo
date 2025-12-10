import { activeTab, setActiveTab, storageTask } from "../main.js";
import { renderTasks } from "./renderTasks.js";

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

  const filtered = filterMap[filterType](storageTask);

  renderTasks(filtered);
}
