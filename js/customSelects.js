export function initCustomSelects(select) {
  const display = select.querySelector(".select-display");
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
}
