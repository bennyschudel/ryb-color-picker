import { html, css, LitElement } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { ref, createRef } from 'lit/directives/ref.js';

import { createCustomEvent } from './helpers';

/**
 * RybColorSwatch is a custom web component representing a color swatch.
 *
 * @class
 * @extends {LitElement}
 *
 * @property {boolean} [disabled=false] - Indicates whether the button is disabled.
 * @property {boolean} [pill=false] - Indicates whether the button has a pill-shaped border radius.
 * @property {string} value - Represents the background color of the button.
 *
 * @fires RybColorSwatch#update:value - Dispatched when the value property is updated.
 */
export class RybColorSwatch extends LitElement {
  rootEl = createRef();

  static properties = {
    disabled: { type: Boolean, reflect: true },
    pill: { type: Boolean, reflect: true },
    value: { type: String, reflect: true },
  };

  constructor() {
    super();

    this.disabled = false;
    this.pill = false;
  }

  // --- private methods ---

  #emitUpdateValue(value) {
    const event = createCustomEvent('update:value', { value }, { bubbles: false });

    this.dispatchEvent(event);
  }

  // --- lifecycle ---

  willUpdate(props) {
    if (props.has('value')) {
      this.#emitUpdateValue(this.value);
    }
  }

    // --- render

  render() {
    return html`
      <button
        ${ref(this.rootEl)}
        class="body"
        ?disabled=${this.disabled}
        style=${styleMap({
          backgroundColor: this.value,
        })}
      ></button>
    `;
  }

  // --- styles ---

  static styles = css`
    :host {
      --size: 3rem;

      align-items: stretch;
      display: inline-flex;
      justify-content: stretch;
      min-height: var(--size);
      min-width: var(--size);
    }

    :host([pill]) .body {
      border-radius: 999px;
    }

    .body {
      border-radius: calc(var(--size) / 8);
      border: none;
      display: flex;
      flex: 1 1 auto;
      transition: background-color 0.2s ease-out;
    }
  `;
}
