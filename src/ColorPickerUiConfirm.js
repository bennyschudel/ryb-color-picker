import { html, css, LitElement } from 'lit';
import { ref, createRef } from 'lit/directives/ref.js';

import { createCustomEvent } from './helpers';

// ---

export class ColorPickerUiConfirm extends LitElement {
  rootEl = createRef();

  static properties = {
    text: { type: String },
  };

  constructor() {
    super();

    this.text = '';

    this._handleKeyUp = this.#handleKeyUp.bind(this);
  }

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
    super.disconnectedCallback();
    window.removeEventListener('keyup', this._handleKeyUp);
  }

  render() {
    return html`
      <div
        ${ref(this.rootEl)}
        class="body"
      >
        <h2 class="text">${this.text}</h2>
        </color-picker-ui-field>
        <div class="actions">
          <color-picker-ui-button @click=${this.#handleCancelClick}>Cancel</color-picker-ui-button>
          <color-picker-ui-button @click=${this.#handleContinueClick}>Continue</color-picker-ui-button>
        </div>
      </div>
    `;
  }

  static styles = css`
    :host {
      --_font-family--text: var(--font-family--text, Arial, Helvetica, sans-serif);
      --_max-width: var(--max-width, 320px);
      --_min-width: var(--min-width, 240px);
      --_z-index: var(--z-index, 1000);

      align-items: center;
      background-color: hsla(0, 0%, 0%, 0.2);
      border-radius: 0.5rem;
      display: flex;
      inset: 0;
      justify-content: center;
      padding: 2rem;
      position: absolute;
      z-index: var(--_z-index);
    }

    .body {
      align-items: stretch;
      background-color: #404040;
      border-radius: 0.5rem;
      display: inline-flex;
      flex-direction: column;
      gap: 0.5rem;
      justify-content: stretch;
      max-width: var(--_max-width);
      min-width: var(--_min-width);
      padding: 1rem;
    }

    .text {
      color: #ffffff;
      font-family: var(--_font-family--text);
      font-size: 0.875rem;
      font-weight: normal;
      line-height: 1.5;
      margin: 0;
    }

    .actions {
      display: flex;
      gap: 0.25rem;
      justify-content: flex-end;
    }
  `;
}
