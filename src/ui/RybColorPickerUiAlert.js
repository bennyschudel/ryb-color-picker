import { html, LitElement } from 'lit';

import { createCustomEvent } from '../helpers';

// ---

export class RybColorPickerUiAlert extends LitElement {
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
      case 'Enter':
        this.#onOk();
        break;
    }
  }

  #handleOkClick() {
    this.#onOk();
  }

  #onOk() {
    const event = createCustomEvent('ok', undefined, { bubbles: false });

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
        <div slot="text">${this.text}</div>
        <div slot="actions">
          <ryb-color-picker-ui-button @click=${this.#handleOkClick}
            >Ok</ryb-color-picker-ui-button
          >
        </div>
      </ryb-color-picker-ui-dialog>
    `;
  }
}
