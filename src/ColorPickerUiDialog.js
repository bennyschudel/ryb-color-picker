import { html, css, LitElement } from 'lit';

// ---

/**
 * A custom element that provides a base dialog.
 *
 * @class
 * @extends {LitElement}
 */
export class ColorPickerUiDialog extends LitElement {
  static properties = {};

  constructor() {
    super();
  }

  // --- lifecycle ---

    // --- render

  render() {
    return html`
      <div class="body">
        <div class="text">
          <slot name="text"></slot>
        </div>
        <div class="actions">
          <slot name="actions"></slot>
        </div>
      </div>
    `;
  }

  // --- styles ---

  static styles = css`
    :host {
      --backdrop-color: hsl(0 0 0 / 0.2);
      --background-color: light-dark(#202020, #f0f0f0);
      --color: light-dark(#f0f0f0, #202020);
      --font-family--text: sans-serif;
      --max-width: 320px;
      --min-width: 240px;
      --z-index: 1000;

      align-items: center;
      background-color: var(--backdrop-color);
      border-radius: 0.5rem;
      display: flex;
      inset: 0;
      justify-content: center;
      padding: 2rem;
      position: absolute;
      z-index: var(--z-index);
    }

    .body {
      align-items: stretch;
      background-color: var(--background-color);
      border-radius: 0.5rem;
      display: inline-flex;
      flex-direction: column;
      gap: 0.5rem;
      justify-content: stretch;
      max-width: var(--max-width);
      min-width: var(--min-width);
      padding: 1rem;
    }

    .text {
      color: var(--color);
      font-family: var(--font-family--text);
      font-size: 0.875rem;
      font-weight: normal;
      line-height: 1.5;
    }

    .actions {
      display: flex;
      gap: 0.25rem;
      justify-content: flex-end;
    }
  `;
}
