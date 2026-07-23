export function cursorEnter(label?: string) {
  window.dispatchEvent(new CustomEvent("cursor:enter", { detail: { label } }));
}

export function cursorLeave() {
  window.dispatchEvent(new CustomEvent("cursor:leave"));
}
