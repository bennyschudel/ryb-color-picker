import { html, css, LitElement } from 'lit';
import { ref, createRef } from 'lit/directives/ref.js';

import * as d3 from './d3';

import { rgbToCss, normalizeRgb } from './utils';
import { createCustomEvent, getDefaultCube } from './helpers';

export class ColorPickerUiGamutCube extends LitElement {
  rootEl = createRef();
  formEl = createRef();

  static properties = {
    cube: { type: Array },
  };

  constructor() {
    super();

    this.cube = getDefaultCube();
  }

  #emitCubeUpdate(value) {
    const event = createCustomEvent('update:cube', { value });

    this.dispatchEvent(event);
  }

  getCubeValue(index) {
    const rgb = this.cube[index];

    return rgbToCss(rgb, 'hex');
  }

  handleColorInput(event) {
    const index = Number(event.target.dataset.index);
    const value = event.target.value;

    const rgb = d3.color(value);

    if (!rgb) {
      throw new Error('Could not convert to rgb color');
    }

    const { r, g, b } = rgb;

    this.cube[index] = normalizeRgb([r, g, b]);

    this.#emitCubeUpdate(this.cube);
  }

  render() {
    return html`
      <div ${ref(this.rootEl)} class="body">
        <form ${ref(this.formEl)} class="form">
          <div class="front">
            <color-picker-ui-field label="White">
              <input
                type="color"
                .value=${this.getCubeValue(0)}
                data-index="0"
                data-value=${this.getCubeValue(0)}
                @input=${this.handleColorInput}
              />
            </color-picker-ui-field>
            <color-picker-ui-field label="Red">
              <input
                type="color"
                .value=${this.getCubeValue(1)}
                data-index="1"
                @input=${this.handleColorInput}
            /></color-picker-ui-field>
            <color-picker-ui-field label="Yellow">
              <input
                type="color"
                .value=${this.getCubeValue(2)}
                data-index="2"
                @input=${this.handleColorInput}
            /></color-picker-ui-field>
            <color-picker-ui-field label="Orange">
              <input
                type="color"
                .value=${this.getCubeValue(3)}
                data-index="3"
                @input=${this.handleColorInput}
              />
            </color-picker-ui-field>
          </div>
          <div class="back">
            <color-picker-ui-field label="Blue">
              <input
                type="color"
                .value=${this.getCubeValue(4)}
                data-index="4"
                @input=${this.handleColorInput}
              />
            </color-picker-ui-field>
            <color-picker-ui-field label="Purple">
              <input
                type="color"
                .value=${this.getCubeValue(5)}
                data-index="5"
                @input=${this.handleColorInput}
              />
            </color-picker-ui-field>
            <color-picker-ui-field label="Green">
              <input
                type="color"
                .value=${this.getCubeValue(6)}
                data-index="6"
                @input=${this.handleColorInput}
            /></color-picker-ui-field>
            <color-picker-ui-field label="Black">
              <input
                type="color"
                .value=${this.getCubeValue(7)}
                data-index="7"
                @input=${this.handleColorInput}
              />
            </color-picker-ui-field>
          </div>
        </form>
      </div>
    `;
  }

  static styles = css`
    :host {
    }

    .body {
      flex: 1 1 auto;
    }

    .form {
      display: flex;
      gap: 0.5rem;
      align-items: center;
      flex-direction: column;
    }

    .front {
      display: inline-flex;
      gap: 0.5rem;
    }

    .back {
      display: inline-flex;
      gap: 0.5rem;
    }
  `;
}
