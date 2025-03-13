import { html, css, LitElement } from 'lit';
import { ref, createRef } from 'lit/directives/ref.js';

export class ColorPickerSettings extends LitElement {
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
        <slot></slot>
      </div>
    `;
  }

  static styles = css`
    :host {
      --_width: var(--width, 22rem);

      display: inline-flex;
      color: black;
    }

    .body {
      align-items: stretch;
      background-color: #909090;
      border-radius: 0.5rem;
      display: flex;
      flex-direction: column;
      font-family: sans-serif;
      gap: 0.25rem;
      padding: 0.25rem;
      width: var(--_width);
    }
`;
}
