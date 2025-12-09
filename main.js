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

const formedTasks = [];

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

formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("submitting");

  const titleFormEl = document.querySelector(".task-input");

  let descriptionFormEl = document.querySelector(".field textarea");

  let title = titleFormEl.value;
  let description = descriptionFormEl.value;

  let allSelects = document.querySelectorAll(".select-display");
  let category =
    allSelects[0].textContent === "Select Category"
      ? ""
      : allSelects[0].textContent;
  let priority =
    allSelects[1].textContent === "Select Priority"
      ? ""
      : allSelects[1].textContent;

  let date =
    dateDisplay.textContent === "Select Date" ? "" : dateDisplay.textContent;
  let startTime =
    startDisplay.textContent === "Start Time" ? "" : startDisplay.textContent;
  let endTime =
    endDisplay.textContent === "End Time" ? "" : endDisplay.textContent;

  const tasksObj = {
    id: Date.now(),
    title: title,
    description: description,
    category: category,
    priority: priority,
    completed: false,
    dateCreated: date,
    timeStart: startTime,
    timeEnd: endTime,
  };

  formedTasks.push(tasksObj);
  storageTask.push(tasksObj);

  localStorage.setItem("tasks", JSON.stringify(storageTask));

  console.log("inside the form task:", storageTask);

  renderTasks(storageTask);

  updateTaskCounters(storageTask);

  document.querySelector(".form-container").classList.remove("display");
  document.querySelector(".app-container").classList.remove("modal-open");

  // titleFormEl.value = "";
  // descriptionFormEl.value = "";
  // allSelects[0].textContent = "Select Category";
  // allSelects[1].textContent = "Select Priority";
  // dateDisplay.textContent = "Select Date";
  // startDisplay.textContent = "Start Time";
  // endDisplay.textContent = "End Time";
});
