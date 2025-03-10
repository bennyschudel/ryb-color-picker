import { html, css, LitElement } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { ref, createRef } from 'lit/directives/ref.js';

import { createCustomEvent } from './helpers';

export class RybColorSwatch extends LitElement {
  rootEl = createRef();

  static properties = {
    disabled: { type: Boolean, reflect: true },
    pill: { type: Boolean, reflect: true },
    value: { type: String, reflect: true },
  };

  #emitUpdateValue(value) {
    const event = createCustomEvent('update:value', { value }, { bubbles: false });

    this.dispatchEvent(event);
  }

  constructor() {
    super();
  }

  willUpdate(props) {
    if (props.has('value')) {
      this.#emitUpdateValue(this.value);
    }
  }

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

  static styles = css`
    :host {
      --size: 3rem;

      display: inline-flex;
      min-height: var(--size);
      min-width: var(--size);
      justify-content: stretch;
      align-items: stretch;
    }

    :host([pill]) .body {
      border-radius: 999px;
    }

    .body {
      border-radius: calc(var(--size) / 8);
      display: flex;
      flex: 1 1 auto;
      border: none;
    }
  `;
}
