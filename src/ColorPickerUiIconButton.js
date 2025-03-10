import { html, css, LitElement } from 'lit';
import { ref, createRef } from 'lit/directives/ref.js';

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
