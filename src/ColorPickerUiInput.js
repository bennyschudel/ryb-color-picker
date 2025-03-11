import { html, css, LitElement } from 'lit';
import { ref, createRef } from 'lit/directives/ref.js';

import { createCustomEvent } from './helpers';

// ---

export class ColorPickerUiInput extends LitElement {
  rootEl = createRef();
  inputEl = createRef();

  static properties = {
    autofocus: { type: Boolean },
    value: { type: String },
    disabled: { type: Boolean },
    readonly: { type: Boolean },
  };

  constructor() {
    super();
  }

  #emitValueUpdate(value) {
    const event = createCustomEvent('update:value', { value }, { bubbles: false });

    this.dispatchEvent(event);
  }

  #handleInputChange(event) {
    const { value } = event.target;

    this.setValue(value);
  }

  setValue(value) {
    this.#emitValueUpdate(value);
  }

  clear() {
    this.setValue('');
  }

  firstUpdated(props) {
    if (props.has('autofocus')) {
      if (this.autofocus) {
        this.inputEl.value.focus();
      }
    }
  }

  updated(props) {
    if (props.has('value') && this.inputEl.value) {
      this.inputEl.value.value = this.value;
    }
  }

  render() {
    return html`
      <div
        ${ref(this.rootEl)}
        class="body"
      >
        <input
          ${ref(this.inputEl)}
          part="input"
          type="text"
          ?disabled=${this.disabled}
          ?readonly=${this.readonly}
          @change=${this.#handleInputChange}
        />
      </div>
    `;
  }

  static styles = css`
   .body {
      display: flex;
    }

    input {
      background-color: white;
      height: 1rem;
      padding: 0.25rem;
      border: none;
      border-radius: 0.125rem;
      flex: 1 1 auto;
      width: 100%;
    }
  `;
}
