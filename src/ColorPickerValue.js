import { html, css, LitElement } from 'lit';
import { ref, createRef } from 'lit/directives/ref.js';
import { createCustomEvent } from './helpers';

import { copyToClipboard } from './utils';

// ---

/**
 * A custom element that represents a value input field.
 *
 * @class
 * @extends {LitElement}
 *
 * @property {boolean} [disabled=false] - Indicates if the input is disabled.
 * @property {boolean} [noSettings=false] - Indicates if the settings button should be hidden.
 * @property {string} value - The current value of the color picker.
 *
 * @fires ColorPickerValue#update:value - Fired when the value is updated.
 * @fires ColorPickerValue#action:show-settings - Fired when the settings button is clicked.
 */
export class ColorPickerValue extends LitElement {
  rootEl = createRef();
  inputEl = createRef();
  copyEl = createRef();

  static properties = {
    disabled: { type: Boolean },
    noSettings: { type: Boolean },
    value: { type: String, reflect: true },
  };

  constructor() {
    super();

    this.disabled = false;
    this.noSettings = false
  }

  // --- private methods ---

  #emitShowSettingsAction() {
    const event = createCustomEvent('action:show-settings');

    this.dispatchEvent(event);
  }

  #handleValueUpdate(event) {
    event.stopPropagation();

    const { value } = event.detail;

    this.#emitValueChange(value);
  }

  #emitValueChange(value) {
    const event = createCustomEvent(
      'update:value',
      { value },
      { bubbles: false },
    );

    this.dispatchEvent(event);
  }

  // --- methods ---

  /**
   * Copies the current color value to the clipboard.
   *
   * @async
   * @function copyToClipboard
   * @returns {Promise<void>} A promise that resolves when the value has been copied to the clipboard.
   */
  async copyToClipboard() {
    await copyToClipboard(this.value);

    this.copyEl.value.showFeedBack('Copied');
  }

  // -- lifecycle ---

  updated(props) {
    if (props.has('value')) {
      this.inputEl.value.value = this.value;
    }
  }

    // --- render

  render() {
    return html`
      <div ${ref(this.rootEl)} class="body">
        <color-picker-ui-field class="value" label="Value">
          <color-picker-ui-input
            ${ref(this.inputEl)}
            class="input"
            ?disabled=${this.disabled}
            value=${this.value}
            @update:value=${this.#handleValueUpdate}
          ></color-picker-ui-input>
          <color-picker-ui-icon-button
            ${ref(this.copyEl)}
            ?disabled=${this.disabled}
            feedback
            @click=${this.copyToClipboard}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path
                d="M7 7m0 2.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667z"
              />
              <path
                d="M4.012 16.737a2.005 2.005 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1"
              />
            </svg>
          </color-picker-ui-icon-button>
          ${!this.noSettings
            ? html` <color-picker-ui-icon-button
                ?disabled=${this.disabled}
                @click=${this.#emitShowSettingsAction}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M14 6m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                  <path d="M4 6l8 0" />
                  <path d="M16 6l4 0" />
                  <path d="M8 12m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                  <path d="M4 12l2 0" />
                  <path d="M10 12l10 0" />
                  <path d="M17 18m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                  <path d="M4 18l11 0" />
                  <path d="M19 18l1 0" />
                </svg>
              </color-picker-ui-icon-button>`
            : html``}
        </color-picker-ui-field>
      </div>
    `;
  }

  // --- styles ---

  static styles = css`
    .body {
      align-items: stretch;
      background-color: #909090;
      border-radius: 0.5rem;
      display: inline-flex;
      font-family: sans-serif;
      gap: 0.25rem;
      padding: 0.25rem;
    }

    .value {
      --direction: 'horizontal';
    }

    .input::part(input) {
      font-family: Monaco, monospace;
      width: 8rem;
      text-align: center;
    }
  `;
}
