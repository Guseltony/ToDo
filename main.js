// import { todos } from "./js/tasksapi";

import { todos } from "./js/tasksapi.js";
// import { taskCard } from "./js/taskCard.js";
import { tabEl } from "./js/tabs.js";
import { fetchFromLocaleStorage } from "./js/localStorage.js";
import { renderTasks } from "./js/renderTasks.js";

const taskContainer = document.querySelector(".tasks");

const showTaskFormBtn = document.querySelector(".add-btn");

export let storageTask = fetchFromLocaleStorage() || [];
export let activeTab;

console.log("freshly:", storageTask);
console.log("freshly:");
// fetchFromLocaleStorage(storageTask);

function createTaskTab() {
  tabEl();
  getTasksLength();
}

createTaskTab();

const allTabs = document.querySelectorAll(".tab");

let todosCopy = [...todos];

// ! localStorage function

export function filterTodos(name) {
  let tasks = [...storageTask];

  switch (name) {
    case "completed":
      tasks = tasks.filter((t) => t.completed);
      activeTab = "completed";
      taskContainer.innerHTML = "";
      // renderTasks();
      break;

    case "pending":
      tasks = tasks.filter((t) => !t.completed);
      activeTab = "pending";
      taskContainer.innerHTML = "";
      // renderTasks();
      break;

    case "due":
      tasks = tasks.filter((t) => t.due);
      taskContainer.innerHTML = "";
      // renderTasks();
      break;

    case "all":
      tasks = tasks;
      activeTab = "all";
      taskContainer.innerHTML = "";
      // renderTasks();
      break;

    // default:
    //   break;
  }
  console.log(todosCopy);

  return renderTasks(tasks);
}

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

// getting the number of all tasks, completed task and pending task
export function getTasksLength() {
  console.log("setting the length");
  console.log("from local storage:", storageTask);
  const all = document.querySelector(".all");
  const completed = document.querySelector(".completed");
  const pending = document.querySelector(".pending");

  const allLength = storageTask.length;
  all.textContent = allLength ? allLength : "0";
  const completedTaskArray = storageTask.filter((t) => t.completed);
  const completedTaskLength = completedTaskArray.length;
  completed.textContent = completedTaskLength ? completedTaskLength : "0";
  const pendingTaskArray = storageTask.filter((t) => !t.completed);
  const pendingTaskLength = pendingTaskArray.length;
  pending.textContent = pendingTaskLength ? pendingTaskLength : "0";
}

// ! called the tasks api.

let uncheckedEl;

console.log(todosCopy);

// renderTasks(todosCopy);

// * save to local storage

// localStorage.setItem('tasks', JSON.stringify(todosCopy))

uncheckedEl = document.querySelectorAll(".checkEl");

// export function checkTask(id) {
//   // console.log(todosCopy);
//   console.log("checking");
//   for (let i = 0; i < storageTask.length; i++) {
//     if (storageTask[i].id === id) {
//       storageTask[i].completed = true;
//       break;
//     }
//   }
//   // re-render: clear container and call renderTasks again
//   taskContainer.innerHTML = "";
//   console.log("storageTask:", storageTask);

//   if (activeTab === "pending") filterTodos("pending");
//   else renderTasks(storageTask);

//   localStorage.setItem("tasks", JSON.stringify(storageTask));
//   getTasksLength();

//   // re-query checks and re-attach listeners (because DOM changed)
//   uncheckedEl = document.querySelectorAll(".checkEl");
//   uncheckedEl.forEach((el) => {
//     el.addEventListener("click", () => {
//       const id = Number(el.dataset.id);
//       checkTask(id);
//     });
//   });
// }

// after you set uncheckedEl (querySelectorAll), attach listeners like this:
// uncheckedEl.forEach((el) => {
//   el.addEventListener("click", () => {
//     const id = Number(el.dataset.id); // convert to number if your todo ids are numbers
//     checkTask(id);
//   });
// });

// tabs functionality

const formedTasks = [];

// * showing task form

showTaskFormBtn.addEventListener("click", () => {
  document.querySelector(".form-container").classList.add("display");

  document.querySelector(".app-container").classList.add("modal-open");
});

document.querySelector(".close-task-form").addEventListener("click", () => {
  document.querySelector(".form-container").classList.remove("display");

  document.querySelector(".app-container").classList.remove("modal-open");
});

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

  getTasksLength();

  document.querySelector(".form-container").classList.remove("display");
  document.querySelector(".app-container").classList.remove("modal-open");

  console.log(tasksObj);
  console.log(formedTasks);

  titleFormEl.value = "";
  descriptionFormEl.value = "";
  allSelects[0].textContent = "Select Category";
  allSelects[1].textContent = "Select Priority";
  dateDisplay.textContent = "Select Date";
  startDisplay.textContent = "Start Time";
  endDisplay.textContent = "End Time";
});
