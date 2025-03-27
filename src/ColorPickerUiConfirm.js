import { html, LitElement } from 'lit';

import { createCustomEvent } from './helpers';

// ---

/**
 * A custom element that provides a confirm dialog.
 *
 * @class
 * @extends {LitElement}
 *
 * @property {string} text - The text to display in the dialog.
 *
 * @fires continue - Dispatched when the user clicks the "Continue" button or presses the "Enter" key.
 * @fires cancel - Dispatched when the user clicks the "Cancel" button or presses the "Escape" key.
 */
export class ColorPickerUiConfirm extends LitElement {
  static properties = {
    text: { type: String },
  };

  constructor() {
    super();

    this.text = '';

    this._handleKeyUp = this.#handleKeyUp.bind(this);
  }

  // --- private methods ---

  #handleKeyUp(event) {
    switch (event.key) {
      case 'Escape':
        this.#onCancel();
        break;
      case 'Enter':
        this.#onContinue();
        break;
    }
  }

  #handleCancelClick(event) {
    this.#onCancel();
  }

  #handleContinueClick(event) {
    this.#onContinue();
  }

  #onContinue() {
    const event = createCustomEvent('continue', undefined, { bubbles: false });

    this.dispatchEvent(event);
  }

  #onCancel() {
    const event = createCustomEvent('cancel', undefined, { bubbles: false });

    this.dispatchEvent(event);
  }

  // --- lifecycle ---

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('keyup', this._handleKeyUp);
  }

  disconnectedCallback() {
    window.removeEventListener('keyup', this._handleKeyUp);
    super.disconnectedCallback();
  }

    // --- render

  render() {
    return html`
      <color-picker-ui-dialog>
        <div slot="text">${this.text}</div>
        <div slot="actions">
          <color-picker-ui-button @click=${this.#handleCancelClick}>Cancel</color-picker-ui-button>
          <color-picker-ui-button @click=${this.#handleContinueClick}>Continue</color-picker-ui-button>
        </div>
      </color-picker-ui-dialog>
    `;
  }
}
