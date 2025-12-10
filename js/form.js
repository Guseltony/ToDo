import { storageTask } from "../main.js";
import { saveTasks } from "./localStorage.js";
import { toggleModal } from "./modal.js";
import { renderTasks } from "./renderTasks.js";
import { updateTaskCounters } from "./taskCount.js";

const allSelects = document.querySelectorAll(".select-display");

const titleFormEl = document.querySelector(".task-input");

const descriptionFormEl = document.querySelector(".field textarea");

const dateDisplay = document.getElementById("dateDisplay");

const startDisplay = document.getElementById("startTimeDisplay");

const endDisplay = document.getElementById("endTimeDisplay");

let formValue = {};

function readFormValues(e) {
  e.preventDefault();

  formValue = {
    title: titleFormEl.value,
    description: descriptionFormEl.value,
    category:
      allSelects[0].textContent === "Select Category"
        ? ""
        : allSelects[0].textContent,
    priority:
      allSelects[1].textContent === "Select Priority"
        ? ""
        : allSelects[1].textContent,
    date:
      dateDisplay.textContent === "Select Date" ? "" : dateDisplay.textContent,
    startTime:
      startDisplay.textContent === "Start Time" ? "" : startDisplay.textContent,
    endTime:
      endDisplay.textContent === "End Time" ? "" : endDisplay.textContent,
  };

  resetForm();
}

function resetForm() {
  titleFormEl.value = "";
  descriptionFormEl.value = "";
  allSelects[0].textContent = "Select Category";
  allSelects[1].textContent = "Select Priority";
  dateDisplay.textContent = "Select Date";
  startDisplay.textContent = "Start Time";
  endDisplay.textContent = "End Time";
}

function createTaskObject(formValue) {
  return {
    id: Date.now(),
    title: formValue.title,
    description: formValue.description,
    category: formValue.category,
    priority: formValue.priority,
    completed: false,
    dateCreated: formValue.date,
    timeStart: formValue.startTime,
    timeEnd: formValue.endTime,
  };
}

export function taskSubmission(e) {
  readFormValues(e);
  const newTask = createTaskObject(formValue);
  storageTask.push(newTask);
  saveTasks(storageTask);
  renderTasks(storageTask);
  updateTaskCounters(storageTask);
  toggleModal("close");
}
