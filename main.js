const tabs = ["all", "completed", "pending", "due"];

const taskTabs = document.querySelector(".task-tab");
const taskContainer = document.querySelector(".tasks");


let storageTask;
let activeTab;

fetchFromLocaleStorage();

function createTaskTab() {
  tabs.map((t, index) => {
    const tab = document.createElement("div");
    tab.dataset.name = t;
    const tabName = document.createElement("p");
    if (t === "all") {
      tab.classList.add("active");
    }
    const quantity = document.createElement("span");
    quantity.classList.add(t);
    quantity.textContent = "0";
    tabName.textContent = t;
    tab.classList.add("tab");
    tab.appendChild(tabName);
    tab.appendChild(quantity);
    taskTabs.appendChild(tab);
  });

  getTasksLength();
}

createTaskTab();

const allTabs = document.querySelectorAll(".tab");

let todosCopy = [...todos];

// ! localStorage function

function fetchFromLocaleStorage() {
  // taking from the localStorage
  console.log("from local storage");
  storageTask = JSON.parse(localStorage.getItem("tasks")) || [];

  if (storageTask.length === 0) {
    storageTask = [...todos];
    localStorage.setItem("tasks", JSON.stringify(storageTask));
  }

  listTasks(storageTask);
  console.log("from local storage:", storageTask);
  // getTasksLength();
}

function filterTodos(name) {
  let tasks = [...storageTask];

  switch (name) {
    case "completed":
      tasks = tasks.filter((t) => t.completed);
      activeTab = "completed";
      taskContainer.innerHTML = "";
      // listTasks();
      break;

    case "pending":
      tasks = tasks.filter((t) => !t.completed);
      activeTab = "pending";
      taskContainer.innerHTML = "";
      // listTasks();
      break;

    case "due":
      tasks = tasks.filter((t) => t.due);
      taskContainer.innerHTML = "";
      // listTasks();
      break;

    case "all":
      tasks = tasks;
      activeTab = "all";
      taskContainer.innerHTML = "";
      // listTasks();
      break;

    // default:
    //   break;
  }
  console.log(todosCopy);

  return listTasks(tasks);
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
function getTasksLength() {
  console.log("setting the length");
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

function listTasks(tasks) {
  taskContainer.innerHTML = "";

  tasks.map((todo) => {
    const taskEl = document.createElement("div");
    taskEl.classList.add("task");
    if (todo.completed)
      taskEl.style.backgroundColor = tabsColors.dark.completed;
    else taskEl.style.backgroundColor = tabsColors.dark.pending;

    const titleContainer = document.createElement("div");
    const title = document.createElement("h1");
    const check = document.createElement("span");
    check.classList.add("checkEl");
    // if (!todo.completed)
    check.dataset.id = todo.id;
    const completedTask = todo.completed
      ? '<i class="fa-solid fa-circle-check"></i>'
      : '<i class="fa-regular fa-circle unchecked"></i>';
    check.innerHTML = completedTask;
    check.style.color = "#059669";
    title.textContent = todo.title;
    titleContainer.classList.add("task-title");
    titleContainer.appendChild(check);
    titleContainer.appendChild(title);
    taskEl.appendChild(titleContainer);

    const descriptionBox = document.createElement("div");
    const description = document.createElement("p");
    description.style.fontSize = "14px";
    description.textContent = todo.description;
    const editBtn = document.createElement("span");
    editBtn.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
    editBtn.querySelector("i").style.color = "#ef4444";
    descriptionBox.classList.add("desc");
    descriptionBox.appendChild(description);
    descriptionBox.appendChild(editBtn);
    taskEl.appendChild(descriptionBox);

    const priority = document.createElement("p");
    priority.textContent = "Priority:";
    priority.style.fontSize = "14px";
    const priorityEl = document.createElement("span");
    priorityEl.classList.add("priority");
    priorityEl.textContent = `${todo.priority}`;
    if (todo.priority === "high") {
      priorityEl.style.color = priorityColors.high.text;
      priorityEl.style.backgroundColor = priorityColors.high.bg;
    } else if (todo.priority === "medium") {
      priorityEl.style.color = priorityColors.medium.text;
      priorityEl.style.backgroundColor = priorityColors.medium.bg;
    } else {
      priorityEl.style.color = priorityColors.low.text;
      priorityEl.style.backgroundColor = priorityColors.low.bg;
    }
    priority.appendChild(priorityEl);
    taskEl.appendChild(priority);

    const category = document.createElement("p");
    category.textContent = `Category: `;
    category.style.fontSize = "14px";
    const categoryEl = document.createElement("span");
    categoryEl.classList.add("category");
    categoryEl.textContent = `${todo.category}`;
    if (todo.category === "Work") {
      categoryEl.style.color = categoryColors.work.text;
      categoryEl.style.backgroundColor = categoryColors.work.bg;
    } else if (todo.category === "School") {
      categoryEl.style.color = categoryColors.school.text;
      categoryEl.style.backgroundColor = categoryColors.school.bg;
    } else if (todo.category === "Personal") {
      categoryEl.style.color = categoryColors.personal.text;
      categoryEl.style.backgroundColor = categoryColors.personal.bg;
    } else if (todo.category === "Finance") {
      categoryEl.style.color = categoryColors.finance.text;
      categoryEl.style.backgroundColor = categoryColors.finance.bg;
    } else if (todo.category === "Health") {
      categoryEl.style.color = categoryColors.health.text;
      categoryEl.style.backgroundColor = categoryColors.health.bg;
    } else {
      categoryEl.style.color = categoryColors.misc.text;
      categoryEl.style.backgroundColor = categoryColors.misc.bg;
    }
    category.appendChild(categoryEl);
    taskEl.appendChild(category);

    const timeFrame = document.createElement("div");
    timeFrame.classList.add("time-frame");
    const time = document.createElement("p");
    time.textContent = "10AM - 11AM";
    time.style.color = "#fff";
    timeFrame.appendChild(time);
    taskEl.appendChild(timeFrame);

    taskContainer.appendChild(taskEl);
  });

  attachCheckListeners();
}
// listTasks(todosCopy);

// * save to local storage

// localStorage.setItem('tasks', JSON.stringify(todosCopy))

uncheckedEl = document.querySelectorAll(".checkEl");

function checkTask(id) {
  // console.log(todosCopy);
  console.log("checking");
  for (let i = 0; i < storageTask.length; i++) {
    if (storageTask[i].id === id) {
      storageTask[i].completed = true;
      break;
    }
  }
  // re-render: clear container and call listTasks again
  taskContainer.innerHTML = "";
  console.log("storageTask:", storageTask);

  if (activeTab === "pending") filterTodos("pending");
  else listTasks(storageTask);

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


function attachCheckListeners() {
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


// after you set uncheckedEl (querySelectorAll), attach listeners like this:
// uncheckedEl.forEach((el) => {
//   el.addEventListener("click", () => {
//     const id = Number(el.dataset.id); // convert to number if your todo ids are numbers
//     checkTask(id);
//   });
// });


// tabs functionality




