import { html, css, LitElement } from 'lit';
import { ref, createRef } from 'lit/directives/ref.js';

export class ColorPickerUiSeparator extends LitElement {
  rootEl = createRef();

  static properties = {
  };

  constructor() {
    super();
  }

  render() {
    return html`
      <div
        ${ref(this.rootEl)}
        class="body"
      >
      </div>
    `;
  }

  static styles = css`
    :host {
      --_padding: var(--padding, 0.5rem);
      --_margin: var(--margin, 0.5rem);
    }

    .body {
      border-color: #808080 transparent #b0b0b0 transparent;
      border-style: solid;
      border-width: 1px 0 1px 0;
      display: block;
      height: 0;
      margin-bottom: var(--_margin);
      margin-top: var(--_margin);
      margin-left: var(--_padding);
      margin-right: var(--_padding);
    }
  `;
}
