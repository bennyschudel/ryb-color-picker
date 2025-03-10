import { html, css, LitElement } from 'lit';
import { ref, createRef } from 'lit/directives/ref.js';

import { slugify } from './utils';
import { createCustomEvent, getDefaultCube } from './helpers';

export class ColorPickerUiGamut extends LitElement {
  rootEl = createRef();
  cubeEl = createRef();
  savePresetEl = createRef();
  resetPresetEl = createRef();
  deletePresetEl = createRef();

  static properties = {
    presets: { type: Array },
    preset: { type: String },
    cube: { type: Array },
  };

  constructor() {
    super();

    this.preset = '';

    this.cube = getDefaultCube();
  }

  get presetsOptions() {
    return [['', '(New Gamut)']].concat(this.presets.map((d) => [d[0], d[1]]));
  }

  #handlePresetChange(event) {
    this.#emitPresetUpdate(event.detail.value);
  }

  #handleCubeChange(event) {
    const { value } = event.detail;

    this.cube = value;

    this.#emitCubeUpdate(value);
  }

  #handleUpdatePreset() {
    const presets = window.structuredClone(this.presets);
    const cube = window.structuredClone(this.cube);

    const id = this.preset;
    const item = presets.find((d) => d[0] === id);

    item[2] = cube;

    this.#emitPresetsUpdate(presets);
    this.#emitPresetUpdate(id);

    this.savePresetEl.value.showFeedBack('Updated');
  }

  #handleSavePreset() {
    const title = prompt('Please enter a preset title:');

    if (!title) {
      throw Error('Missing title');
    }

    const id = slugify(title);

    if (this.presets.find((d) => d[0] === id)) {
      alert('A preset with this title does exist. Please choose another name.');

      this.#handleSavePreset();

      return;
    }

    const presets = window.structuredClone(this.presets);
    const cube = window.structuredClone(this.cube);

    presets.push([id, title, cube]);

    this.#emitPresetsUpdate(presets);
    this.#emitPresetUpdate(id);

    this.savePresetEl.value.showFeedBack('Saved');
  }

  #handleResetPreset() {
    this.#assignPreset();

    this.resetPresetEl.value.showFeedBack('Resetted');
  }

  #handleDeletePreset() {
    const id = this.preset;

    const presets = window.structuredClone(this.presets);

    const presetsWithout = presets.filter((d) => d[0] !== id);

    this.#emitPresetsUpdate(presetsWithout);
    this.#emitPresetUpdate('');

    this.deletePresetEl.value.showFeedBack('Deleted');
  }

  #emitPresetUpdate(value) {
    const event = createCustomEvent('update:preset', { value });

    this.dispatchEvent(event);
  }

  #emitCubeUpdate(value) {
    const event = createCustomEvent('update:cube', { value });

    this.dispatchEvent(event);
  }

  #emitPresetsUpdate(value) {
    const event = createCustomEvent('update:presets', { value });

    this.dispatchEvent(event);
  }

  #assignPreset() {
    const item = this.presets.find((d) => d[0] === this.preset);

    if (!item) return;

    const cube = window.structuredClone(item[2]);

    this.cube = cube;
    this.#emitCubeUpdate(cube);
  }

  willUpdate(props) {
    if (props.has('preset')) {
      this.#assignPreset();
    }
  }

  render() {
    return html`
      <div ${ref(this.rootEl)} class="body">
        <color-picker-ui-selector
          value=${this.preset}
          .options=${this.presetsOptions}
          @update:value=${this.#handlePresetChange}
        ></color-picker-ui-selector>
        <div class="separator"></div>
        <color-picker-ui-gamut-cube
          ${ref(this.cubeEl)}
          .cube=${this.cube}
          @update:cube=${this.#handleCubeChange}
        >
        </color-picker-ui-gamut-cube>
        <div class="separator"></div>
        <div class="actions">
          <color-picker-ui-button
            ${ref(this.savePresetEl)}
            feedback
            @click=${this.preset
              ? this.#handleUpdatePreset
              : this.#handleSavePreset}
            >${this.preset ? 'Update Preset' : 'Save Preset'}
          </color-picker-ui-button>
          <color-picker-ui-button
            ${ref(this.resetPresetEl)}
            feedback
            ?disabled=${!this.preset}
            @click=${this.#handleResetPreset}
            >Reset Preset</color-picker-ui-button
          >
          <color-picker-ui-button
            ${ref(this.deletePresetEl)}
            feedback
            ?disabled=${!this.preset}
            @click=${this.#handleDeletePreset}
            >Delete Preset</color-picker-ui-button
          >
        </div>
      </div>
    `;
  }

  static styles = css`
    :host {
    }

    .body {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .separator {
      border-color: #808080 transparent #b0b0b0 transparent;
      border-style: solid;
      border-width: 1px 0 1px 0;
      height: 0;
      margin: 0.25rem 0.5rem;
      width: calc(100% - 1rem);
    }

    .actions {
      display: flex;
      gap: 0.25rem;
      justify-content: center;
      width: 100%;
    }
  `;
}
