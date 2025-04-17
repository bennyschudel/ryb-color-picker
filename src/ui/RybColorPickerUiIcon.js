import { html, css, LitElement } from 'lit';
import { ref, createRef } from 'lit/directives/ref.js';

/**
 * A custom element representing an icon.
 *
 * @class
 * @extends {LitElement}
 */
export class RybColorPickerUiIcon extends LitElement {
  rootEl = createRef();

  static properties = {};

  constructor() {
    super();
  }

  // --- lifecycle ---

  // --- render

  render() {
    return html`
      <div ${ref(this.rootEl)} class="body">
        <slot></slot>
      </div>
    `;
  }

  // --- styles ---

  static styles = css`
    :host {
      --size: 16px;
      --color: light-dark(black, white);

      display: inline-flex;
    }

    .body {
      align-items: stretch;
      display: inline-flex;
      height: var(--size);
      justify-content: stretch;
      width: var(--size);
      color: var(--color);
    }
  `;
}
