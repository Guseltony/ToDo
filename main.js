const tabs = ["all", "completed", "pending", "due"];

const taskTabs = document.querySelector(".task-tab");
const taskContainer = document.querySelector(".tasks");

tabs.map((t, index) => {
  const tab = document.createElement("div");
  const tabName = document.createElement("p");
  tabName.textContent = t;
  tab.classList.add("tab");
  tab.appendChild(tabName);
  taskTabs.appendChild(tab);
});

// ! called the tasks api.

let uncheckedEl;

function listTasks() {
  todos.map((todo) => {
    const taskEl = document.createElement("div");
    taskEl.classList.add("task");
    if (todo.completed)
      taskEl.style.backgroundColor = tabsColors.dark.completed;
    else taskEl.style.backgroundColor = tabsColors.dark.pending;

    const titleContainer = document.createElement("div");
    const title = document.createElement("h1");
    const check = document.createElement("span");
    check.classList.add("checkEl");
    if (!todo.completed) check.dataset.id = todo.id;
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
}
listTasks();

uncheckedEl = document.querySelectorAll(".checkEl");

function checkTask(id) {
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id === id) {
      todos[i].completed = true;
      break;
    }
  }
  // re-render: clear container and call listTasks again
  taskContainer.innerHTML = "";
  listTasks();

  // re-query checks and re-attach listeners (because DOM changed)
  uncheckedEl = document.querySelectorAll(".checkEl");
  uncheckedEl.forEach((el) => {
    el.addEventListener("click", () => {
      const id = Number(el.dataset.id);
      checkTask(id);
    });
  });
}

// after you set uncheckedEl (querySelectorAll), attach listeners like this:
uncheckedEl.forEach((el) => {
  el.addEventListener("click", () => {
    const id = Number(el.dataset.id); // convert to number if your todo ids are numbers
    checkTask(id);
  });
});


