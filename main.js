// import { todos } from "./js/tasksapi";

import { todos } from "./js/tasksapi.js";
// import { taskCard } from "./js/taskCard.js";
import { tabEl } from "./js/tabs.js";
import { fetchFromLocaleStorage } from "./js/localStorage.js";
import { renderTasks } from "./js/renderTasks.js";
import { updateTaskCounters } from "./js/taskCount.js";
import { filterTodos } from "./js/filters.js";
import { toggleModal } from "./js/modal.js";
import { initCustomSelects } from "./js/customSelects.js";
import { setupPicker } from "./js/dateTimePicker.js";
import { taskSubmission } from "./js/form.js";

const taskContainer = document.querySelector(".tasks");

export let storageTask = fetchFromLocaleStorage() || [];
// export let activeTab;

export let activeTab = "all";

export function setActiveTab(tab) {
  activeTab = tab;
}

function createTaskTab() {
  tabEl();
  updateTaskCounters(storageTask);
}

createTaskTab();

const allTabs = document.querySelectorAll(".tab");

// let todosCopy = [...todos];

// ! localStorage function

allTabs.forEach((t) => {
  t.addEventListener("click", () => {
    for (let i = 0; i < allTabs.length; i++) {
      console.log("i:", allTabs[i]);
      if (allTabs[i].classList.contains("active")) {
        allTabs[i].classList.remove("active");
      }

      t.classList.add("active");
    }

    filterTodos(t.dataset.name);
  });
});

// * showing task form

const showTaskFormBtn = document.querySelector(".add-btn");
const closeTaskFormBtn = document.querySelector(".close-task-form");
showTaskFormBtn.addEventListener("click", () => toggleModal("open"));
closeTaskFormBtn.addEventListener("click", () => toggleModal("close"));

document
  .querySelectorAll(".custom-select")
  .forEach((select) => initCustomSelects(select));

// Close dropdown when clicking outside
document.addEventListener("click", (e) => {
  document.querySelectorAll(".custom-select").forEach((select) => {
    if (!select.contains(e.target)) {
      select.classList.remove("open");
    }
  });
});

const dateInput = document.getElementById("taskDate");
const dateDisplay = document.getElementById("dateDisplay");

const startInput = document.getElementById("startTime");
const startDisplay = document.getElementById("startTimeDisplay");

const endInput = document.getElementById("endTime");
const endDisplay = document.getElementById("endTimeDisplay");

dateDisplay.addEventListener("click", () =>
  setupPicker(dateInput, dateDisplay)
);

startDisplay.addEventListener("click", () =>
  setupPicker(startInput, startDisplay)
);

endDisplay.addEventListener("click", () => setupPicker(endInput, endDisplay));

const formEl = document.getElementById("form");

formEl.addEventListener("submit", (e) => taskSubmission(e));
