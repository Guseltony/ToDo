const taskContainer = document.querySelector(".tasks");
import { getTasksLength, storageTask } from "../main.js";
import { renderTasks } from "./renderTasks.js";

let activeTab;

export function attachCheckListeners() {
  const checkEls = document.querySelectorAll(".checkEl");
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

  if (activeTab === "pending") filterTodos("pending");
  else renderTasks(storageTask);

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
