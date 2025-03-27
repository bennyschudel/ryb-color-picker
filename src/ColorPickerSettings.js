import { html, css, LitElement } from 'lit';
import { ref, createRef } from 'lit/directives/ref.js';

/**
 * A custom element representing a settings element.
 *
 * @class
 * @extends {LitElement}
 */
export class ColorPickerSettings extends LitElement {
  rootEl = createRef();

  static properties = {};

  constructor() {
    super();
  }

  // --- lifecycle ---

    // --- render

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

  // --- styles ---

  static styles = css`
    :host {
      --width: 352px;
      --background-color: light-dark(#a0a0a0, #303030);

      display: inline-flex;
      color: black;
    }

    .body {
      align-items: stretch;
      background-color: var(--background-color);
      border-radius: 8px;
      display: flex;
      flex-direction: column;
      font-family: sans-serif;
      gap: 4px;
      padding: 4px;
      width: var(--width);
    }
`;
}
