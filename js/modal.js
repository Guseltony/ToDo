const formContainer = document.querySelector(".form-container");
const appContainer = document.querySelector(".app-container");

// export function openFormModal() {
//   formContainer.classList.add("display");
//   appContainer.classList.add("modal-open");
// }

// export function closeFormModal() {
//   formContainer.classList.remove("display");
//   appContainer.classList.remove("modal-open");
// }

export function toggleModal(action) {
  if (action === "open") {
    formContainer.classList.add("display");
    appContainer.classList.add("modal-open");
  } else {
    formContainer.classList.remove("display");
    appContainer.classList.remove("modal-open");
  }
}
