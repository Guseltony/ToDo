export function createElement(tag, className, text, children) {
  const element = document.createElement(tag);
  if (className) element.classList.add(className);
  if (text) element.textContent = text;
  if (children) {
    children.forEach((child) => {
      element.appendChild(child);
    });
  }

  return element;
}
