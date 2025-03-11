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

export function createPrompt(text) {
  return new Promise((resolve, reject) => {
    const { _prompts } = this;
    const nextIndex = _prompts.length;

    const remove = () => {
      this._prompts = _prompts.filter((d, i) => i !== nextIndex);
    };

    const item = {
      text,
      onCancel() {
        remove();
        reject();
      },
      onContinue(event) {
        remove();
        resolve(event.detail.value);
      }
    };

    this._prompts = [..._prompts, item];
  });
}

export function createAlert(text) {
  return new Promise((resolve, reject) => {
    const { _alerts } = this;
    const nextIndex = _alerts.length;

    const remove = () => {
      this._alerts = _alerts.filter((d, i) => i !== nextIndex);
    };

    const item = {
      text,
      onOk(event) {
        remove();
        resolve();
      }
    };

    this._alerts = [..._alerts, item];
  });
}
