import { html, css, LitElement } from 'lit';
import { ref, createRef } from 'lit/directives/ref.js';

import { clamp } from './utils';
import { createCustomEvent } from './helpers';

export class ColorPickerUiStepperInput extends LitElement {
  rootEl = createRef();
  inputEl = createRef();

  static properties = {
    value: { type: Number, reflect: true },
    min: { type: Number, reflect: true },
    max: { type: Number, reflect: true },
  };

  constructor() {
    super();

    this.value = 0;
  }

  get canMinus() {
    return this.value > this.min;
  }

  get canPlus() {
    return this.value < this.max;
  }

  #handleInputChange(event) {
    const { value } = event.target;

    this.#emitValueUpdate(value);
  }

  #emitValueUpdate(_value) {
    const value = clamp(_value, this.min, this.max);

    const event = createCustomEvent(
      'update:value',
      { value },
      { bubbles: false },
    );

    this.dispatchEvent(event);
  }

  setValue(value) {
    this.#emitValueUpdate(value);
  }

  plus() {
    this.setValue(this.value + 1);
  }

  minus() {
    this.setValue(this.value - 1);
  }

  updated(props) {
    if (props.has('value')) {
      this.inputEl.value.value = this.value;
    }
  }

  render() {
    return html`
      <div ${ref(this.rootEl)} class="body">
        <color-picker-ui-icon-button
          ?disabled=${!this.canMinus}
          @click=${this.minus}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M5 12l14 0" />
          </svg>
        </color-picker-ui-icon-button>
        <input
          ${ref(this.inputEl)}
          value="${this.value}"
          type="number"
          min="${this.min}"
          max="${this.max}"
          @change=${this.#handleInputChange}
        />
        <color-picker-ui-icon-button
          ?disabled=${!this.canPlus}
          @click=${this.plus}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M12 5l0 14" />
            <path d="M5 12l14 0" />
          </svg>
        </color-picker-ui-icon-button>
      </div>
    `;
  }

  static styles = css`
    :host {
      display: inline-flex;
    }

    .body {
      display: inline-flex;
      gap: 0.25rem;
      width: 100%;
    }

    input {
      width: 100%;
      text-align: center;
      border: none;
      border-radius: 0.125rem;
      height: 1rem;
      padding: 0.25rem;
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    input[type='number'] {
      -moz-appearance: textfield;
    }
  `;
}
