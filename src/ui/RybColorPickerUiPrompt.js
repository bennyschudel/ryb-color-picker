import { html, css, LitElement } from 'lit';

import { createCustomEvent } from '../helpers';

// ---

/**
 * A custom element that provides a prompt for input.
 *
 * @class
 * @extends {LitElement}
 *
 * @property {string} text - The text to display in the prompt.
 * @property {string} value - The current value of the prompt input.
 *
 * @fires continue - Dispatched when the user clicks the "Continue" button or presses the "Enter" key.
 * @fires cancel - Dispatched when the user clicks the "Cancel" button or presses the "Escape" key.
 */
export class RybColorPickerUiPrompt extends LitElement {
  static properties = {
    text: { type: String },
    value: { type: String },
  };

  constructor() {
    super();

    this.text = '';
    this.value = '';

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

  #handleValueUpdate(event) {
    this.value = event.detail.value;
  }

  #onContinue() {
    const { value } = this;

    if (!value) return;

    const event = createCustomEvent('continue', { value }, { bubbles: false });

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
    super.disconnectedCallback();
    window.removeEventListener('keyup', this._handleKeyUp);
  }

  // --- render

  render() {
    return html`
      <ryb-color-picker-ui-dialog>
        <div slot="text" class="text">
          <div>${this.text}</div>
          <ryb-color-picker-ui-field>
            <ryb-color-picker-ui-input
              autofocus
              value=${this.value}
              @update:value=${this.#handleValueUpdate}
            ></ryb-color-picker-ui-input>
          </ryb-color-picker-ui-field>
        </div>
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

  // --- styles ---

  static styles = css`
    .text {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
  `;
}
