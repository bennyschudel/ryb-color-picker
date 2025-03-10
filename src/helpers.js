export function createCustomEvent(name, detail, options = {
  bubbles: true,
  composed: true,
  cancelable: true,
}) {
  return new CustomEvent(name, {
    detail: window.structuredClone(detail),
    ...options,
  });
}

export function getDefaultCube() {
  return [
    [1, 1, 1],
    [1, 0, 0],
    [1, 1, 0],
    [1, 0.5, 0],
    [0, 0, 1],
    [0.5, 0, 1],
    [0, 1, 0],
    [0, 0, 0],
  ];
}
