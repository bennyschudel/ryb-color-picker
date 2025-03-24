import { html, css, LitElement } from 'lit';
import { ref, createRef } from 'lit/directives/ref.js';

/**
 * A custom element representing an icon button.
 *
 * @class
 * @extends {LitElement}
 *
 * @property {boolean} disabled - Reflects the disabled state of the button.
 * @property {boolean} feedback - Enables or disables feedback functionality.
 */
export class ColorPickerUiIconButton extends LitElement {
  rootEl = createRef();
  feedBackEl = createRef();

  static properties = {
    disabled: { type: Boolean, reflect: true },
    feedback: { type: Boolean },
  };

  constructor() {
    super();
  }

  // --- methods ---

  /**
   * Displays feedback text for a specified duration.
   *
   * @param {string} text - The feedback text to display.
   * @param {number} [duration=1000] - The duration to display the feedback text, in milliseconds.
   */
  showFeedBack(text, duration = 1_000) {
    if (!this.feedback) {
      console.warn('Please enable the feedback attribute.');

      return;
    }

    const { value: el } = this.feedBackEl;

    el.innerHTML = text;
    el.setAttribute('duration', duration);
    el.setAttribute('show', '');
  }

  // --- lifecycle ---

    // --- render

  render() {
    return html`
      <button ${ref(this.rootEl)} class="body" ?disabled=${this.disabled}>
        ${this.feedback
          ? html` <color-picker-ui-tool-tip
              ${ref(this.feedBackEl)}
            ></color-picker-ui-tool-tip>`
          : html``}
        <color-picker-ui-icon>
          <slot></slot>
        </color-picker-ui-icon>
      </button>
    `;
  }

  // --- styles ---

  static styles = css`
    :host {
      --size: 1.5rem;

      display: inline-flex;
    }

    .body {
      align-items: center;
      border-radius: 0.125rem;
      border: none;
      box-shadow: inset 1px 1px 1px 0 hsl(0 100 100 / 0.2),
        inset -1px -1px 1px 0 hsl(0 0 0 / 0.1);
      display: inline-flex;
      height: var(--size);
      justify-content: center;
      margin: 0;
      padding: 0;
      position: relative;
      width: var(--size);
      color: hsl(0 0 0 / 0.8);

      &:active {
        transform: translate(1px, 1px);
      }

      &[disabled] {
        color-picker-ui-icon {
          opacity: 0.5;
        }
      }
    }
  `;
}
