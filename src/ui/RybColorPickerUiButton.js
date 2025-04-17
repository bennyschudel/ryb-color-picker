import { html, css, LitElement } from 'lit';
import { ref, createRef } from 'lit/directives/ref.js';

/**
 * A custom element representing a button.
 *
 * @class
 * @extends {LitElement}
 *
 * @property {boolean} [disabled=false] - Enables or disables the button functionality.
 * @property {boolean} [feedback=false] - Enables or disables feedback functionality.
 */
export class RybColorPickerUiButton extends LitElement {
  rootEl = createRef();
  feedBackEl = createRef();

  static properties = {
    disabled: { type: Boolean, reflect: true },
    feedback: { type: Boolean },
  };

  constructor() {
    super();

    this.disabled = false;
    this.feedback = false;
  }

  // --- methods ---

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
          ? html` <ryb-color-picker-ui-tool-tip
              ${ref(this.feedBackEl)}
            ></ryb-color-picker-ui-tool-tip>`
          : html``}
        <span><slot></slot></span>
      </button>
    `;
  }

  // --- styles ---

  static styles = css`
    :host {
      --height: 24px;
      --color: light-dark(#202020, #f0f0f0);

      display: inline-flex;
    }

    .body {
      align-items: center;
      border-radius: 2px;
      border: none;
      box-shadow: inset 1px 1px 1px 0 hsl(0 100 100 / 0.2),
        inset -1px -1px 1px 0 hsl(0 0 0 / 0.1);
      display: inline-flex;
      height: var(--height);
      justify-content: center;
      margin: 0;
      padding: 0 8px;
      color: var(--color);
      position: relative;

      &:active {
        transform: translate(1px, 1px);
      }

      &[disabled] > span {
        opacity: 0.5;
      }
    }
  `;
}
