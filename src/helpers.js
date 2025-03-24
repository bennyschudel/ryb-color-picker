/**
 * Creates a custom event with the specified name, detail, and options.
 *
 * @param {string} name - The name of the custom event.
 * @param {any} detail - The detail data to be included in the event.
 * @param {Object} [options] - Optional settings for the event.
 * @param {boolean} [options.bubbles=true] - A boolean indicating whether the event bubbles up through the DOM or not.
 * @param {boolean} [options.composed=true] - A boolean indicating whether the event will trigger listeners outside of a shadow root.
 * @param {boolean} [options.cancelable=true] - A boolean indicating whether the event is cancelable.
 * @returns {CustomEvent} The newly created custom event.
 */
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

/**
 * Returns the default color cube for the RYB color picker.
 * The cube is represented as an array of RGB color arrays.
 * Each inner array contains three numbers representing the red, green, and blue components of a color.
 *
 * @returns {number[][]} An array of RGB color arrays.
 */
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

/**
 * Creates an alert dialog and returns a promise that resolves when the alert is acknowledged.
 *
 * @param {string} text - The text to display in the alert dialog.
 * @returns {Promise<void>} A promise that resolves when the alert is acknowledged.
 */
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

/**
 * Creates a confirmation dialog and returns a promise that resolves or rejects based on user action.
 *
 * @param {string} text - The text to display in the confirmation dialog.
 * @returns {Promise<void>} A promise that resolves if the user continues, and rejects if the user cancels.
 */
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

/**
 * Creates a prompt dialog and returns a promise that resolves or rejects based on user interaction.
 *
 * @param {string} text - The text to display in the prompt dialog.
 * @returns {Promise<string>} A promise that resolves with the user's input or rejects if the prompt is canceled.
 */
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

/**
 * Creates a dialog of the specified type with the given text.
 *
 * @param {'alert'|'confirm'|'prompt'} type - The type of dialog to create. Can be 'alert', 'confirm', or 'prompt'.
 * @param {string} text - The text to display in the dialog.
 * @returns {Promise<void|string>} A promise that resolves with void for 'alert' and 'confirm', or with a string for 'prompt'.
 */
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
