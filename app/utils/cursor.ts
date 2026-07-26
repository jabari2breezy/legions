export function cursorEnter(label: string, mode: "hover" | "wheel" | "project" = "hover") {
  window.dispatchEvent(new CustomEvent("cursor:enter", { detail: { label, mode } }));
}

export function cursorLeave() {
  window.dispatchEvent(new CustomEvent("cursor:leave"));
}
