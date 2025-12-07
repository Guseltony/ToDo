const taskContainer = document.querySelector(".tasks");
import {
  activeTab,
  filterTodos,
  getTasksLength,
  storageTask,
} from "../main.js";
import { renderTasks } from "./renderTasks.js";

// let activeTab;

let uncheckedEl;

// console.log(todosCopy);

uncheckedEl = document.querySelectorAll(".checkEl");

export function attachCheckListeners() {
  const checkEls = document.querySelectorAll(".checkEl");

  console.log(checkEls);
  checkEls.forEach((el) => {
    el.removeEventListener?.("click", el._boundClick); // safe-remove any previous (optional)
    const handler = () => {
      const id = Number(el.dataset.id);
      checkTask(id);
    };
    el._boundClick = handler; // keep ref if you want to remove later
    el.addEventListener("click", handler);
  });
}

function checkTask(id) {
  // console.log(todosCopy);
  console.log("checking");
  for (let i = 0; i < storageTask.length; i++) {
    if (storageTask[i].id === id) {
      storageTask[i].completed = true;
      break;
    }
  }
  // re-render: clear container and call renderTasks again
  taskContainer.innerHTML = "";
  console.log("storageTask:", storageTask);

  if (activeTab === "pending") {
    console.log("pending activeTab:", activeTab);
    filterTodos("pending");
  } else renderTasks(storageTask);
  console.log("activeTab in check functionality:", activeTab);

  localStorage.setItem("tasks", JSON.stringify(storageTask));
  getTasksLength();

  // re-query checks and re-attach listeners (because DOM changed)
  uncheckedEl = document.querySelectorAll(".checkEl");
  uncheckedEl.forEach((el) => {
    el.addEventListener("click", () => {
      const id = Number(el.dataset.id);
      checkTask(id);
    });
  });
}
