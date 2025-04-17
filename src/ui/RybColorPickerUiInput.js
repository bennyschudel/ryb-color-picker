import { html, css, LitElement } from 'lit';
import { ref, createRef } from 'lit/directives/ref.js';

import { createCustomEvent } from '../helpers';

// ---

export class RybColorPickerUiInput extends LitElement {
  rootEl = createRef();
  inputEl = createRef();

  static properties = {
    value: { type: String },
    autofocus: { type: Boolean },
    disabled: { type: Boolean },
    readonly: { type: Boolean },
  };

  constructor() {
    super();

    this.autofocus = false;
    this.disabled = false;
    this.readonly = false;
  }

  // --- private methods ---

  #emitValueUpdate(value) {
    const event = createCustomEvent(
      'update:value',
      { value },
      { bubbles: false },
    );

    this.dispatchEvent(event);
  }

  #handleInputChange(event) {
    const { value } = event.target;

    this.setValue(value);
  }

  // --- methods ---

  setValue(value) {
    this.#emitValueUpdate(value);
  }

  clear() {
    this.setValue('');
  }

  // --- lifecycle ---

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

  // --- render

  render() {
    return html`
      <div ${ref(this.rootEl)} class="body">
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

  // --- styles ---

  static styles = css`
    .body {
      display: flex;
    }

    input {
      height: 16px;
      padding: 4px;
      border: none;
      border-radius: 2px;
      flex: 1 1 auto;
      width: 100%;
    }
  `;
}
