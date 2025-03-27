import { html, css, LitElement } from 'lit';
import { ref, createRef } from 'lit/directives/ref.js';

import { createCustomEvent, getDefaultCube } from '../helpers';
import { arrayEquals, slugify } from '../utils';

// ---

/**
 * A custom element that provides a UI for selecting color gamut.
 *
 * @class
 * @extends {LitElement}
 *
 * @property {Array} cube - The array representing the color cube.
 * @property {boolean} [noModify=false] - A flag that indicates if the cube can be modified.
 * @property {preset} preset - An ID representing the current gamut preset.
 * @property {Array<Array<string, string>>} presets - An array containing available presets.
 */
export class RybColorPickerUiGamut extends LitElement {
  rootEl = createRef();
  cubeEl = createRef();
  savePresetEl = createRef();
  resetPresetEl = createRef();
  deletePresetEl = createRef();

  static properties = {
    dialog: { type: Function },

    // ---
    cube: { type: Array },
    noModify: { type: Boolean },
    preset: { type: String },
    presets: { type: Array },
  };

  constructor() {
    super();

    this.preset = '';
    this.presets = [];
    this.noModify = false;

    this.cube = getDefaultCube();
  }

  // --- getters ---

  get presetsOptions() {
    const options = this.noModify ? [] : [['', '[ New Gamut ]']];

    return options.concat(
      this.presets.map((d) => [d[0], d[1]]),
    );
  }

  get isModified() {
    const preset = this.presets.find((d) => d[0] === this.preset);

    if (!preset) return true;

    return !arrayEquals(this.cube, preset[2]);
  }

  // --- private methods ---

  #handlePresetChange(event) {
    this.#emitPresetUpdate(event.detail.value);
  }

  #handleCubeChange(event) {
    const { value } = event.detail;

    this.cube = value;

    this.#emitCubeUpdate(value);
  }

  #handleUpdatePreset() {
    if (this.noModify) return;

    const presets = window.structuredClone(this.presets);
    const cube = window.structuredClone(this.cube);

    const id = this.preset;
    const item = presets.find((d) => d[0] === id);

    item[2] = cube;

    this.#emitPresetsUpdate(presets);
    this.#emitPresetUpdate(id);

    this.savePresetEl.value.showFeedBack('Updated');
  }

  async #handleSavePreset() {
    if (this.noModify) return;

    let title = '';

    try {
      title = await this.dialog(
        'prompt',
        'Please enter a title for the new gamut-preset:',
      );

      if (!title) {
        throw Error('Missing title');
      }
    } catch (error) {
      return;
    }

    const id = slugify(title);

    if (this.presets.find((d) => d[0] === id)) {
      await this.dialog(
        'alert',
        'A gamut-preset with this title does exist. Please choose another name.',
      );

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
    if (this.noModify) return;

    this.#assignPreset();

    this.resetPresetEl.value.showFeedBack('Resetted');
  }

  async #handleDeletePreset() {
    if (this.noModify) return;

    try {
      await this.dialog('confirm', 'Are you sure to delete this gamut-preset?');
    } catch (error) {
      return;
    }

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

  // --- lifecycle ---

  willUpdate(props) {
    if (props.has('preset')) {
      this.#assignPreset();
    }
  }

    // --- render

  render() {
    return html`
      <div ${ref(this.rootEl)} class="body">
        <ryb-color-picker-ui-selector
          value=${this.preset}
          .options=${this.presetsOptions}
          @update:value=${this.#handlePresetChange}
        ></ryb-color-picker-ui-selector>

        <ryb-color-picker-ui-separator></ryb-color-picker-ui-separator>

        <ryb-color-picker-ui-gamut-cube
          ${ref(this.cubeEl)}
          .cube=${this.cube}
          ?nomodify=${this.noModify}
          @update:cube=${this.#handleCubeChange}
        >
        </ryb-color-picker-ui-gamut-cube>

        ${!this.noModify
          ? html`<ryb-color-picker-ui-separator></ryb-color-picker-ui-separator>
              <div class="actions">
                <ryb-color-picker-ui-button
                  ${ref(this.savePresetEl)}
                  feedback
                  ?disabled=${!this.isModified}
                  @click=${this.preset
                    ? this.#handleUpdatePreset
                    : this.#handleSavePreset}
                  >${this.preset ? 'Update Preset' : 'Save Preset'}
                </ryb-color-picker-ui-button>
                <ryb-color-picker-ui-button
                  ${ref(this.resetPresetEl)}
                  feedback
                  ?disabled=${!this.preset || !this.isModified}
                  @click=${this.#handleResetPreset}
                  >Reset Preset</ryb-color-picker-ui-button
                >
                <ryb-color-picker-ui-button
                  ${ref(this.deletePresetEl)}
                  feedback
                  ?disabled=${!this.preset}
                  @click=${this.#handleDeletePreset}
                  >Delete Preset</ryb-color-picker-ui-button
                >
              </div>`
          : html``}
      </div>
    `;
  }

  // --- styles ---

  static styles = css`
    .body {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    ryb-color-picker-ui-separator {
      --margin: 4px;
    }

    .actions {
      display: flex;
      gap: 4px;
      justify-content: center;
      margin-bottom: 8px;
    }
  `;
}
