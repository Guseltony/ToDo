const formEl = document.getElementById("form");

const allSelects = document.querySelectorAll(".select-display");

const titleFormEl = document.querySelector(".task-input");

const descriptionFormEl = document.querySelector(".field textarea");

const dateDisplay = document.getElementById("dateDisplay");

const startDisplay = document.getElementById("startTimeDisplay");

const endDisplay = document.getElementById("endTimeDisplay");

let formValue = {};

function readFormValues() {
  formEl.addEventListener("submit", (e) => {
    e.preventDefault();

    let title = titleFormEl.value;
    let description = descriptionFormEl.value;

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

    formValue = {
      title: title,
      description: description,
      category: category,
      priority: priority,
      date: date,
      startTime: startTime,
      endTime: endTime,
    };
  });

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
  return (tasksObj = {
    id: Date.now(),
    title: formValue.title,
    description: formValue.description,
    category: formValue.category,
    priority: formValue.priority,
    completed: false,
    dateCreated: formValue.date,
    timeStart: formValue.startTime,
    timeEnd: formValue.endTime,
  });
}
