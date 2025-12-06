import { createElement } from "./element.js";

const tabs = ["all", "completed", "pending", "due"];

const taskTabs = document.querySelector(".task-tab");

export function tabEl() {
  tabs.map((t, index) => {
    const tabName = createElement("p", "", t);
    const quantity = createElement("span", t, "0");
    const tab = createElement("div", "tab", "", [tabName, quantity]);
    tab.dataset.name = t;
    if (t === "all") {
      tab.classList.add("active");
    }

    taskTabs.appendChild(tab);
  });
}
