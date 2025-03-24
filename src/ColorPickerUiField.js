import { html, css, LitElement } from 'lit';
import { ref, createRef } from 'lit/directives/ref.js';

/**
 * A custom element that provides a form field.
 *
 * @class
 * @extends {LitElement}
 */
export class ColorPickerUiField extends LitElement {
  rootEl = createRef();

  static properties = {
    label: { type: String },
  };

  constructor() {
    super();
  }

  // --- lifecycle ---

    // --- render

  render() {
    return html`
      <div ${ref(this.rootEl)} class="body">
        ${this.label
          ? html` <span class="label" part="label">${this.label}</span>`
          : html``}
        <div class="content" part="content">
          <slot></slot>
        </div>
      </div>
    `;
  }

  // --- styles ---

  static styles = css`
    :host {
      --label-background-color: hsl(0 100 100 / 0.2);
      --size: 1rem;
      --direction: column;
    }

    .body {
      align-items: stretch;
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      font-size: 0.625rem;
      background-color: var(--label-background-color);
      padding: 0.25rem;
      border-radius: 0.25rem;
      flex: 1 1 auto;
    }

    .label {
      letter-spacing: 0.25pt;
      text-transform: uppercase;
    }

    .content {
      display: flex;
      flex-direction: var(--direction);
      gap: 0.25rem;
      justify-content: stretch;
    }
  `;
}
