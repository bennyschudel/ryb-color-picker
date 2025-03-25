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
      --width: 22rem;
      --background-color: light-dark(#a0a0a0, #303030);

      display: inline-flex;
      color: black;
    }

    .body {
      align-items: stretch;
      background-color: var(--background-color);
      border-radius: 0.5rem;
      display: flex;
      flex-direction: column;
      font-family: sans-serif;
      gap: 0.25rem;
      padding: 0.25rem;
      width: var(--width);
    }
`;
}
