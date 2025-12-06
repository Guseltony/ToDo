import { attachCheckListeners } from "./checkFunction.js";
import { tabsColors, priorityColors, categoryColors } from "./colors.js";
import { createElement } from "./element.js";

export function taskCard(todo) {
  const title = createElement("h1", "", todo.title);
  const check = createElement("span", "checkEl");

  const titleContainer = createElement("div", "task-title", "", [check, title]);

  check.dataset.id = todo.id;
  const completedTask = todo.completed
    ? '<i class="fa-solid fa-circle-check"></i>'
    : '<i class="fa-regular fa-circle unchecked"></i>';
  check.innerHTML = completedTask;
  check.style.color = "#059669";
  title.textContent = todo.title;

  const description = createElement("p", "", todo.description);

  description.style.fontSize = "14px";
  const editBtn = createElement("span");

  editBtn.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
  editBtn.querySelector("i").style.color = "#ef4444";

  const descriptionBox = createElement("div", "desc", "", [
    description,
    editBtn,
  ]);

  const priorityEl = createElement("span", "priority", todo.priority);
  if (todo.priority.toLowerCase() === "high") {
    priorityEl.style.color = priorityColors.high.text;
    priorityEl.style.backgroundColor = priorityColors.high.bg;
  } else if (todo.priority.toLowerCase() === "medium") {
    priorityEl.style.color = priorityColors.medium.text;
    priorityEl.style.backgroundColor = priorityColors.medium.bg;
  } else {
    priorityEl.style.color = priorityColors.low.text;
    priorityEl.style.backgroundColor = priorityColors.low.bg;
  }
  const priority = createElement("p", "", "Priority:", [priorityEl]);
  priority.style.fontSize = "14px";

  const categoryEl = createElement("span", "category");
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
  const category = createElement("p", "", "Category:", [categoryEl]);
  category.style.fontSize = "14px";

  const time = createElement("p", "", "10AM - 11AM");
  time.style.color = "#fff";
  const timeFrame = createElement("div", "time-frame", "", [time]);

  const taskEl = createElement("div", "task", "", [
    titleContainer,
    descriptionBox,
    category,
    priority,
    timeFrame,
  ]);

  if (todo.completed) taskEl.style.backgroundColor = tabsColors.dark.completed;
  else taskEl.style.backgroundColor = tabsColors.dark.pending;

  attachCheckListeners();

  return taskEl;
}
