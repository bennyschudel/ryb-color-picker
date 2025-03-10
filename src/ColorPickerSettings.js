import { html, css, LitElement } from 'lit';
import { ref, createRef } from 'lit/directives/ref.js';

export class ColorPickerSettings extends LitElement {
  rootEl = createRef();

  static properties = {
  };

  constructor() {
    super();
  }

  render() {
    return html`
      <div
        ${ref(this.rootEl)}
        class="body"
      >
        <div class="presets">
          <slot name="presets"></slot>
        </div>
        <div class="hr">
          <div class="separator"></div>
        </div>
        <div class="gamut">
          <slot name="gamut"></slot>
        </div>
        <div class="hr2">
          <div class="separator"></div>
        </div>
        <div class="diameter">
          <slot name="diameter"></slot>
        </div>
        <div class="distortion">
          <slot name="distortion"></slot>
        </div>
        <div class="color-format">
          <slot name="color-format"></slot>
        </div>
        <div class="bg-color">
          <slot name="bg-color"></slot>
        </div>
        <div class="gap">
          <slot name="gap"></slot>
        </div>
        <div class="swatch-gap">
          <slot name="swatch-gap"></slot>
        </div>
        <div class="hr3">
          <div class="separator"></div>
        </div>
        <div class="segments">
          <slot name="segments"></slot>
        </div>
        <div class="thickness">
          <slot name="thickness"></slot>
        </div>
        <div class="hr4">
          <div class="separator"></div>
        </div>
        <div class="actions">
          <slot name="actions"></slot>
        </div>
      </div>
    `;
  }

  static styles = css`
    :host {
      display: inline-flex;
      color: black;
    }

    .separator {
      width: calc(100% - 1rem);
      height: 0;
      border-width: 1px 0 1px 0;
      border-color: #808080 transparent #b0b0b0 transparent;
      border-style: solid;
      margin: 0.5rem;
    }

    .body {
      align-items: stretch;
      background-color: #909090;
      border-radius: 0.5rem;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      grid-template-areas:
        "presets presets presets"
        "hr hr hr"
        "gamut gamut gamut"
        "hr2 hr2 hr2"
        "diameter distortion color-format"
        "bg-color gap swatch-gap"
        "hr3 hr3 hr3"
        "segments segments segments"
        "thickness thickness thickness"
        "hr4 hr4 hr4"
        "actions actions actions";
      font-family: sans-serif;
      gap: 0.25rem;
      padding: 0.25rem;
      width: 22rem;
    }

    .presets {
      grid-area: presets;
    }

    .distortion {
      grid-area: distortion;
    }

    .hr {
      grid-area: hr;
    }

    .hr2 {
      grid-area: hr2;
    }

    .hr3 {
      grid-area: hr3;
    }

    .hr4 {
      grid-area: hr4;
    }

    .bg-color {
      grid-area: bg-color;
    }

    .color-format {
      grid-area: color-format;
    }

    .gamut {
      grid-area: gamut;
    }

    .segments {
      grid-area: segments;
    }

    .thickness {
      grid-area: thickness;
    }

    .diameter {
      grid-area: diameter;
    }

    .gap {
      grid-area: gap;
    }

    .swatch-gap {
      grid-area: swatch-gap;
    }

    .actions {
      grid-area: actions;
    }
`;
}
