import { attachCheckListeners } from "./checkFunction.js";
import { taskCard } from "./taskCard.js";

const taskContainer = document.querySelector(".tasks");

export function renderTasks(tasks) {
  taskContainer.innerHTML = "";

  tasks.map((todo) => {
    const taskEl = taskCard(todo);
    taskContainer.appendChild(taskEl);
    attachCheckListeners();
  });
}
