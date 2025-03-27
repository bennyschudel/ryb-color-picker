import { html, css, LitElement } from 'lit';
import { ref, createRef } from 'lit/directives/ref.js';

import { createCustomEvent } from '../helpers';

/**
 * @typedef {[string, string]} Option - A tuple containing a value and label for the selector
 */

/**
 * A custom element that provides a select dropdown with optional
 * next/previous controls. Supports keyboard navigation with arrow keys.
 *
 * @class
 * @extends {LitElement}
 *
 * @property {string} value - The currently selected value
 * @property {Option[]} options - Array of [value, label] pairs for the select options
 * @property {boolean} [noControls=false] - When true, hides the next/previous buttons
 *
 * @fires {CustomEvent} update:value - Fired when the selected value changes
 */
export class RybColorPickerUiSelector extends LitElement {
  rootEl = createRef();
  selectEl = createRef();

  static properties = {
    value: { type: String },
    options: { type: Array },
    noControls: { type: Boolean, reflect: true },
  };

  constructor() {
    super();

    this.noControls = false;
  }

  // --- private getters ---

  get #currentIndex() {
    const index = this.options.findIndex(([value]) => value === this.value);

    return index;
  }

  // --- getters ---

  /**
   * Gets the total number of available options
   *
   * @returns {number} The number of options
   */
  get count() {
    return this.options.length;
  }

  /**
   * Determines if cycling through values is possible (requires more than 1 option)
   *
   * @returns {boolean} True if cycling is possible
   */
  get canCycle() {
    return this.count > 1;
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

  #handleChange(event) {
    const value = /** @type {HTMLSelectElement} */ (event.target).value;
    this.setValue(value);
  }

  #handleKeyup(event) {
    switch (event.key) {
      case 'ArrowLeft':
        this.previousValue();
        break;
      case 'ArrowRight':
        this.nextValue();
        break;
    }
  }

  // --- methods ---

  /**
   * Sets the current value and emits an update event
   *
   * @param {string} value - The new value to set
   */
  setValue(value) {
    this.#emitValueUpdate(value);
  }

  /**
   * Selects the next value in the options list, cycling to the first if at the end
   */
  nextValue() {
    let index = this.#currentIndex + 1;
    if (index > this.count - 1) {
      index = 0;
    }

    const value = this.options[index][0];

    this.#emitValueUpdate(value);
  }

  /**
   * Selects the previous value in the options list, cycling to the last if at the beginning
   */
  previousValue() {
    let index = this.#currentIndex - 1;
    if (index < 0) {
      index = this.count - 1;
    }

    const value = this.options[index][0];

    this.#emitValueUpdate(value);
  }

  // --- lifecycle ---

  updated(props) {
    if (props.has('value')) {
      const index = this.#currentIndex;
      if (index === -1) {
        return;
      }

      this.selectEl.value.selectedIndex = index;
    }
  }

    // --- render

  render() {
    return html`
      <div ${ref(this.rootEl)} class="body">
        ${!this.noControls
          ? html` <ryb-color-picker-ui-icon-button
              ?disabled=${!this.canCycle}
              @click=${this.previousValue}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M5 12l14 0" />
                <path d="M5 12l6 6" />
                <path d="M5 12l6 -6" />
              </svg>
            </ryb-color-picker-ui-icon-button>`
          : html``}
        <select
          ${ref(this.selectEl)}
          class="select"
          @change=${this.#handleChange}
          @keyup=${this.#handleKeyup}
        >
          ${this.options.map(
            ([value, label]) =>
              html`<option value="${value}">${label}</option>`,
          )}
        </select>
        ${!this.noControls
          ? html` <ryb-color-picker-ui-icon-button
              ?disabled=${!this.canCycle}
              @click=${this.nextValue}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M5 12l14 0" />
                <path d="M13 18l6 -6" />
                <path d="M13 6l6 6" />
              </svg>
            </ryb-color-picker-ui-icon-button>`
          : html``}
      </div>
    `;
  }

  // --- styles ---

  static styles = css`
    :host {
      --outline-color: black;
      --border-radius: 4px;
      --focus-color: blue;

      display: inline-flex;
    }

    .body {
      display: inline-flex;
      gap: 4px;
      flex: 1 1 auto;
      justify-content: stretch;
    }

    .select {
      border: none;
      border-radius: 2px;
      height: 24px;
      width: 100%;
    }

    select:focus {
      outline: 2px solid var(--focus-color);
      z-index: 1;
    }
  `;
}
