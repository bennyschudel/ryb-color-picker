import { html, css, LitElement } from 'lit';
import { ref, createRef } from 'lit/directives/ref.js';

export class ColorPickerUiToolTip extends LitElement {
  rootEl = createRef();

  static properties = {
    show: { type: Boolean, reflect: true },
    duration: { type: Number, reflect: true },
  };

  constructor() {
    super();

    this._intervalTimer;

    this.duration = 1_000;
  }

  willUpdate(props) {
    if (props.has('show')) {
      clearInterval(this._intervalTimer);
      this._intervalTimer = setTimeout(() => {
        this.show = false;
      }, this.duration);
    }
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
      --offset: 0.5rem;

      --_y: calc(-200% - var(--offset));

      display: inline-flex;
      left: 50%;
      opacity: 0;
      pointer-events: none;
      position: absolute;
      transform: translate(-50%, var(--_y));
      transition: all 0.2s ease-out;
    }

    :host([show]) {
      --_y: calc(-100% - var(--offset));

      opacity: 1;
    }

    .body {
      align-items: center;
      background-color: black;
      border-radius: 0.25rem;
      color: white;
      display: inline-flex;
      justify-content: stretch;
      padding: 0.25rem 0.5rem;
    }

    .body::after {
      border-color: black transparent transparent transparent;
      border-style: solid;
      border-width: 4px;
      bottom: -8px;
      content: "";
      display: block;
      left: calc(50% - 4px);
      position: absolute;
    }
  `;
}
