import { html, LitElement } from 'lit';

import { createCustomEvent } from '../helpers';

// ---

export class RybColorPickerUiConfirm extends LitElement {
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

  #handleCancelClick() {
    this.#onCancel();
  }

  #handleContinueClick() {
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
      <ryb-color-picker-ui-dialog>
        <div slot="text">${this.text}</div>
        <div slot="actions">
          <ryb-color-picker-ui-button @click=${this.#handleCancelClick}
            >Cancel</ryb-color-picker-ui-button
          >
          <ryb-color-picker-ui-button @click=${this.#handleContinueClick}
            >Continue</ryb-color-picker-ui-button
          >
        </div>
      </ryb-color-picker-ui-dialog>
    `;
  }
}
