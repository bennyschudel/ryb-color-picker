import { html, css, LitElement } from 'lit';
import { ref, createRef } from 'lit/directives/ref.js';

import { createCustomEvent } from './helpers';

export class ColorPickerUiSelector extends LitElement {
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

  get #currentIndex() {
    const index = this.options.findIndex(([value]) => value === this.value);

    return index;
  }

  get count() {
    return this.options.length;
  }

  get canCycle() {
    return this.count > 1;
  }

  #emitValueUpdate(value) {
    const event = createCustomEvent(
      'update:value',
      { value },
      { bubbles: false },
    );

    this.dispatchEvent(event);
  }

  #handleChange(event) {
    const value = event.target.value;

    this.setValue(value);
  }

  setValue(value) {
    this.#emitValueUpdate(value);
  }

  nextValue() {
    let index = this.#currentIndex + 1;
    if (index > this.count - 1) {
      index = 0;
    }

    const value = this.options[index][0];

    this.#emitValueUpdate(value);
  }

  previousValue() {
    let index = this.#currentIndex - 1;
    if (index < 0) {
      index = this.count - 1;
    }

    const value = this.options[index][0];

    this.#emitValueUpdate(value);
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

  updated(props) {
    if (props.has('value')) {
      const index = this.#currentIndex;
      if (index === -1) {
        return;
      }

      this.selectEl.value.selectedIndex = index;
    }
  }

  render() {
    return html`
      <div ${ref(this.rootEl)} class="body">
        ${!this.noControls
          ? html` <color-picker-ui-icon-button
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
            </color-picker-ui-icon-button>`
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
          ? html` <color-picker-ui-icon-button
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
            </color-picker-ui-icon-button>`
          : html``}
      </div>
    `;
  }

  static styles = css`
    :host {
      --outline-color: black;
      --border-radius: 4px;
      --background-color: hsl(0 100 100 / 0.8);
      --background-color-focus: hsl(0 100 100 / 1);
      --focus-color: blue;

      display: inline-flex;
    }

    .body {
      display: inline-flex;
      gap: 0.25rem;
      flex: 1 1 auto;
      justify-content: stretch;
    }

    .select {
      background-color: var(--background-color);
      border: none;
      border-radius: 0.125rem;
      height: 1.5rem;
      width: 100%;
    }

    /select:focus {
      background-color: var(--background-color-focus);
      outline: 2px solid var(--focus-color);
      z-index: 1;
    }
  `;
}
