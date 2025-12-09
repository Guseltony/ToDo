// import { todos } from "./js/tasksapi";

import { todos } from "./js/tasksapi.js";
// import { taskCard } from "./js/taskCard.js";
import { tabEl } from "./js/tabs.js";
import { fetchFromLocaleStorage } from "./js/localStorage.js";
import { renderTasks } from "./js/renderTasks.js";
import { updateTaskCounters } from "./js/taskCount.js";
import { filterTodos } from "./js/filters.js";
import { toggleModal } from "./js/modal.js";

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


// showTaskFormBtn.addEventListener("click", openFormModal);
// closeTaskFormBtn.addEventListener("click", closeFormModal);

document.querySelectorAll(".custom-select").forEach((select) => {
  const display = select.querySelector(".select-display");
  const optionsContainer = select.querySelector(".select-options");
  const options = select.querySelectorAll(".option");

  // Toggle dropdown
  display.addEventListener("click", () => {
    select.classList.toggle("open");
  });

  // Select option
  options.forEach((option) => {
    option.addEventListener("click", () => {
      display.textContent = option.textContent;
      display.dataset.value = option.dataset.value;
      select.classList.remove("open");
    });
  });
});

// Close dropdown when clicking outside
document.addEventListener("click", (e) => {
  document.querySelectorAll(".custom-select").forEach((select) => {
    if (!select.contains(e.target)) {
      select.classList.remove("open");
    }
  });
});

// DATE PICKER
const dateInput = document.getElementById("taskDate");
const dateDisplay = document.getElementById("dateDisplay");

dateDisplay.addEventListener("click", () => dateInput.showPicker());

dateInput.addEventListener("change", () => {
  dateDisplay.textContent = dateInput.value;
  console.log(dateInput.value);
  console.log(new Date(dateInput.value).getDay());
});

// START TIME
const startInput = document.getElementById("startTime");
const startDisplay = document.getElementById("startTimeDisplay");

startDisplay.addEventListener("click", () => startInput.showPicker());

startInput.addEventListener("change", () => {
  startDisplay.textContent = startInput.value;
});

// END TIME
const endInput = document.getElementById("endTime");
const endDisplay = document.getElementById("endTimeDisplay");

endDisplay.addEventListener("click", () => endInput.showPicker());

endInput.addEventListener("change", () => {
  endDisplay.textContent = endInput.value;
});

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

  titleFormEl.value = "";
  descriptionFormEl.value = "";
  allSelects[0].textContent = "Select Category";
  allSelects[1].textContent = "Select Priority";
  dateDisplay.textContent = "Select Date";
  startDisplay.textContent = "Start Time";
  endDisplay.textContent = "End Time";
});
