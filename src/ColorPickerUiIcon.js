import { html, css, LitElement } from 'lit';
import { ref, createRef } from 'lit/directives/ref.js';

export class ColorPickerUiIcon extends LitElement {
  rootEl = createRef();

  static properties = {};

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
      --size: 1rem;

      display: inline-flex;
    }

    .body {
      align-items: stretch;
      display: inline-flex;
      height: var(--size);
      justify-content: stretch;
      width: var(--size);
      color: currentcolor;
    }
  `;
}
