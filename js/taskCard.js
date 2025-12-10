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
  const priorityStyle = priorityColors[todo.priority.toLowerCase()];
  priorityEl.style.color = priorityStyle.text;
  priorityEl.style.backgroundColor = priorityStyle.bg;
  const priority = createElement("p", "", "Priority:", [priorityEl]);
  priority.style.fontSize = "14px";

  const categoryEl = createElement("span", "category");
  const categoryStyle = categoryColors[todo.category.toLowerCase()];
  categoryEl.style.color = categoryStyle?.text;
  categoryEl.style.background = categoryStyle?.bg;
  categoryEl.textContent = `${todo.category}`;
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

  return taskEl;
}
