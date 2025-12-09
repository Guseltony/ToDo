export function setupPicker(inputId, displayId) {
  inputId.showPicker();

  inputId.addEventListener("change", () => {
    displayId.textContent = inputId.value;
  });
}
