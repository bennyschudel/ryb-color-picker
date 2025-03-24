import { html, css, LitElement } from 'lit';
import { ref, createRef } from 'lit/directives/ref.js';

import { clamp } from './utils';
import { createCustomEvent } from './helpers';

/**
 * A custom element that provides an input for incrementing and decrementing a numeric value within a specified range.
 *
 * @class
 * @extends {LitElement}
 *
 * @property {number} max - The maximum value allowed.
 * @property {number} min - The minimum value allowed.
 * @property {number} value - The current value of the input.
 *
 * @method minus - Decrements the value by 1.
 * @method plus - Increments the value by 1.
 * @method setValue - Sets the value and emits an update event.
 * @method updated - Lifecycle method called when properties change.
 *
 * @fires ColorPickerUiStepperInput#value:update - Fired when the value is updated.
 */
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

  // --- getters ----

  /**
   * Determines if the current value can be decremented.
   *
   * @returns {boolean} True if the current value is greater than the minimum value, otherwise false.
   */
  get canMinus() {
    return this.value > this.min;
  }

  /**
   * Determines if the current value is less than the maximum allowed value.
   *
   * @returns {boolean} True if the current value is less than the maximum, otherwise false.
   */
  get canPlus() {
    return this.value < this.max;
  }

  // --- private methods ---

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

  // --- methods ---

  /**
   * Sets the value by emitting a value update event.
   *
   * @param {any} value - The new value to set.
   */
  setValue(value) {
    this.#emitValueUpdate(value);
  }

  /**
   * Increases the current value by 1.
   */
  plus() {
    this.setValue(this.value + 1);
  }

  /**
   * Decreases the current value by 1.
   */
  minus() {
    this.setValue(this.value - 1);
  }

  // --- lifecycle ---

  updated(props) {
    if (props.has('value')) {
      this.inputEl.value.value = this.value;
    }
  }

    // --- render

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

  // --- styles ---

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
