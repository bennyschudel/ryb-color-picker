export function createCustomEvent(
  name,
  detail,
  options = {
    bubbles: true,
    composed: true,
    cancelable: true,
  },
) {
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

export function createAlert(text) {
  return new Promise((resolve, reject) => {
    const { _dialogs } = this;
    const nextIndex = _dialogs.length;

    const remove = () => {
      this._dialogs = _dialogs.filter((d, i) => i !== nextIndex);
    };

    const item = {
      type: 'alert',
      text,
      onOk() {
        remove();
        resolve();
      },
    };

    this._dialogs = [..._dialogs, item];
  });
}

export function createConfirm(text) {
  return new Promise((resolve, reject) => {
    const { _dialogs } = this;
    const nextIndex = _dialogs.length;

    const remove = () => {
      this._dialogs = _dialogs.filter((d, i) => i !== nextIndex);
    };

    const item = {
      type: 'confirm',
      text,
      onCancel() {
        remove();
        reject();
      },
      onContinue() {
        remove();
        resolve();
      },
    };

    this._dialogs = [..._dialogs, item];
  });
}

export function createPrompt(text) {
  return new Promise((resolve, reject) => {
    const { _dialogs } = this;
    const nextIndex = _dialogs.length;

    const remove = () => {
      this._dialogs = _dialogs.filter((d, i) => i !== nextIndex);
    };

    const item = {
      type: 'prompt',
      text,
      onCancel() {
        remove();
        reject();
      },
      onContinue(event) {
        remove();
        resolve(event.detail.value);
      },
    };

    this._dialogs = [..._dialogs, item];
  });
}

export function createDialog(type, text) {
  switch (type) {
    case 'alert':
      return createAlert.call(this, text);
    case 'confirm':
      return createConfirm.call(this, text);
    case 'prompt':
      return createPrompt.call(this, text);
  }
}
