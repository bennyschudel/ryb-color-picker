import { html, css, LitElement } from 'lit';
import { ref, createRef } from 'lit/directives/ref.js';

// ---

export class RybColorPickerUiSeparator extends LitElement {
  rootEl = createRef();

  static properties = {};

  constructor() {
    super();
  }

  // --- lifecycle ---

  // --- render

  render() {
    return html` <div ${ref(this.rootEl)} class="body"></div> `;
  }

  // --- styles ---

  static styles = css`
    :host {
      --padding: 8px;
      --margin: 8px;

      --_border-color--top: light-dark(#909090, #303030);
      --_border-color--bottom: light-dark(#c0c0c0, #505050);
    }

    .body {
      border-bottom-color: var(--_border-color--bottom);
      border-left-color: transparent;
      border-right-color: transparent;
      border-style: solid;
      border-top-color: var(--_border-color--top);
      border-width: 1px 0 1px 0;
      display: block;
      height: 0;
      margin-bottom: var(--margin);
      margin-left: var(--padding);
      margin-right: var(--padding);
      margin-top: var(--margin);
    }
  `;
}
