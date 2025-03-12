import { html, css, LitElement } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { ref, createRef } from 'lit/directives/ref.js';
import { cache } from 'lit/directives/cache.js';

import { rybHsl2rgb } from 'rybitten';

import * as d3 from './d3';

import RadialRange from './plugins/RadialRange';

import { PI, TAU, copyToClipboard, deg, rgbToCss, slugify } from './utils';
import { createCustomEvent, createDialog, getDefaultCube } from './helpers';

// ---

export class RybColorPicker extends LitElement {
  deletePresetEl = createRef();
  rangesBodyEl = createRef();
  rangesEl = createRef();
  resetStoreEl = createRef();
  clearStoreEl = createRef();
  rootEl = createRef();
  savePresetEl = createRef();
  svgEl = createRef();
  valueEl = createRef();

  static properties = {
    _hslColor: { state: true },
    _dialogs: { state: true },
    _initialSettings: { state: true },

    // ---
    cube: { type: Array, attribute: false },
    gamutPresets: { type: Array, attribute: false },
    presets: { type: Array, attribute: false },
    ready: { type: Boolean, attribute: false },

    // ---
    animationDuration: { type: Number, reflect: true },
    backgroundColor: { type: String, reflect: true },
    diameter: { type: Number, reflect: true },
    displayFormat: { type: String, reflect: true },
    distortion: { type: Number, reflect: true },
    gamutPreset: { type: String, reflect: true },
    gap: { type: Number, reflect: true },
    id: { type: String },
    initialValue: { type: String, reflect: true },
    noInit: { type: Boolean },
    noSettings: { type: Boolean },
    noStore: { type: Boolean },
    noValue: { type: Boolean },
    padding: { type: Number, reflect: true },
    preset: { type: String, reflect: true },
    segmentsHue: { type: Number, reflect: true },
    segmentsLightness: { type: Number, reflect: true },
    segmentsSaturation: { type: Number, reflect: true },
    show: { type: Boolean, reflect: true },
    showSettings: { type: Boolean, reflect: true },
    showValue: { type: Boolean, reflect: true },
    swatchGap: { type: Number, reflect: true },
    thicknessHue: { type: Number, reflect: true },
    thicknessLightness: { type: Number, reflect: true },
    thicknessSaturation: { type: Number, reflect: true },
    value: { type: String, reflect: true },

    // ---
    storeConfigKey: { type: String },
    storeGamutPresetsKey: { type: String },
    storePresetsKey: { type: String },
  };

  scaleHue;
  scaleLightness;
  scaleSaturation;

  rangeHue;
  rangeLightness;
  rangeSaturation;

  _busyTimerId = null;

  constructor() {
    super();

    this._hslColor = [0, 0, 0];
    this._dialogs = [];

    this.ready = false;
    this.noInit = false;
    this.noSettings = false;
    this.noValue = false;

    this.cube = getDefaultCube();

    this.presets = [];
    this.gamutPresets = [];

    this.show = true;
    this.showValue = true;

    this.initialValue = '#ff69b4';
    this.value = '';

    this.animationDuration = 150;
    this.backgroundColor = 'transparent';
    this.distortion = 3;
    this.gap = 0;
    this.swatchGap = 8;
    this.diameter = 320;
    this.padding = 30;

    this.thicknessLightness = 20;
    this.thicknessHue = 24;
    this.thicknessSaturation = 20;

    this.segmentsLightness = 24;
    this.segmentsHue = 48;
    this.segmentsSaturation = 24;

    this.displayFormat = 'hex';

    this.preset = '';
    this.gamutPreset = '';

    this.storeConfigKey = 'ryb-color-picker--{id}';
    this.storePresetsKey = 'ryb-color-picker--{id}-presets';
    this.storeGamutPresetsKey = 'ryb-color-picker--{id}-gamut-presets';
  }

  // --- private getters ---

  get #storeConfigKey() {
    return this.#makeStoreKey(this.storeConfigKey);
  }

  get #storePresetsKey() {
    return this.#makeStoreKey(this.storePresetsKey);
  }

  get #storeGamutPresetsKey() {
    return this.#makeStoreKey(this.storeGamutPresetsKey);
  }

  // --- getters ---

  get radius() {
    return this.diameter / 2;
  }

  get innerRadius() {
    const { gap } = this;

    return (
      this.radius -
      this.thicknessHue -
      gap -
      this.thicknessSaturation -
      gap -
      this.thicknessLightness -
      gap
    );
  }

  get swatchRadius() {
    return this.innerRadius - this.swatchGap;
  }

  get color() {
    const { cube } = this;

    return rybHsl2rgb(this._hslColor, { cube });
  }

  get colorCss() {
    return rgbToCss(this.color, this.displayFormat);
  }

  get isBusy() {
    return this._busyTimerId != null;
  }

  get displayFormatOptions() {
    return [
      ['hex', 'Hex'],
      ['rgb', 'RGB'],
    ];
  }

  get width() {
    return this.diameter + 2 * this.padding;
  }

  get height() {
    return this.diameter + 2 * this.padding;
  }

  get viewBox() {
    return `${this.width / -2} ${this.height / -2} ${this.width} ${
      this.height
    }`;
  }

  get presetsOptions() {
    return [['', '[ New Preset ]']].concat(
      this.presets.map((d) => [d[0], d[1]]),
    );
  }

  // --- private methods ---

  #makeStoreKey(key) {
    const { id } = this;

    return key.replaceAll('{id}', id);
  }

  #markBusy(duration) {
    clearTimeout(this._busyTimerId);
    this._busyTimerId = setTimeout(() => {
      this._busyTimerId = null;
    }, duration);
  }

  #getAngleFromPosition(x, y) {
    let angle = Math.atan2(y, x) + PI / 2;
    if (angle < 0) {
      angle += TAU;
    }

    return deg(angle);
  }

  #getAngleFromEvent(event) {
    const [x, y] = d3.pointer(event, this.rangesBodyEl.value);

    const angle = this.#getAngleFromPosition(x, y);

    return angle;
  }

  // --- emitters ---

  #emitEvent(name, value) {
    const event = createCustomEvent(name, { value });

    this.dispatchEvent(event);
  }

  #emitValueUpdate(value) {
    this.#emitEvent('update:value', value);
  }

  #emitPresetUpdate(value) {
    this.#emitEvent('update:preset', value);
  }

  #emitReady() {
    this.#emitEvent('ready', true);
  }

  // --- handlers ---

  #handlePointerMove(event) {
    if (!this.ready || this.isBusy) return;

    const angle = this.#getAngleFromEvent(event);

    this.focus(angle, 0);
  }

  #handlePointerEnter(event) {
    if (!this.ready) return;

    const { animationDuration } = this;

    const angle = this.#getAngleFromEvent(event);

    this.focus(angle, animationDuration);

    this.#markBusy(animationDuration);
  }

  #handlePointerLeave(event) {
    if (!this.ready) return;

    const { animationDuration } = this;

    this.blur(animationDuration);

    this.#markBusy(animationDuration);
  }

  #handleDisplayFormatChange(event) {
    this.displayFormat = event.detail.value;
  }

  #handleColorInputChange(event) {
    event.stopPropagation();

    this.setValue(event.detail.value);
  }

  #handleBackgroundColorChange(event) {
    this.backgroundColor = event.detail.value;
  }

  #handleSegmentsHueChange(event) {
    this.segmentsHue = event.detail.value;
  }

  #handleSegmentsLightnessChange(event) {
    this.segmentsLightness = event.detail.value;
  }

  #handleSegmentsSaturationChange(event) {
    this.segmentsSaturation = event.detail.value;
  }

  #handleThicknessHueChange(event) {
    this.thicknessHue = event.detail.value;
  }

  #handleThicknessLightnessChange(event) {
    this.thicknessLightness = event.detail.value;
  }

  #handleThicknessSaturationChange(event) {
    this.thicknessSaturation = event.detail.value;
  }

  #handleGapChange(event) {
    this.gap = event.detail.value;
  }

  #handleSwatchGapChange(event) {
    this.swatchGap = event.detail.value;
  }

  #handleGamutCubeChange(event) {
    this.setCube(event.detail.value);
  }

  #handleGamutPresetChange(event) {
    this.gamutPreset = event.detail.value;
  }

  #handleGamutPresetsChange(event) {
    const presets = event.detail.value;

    this.#saveGamutPresetsToLocalStorage(presets);

    this.gamutPresets = presets;
  }

  #handleDiameterChange(event) {
    this.diameter = event.detail.value;
  }

  #handleDistortionChange(event) {
    this.distortion = event.detail.value;
  }

  #handleUpdatePreset(event) {
    const id = this.preset;

    const item = this.presets.find((d) => d[0] === id);

    const title = item[1];

    this.savePreset(id, title);

    this.savePresetEl.value.showFeedBack('Updated');
  }

  async #handleSavePreset(event) {
    let title = '';

    try {
      title = await this.dialog(
        'prompt',
        'Please enter a title for the new preset:',
      );
    } catch (error) {
      return;
    }

    const id = slugify(title);

    if (this.presets.find((d) => d[0] === id)) {
      await this.dialog(
        'alert',
        'A preset with this title does exist. Please choose another name.',
      );

      this.#handleSavePreset();

      return;
    }

    this.savePreset(id, title);

    this.savePresetEl.value.showFeedBack('Saved');
  }

  async #handleDeletePreset() {
    try {
      await this.dialog('confirm', 'Are you sure to delete this preset?');
    } catch (error) {
      return;
    }

    this.deletePreset(this.preset);

    this.deletePresetEl.value.showFeedBack('Deleted');
  }

  async #handleClearStore() {
    try {
      await this.dialog(
        'confirm',
        'Are you sure to clear the local store?',
      );
    } catch (error) {
      return;
    }

    this.clearStore();

    this.clearStoreEl.value.showFeedBack('Cleared');
  }

  async #handleResetStore() {
    try {
      await this.dialog(
        'confirm',
        'Are you sure to reset all settings?',
      );
    } catch (error) {
      return;
    }

    this.reset();

    this.resetStoreEl.value.showFeedBack('Resetted');
  }

  #handleCloseSettings() {
    this.showSettings = false;
  }

  #handlePresetChange(event) {
    const id = event.detail.value;

    this.preset = id;

    this.loadPreset(id);
  }

  // --- local storage

  #saveConfigToLocalStorage() {
    if (this.noStore) return;

    const { gamutPreset, preset } = this;

    const config = { gamutPreset, preset };

    window.localStorage.setItem(this.#storeConfigKey, JSON.stringify(config));
  }

  #loadConfigFromLocalStorage() {
    if (this.noStore) return;

    return JSON.parse(window.localStorage.getItem(this.#storeConfigKey));
  }

  #loadGamutPresetsFromLocalStorage() {
    if (this.noStore) return;

    return JSON.parse(window.localStorage.getItem(this.#storeGamutPresetsKey));
  }

  #saveGamutPresetsToLocalStorage(presets) {
    if (this.noStore) return;

    window.localStorage.setItem(
      this.#storeGamutPresetsKey,
      JSON.stringify(presets),
    );
  }

  #loadPresetsFromLocalStorage() {
    if (this.noStore) return;

    return JSON.parse(window.localStorage.getItem(this.#storePresetsKey));
  }

  #savePresetsToLocalStorage(presets) {
    if (this.noStore) return;

    window.localStorage.setItem(this.#storePresetsKey, JSON.stringify(presets));
  }

  // --- others ---

  #updateCubeFromGamutPreset() {
    const { gamutPreset, gamutPresets } = this;

    const index = gamutPresets.findIndex((d) => d[0] === gamutPreset);

    let { cube } = this;

    if (index !== -1) {
      cube = gamutPresets[index][2];
    }

    this.setCube(cube);
  }

  #withRanges(fn, ...args) {
    this.rangeLightness[fn](...args);
    this.rangeHue[fn](...args);
    this.rangeSaturation[fn](...args);
  }

  #drawRangesBody() {
    const {
      radius,
      thicknessSaturation,
      thicknessLightness,
      thicknessHue,
      gap,
    } = this;

    const radiusHue = radius - gap;
    const radiusSaturation = radiusHue - thicknessHue - gap;
    const radiusLightness = radiusSaturation - thicknessSaturation - gap;

    const arc = d3.arc();
    const d = arc({
      startAngle: 0,
      endAngle: TAU,
      innerRadius: radiusLightness - thicknessLightness,
      outerRadius: radius + gap,
    });

    d3.select(this.rangesBodyEl.value).attr('d', d);
  }

  // --- public ---

  dialog = createDialog.bind(this);

  setValue(value) {
    const rgb = d3.color(value);

    if (!rgb) {
      throw new Error('Could not convert to color');
    }

    const hsl = d3.hsl(rgb);

    const { h, s, l } = hsl;
    this._hslColor = [h, s, l];
  }

  resetValue() {
    const [h] = this._hslColor;

    this._hslColor = [h, 1.0, 0.5];
  }

  setCube(cube) {
    this.cube = window.structuredClone(cube);
  }

  init() {
    setTimeout(() => {
      this.#firstUpdated();
    }, 0);
  }

  async copyToClipboard() {
    await copyToClipboard(this.value);
  }

  loadGamutPresets(presets, presetId) {
    this.#saveGamutPresetsToLocalStorage(presets);

    this.gamutPresets = presets;

    if (!presetId) return;

    this.gamutPreset = presetId;
  }

  cycleGamutPreset(previous = false) {
    const { gamutPresets } = this;
    const { length: count } = gamutPresets;

    if (count < 2) return;

    if (!this.gamutPreset) {
      this.gamutPreset = gamutPresets[0][0];

      return;
    }

    const index = gamutPresets.findIndex((d) => d[0] === this.gamutPreset);
    const delta = previous ? -1 : +1;
    const nextIndex = (count + index + delta) % count;

    const [id] = gamutPresets[nextIndex];

    this.gamutPreset = id;
  }

  loadPresets(presets, presetId) {
    this.#savePresetsToLocalStorage(presets);

    this.presets = window.structuredClone(presets);

    if (!presetId) return;

    const preset = this.presets.find((d) => d[0] === presetId);

    if (!preset) {
      this.preset = '';

      return;
    }

    const [id, _title, settings] = preset;

    this.preset = id;

    this.loadSettings(settings);
  }

  cyclePreset(previous = false) {
    const { presets } = this;
    const { length: count } = presets;

    if (count < 2) return;

    if (!this.preset) {
      this.preset = presets[0][0];

      return;
    }

    const index = presets.findIndex((d) => d[0] === this.preset);
    const delta = previous ? -1 : +1;
    const nextIndex = (count + index + delta) % count;

    const [id] = presets[nextIndex];

    this.preset = id;
  }

  cycleFormat(previous = false) {
    const formats = this.displayFormatOptions;
    const { length: count } = formats;

    const index = formats.findIndex((d) => d[0] === this.displayFormat);
    const delta = previous ? -1 : +1;
    const nextIndex = (count + index + delta) % count;

    const [format] = formats[nextIndex];

    this.displayFormat = format;
  }

  // --- ranges methods

  refresh(duration = this.animationDuration) {
    this.#withRanges('update', duration);
  }

  focus(angle, duration = this.animationDuration) {
    this.#withRanges('focus', angle, duration);
  }

  blur(duration = this.animationDuration) {
    this.#withRanges('blur', duration);
  }

  // --- settings

  loadSettings(settings) {
    if ('gamutPreset' in settings) {
      const keys = this.gamutPresets.map((d) => d[0]);
      if (!keys.includes(settings.gamutPreset)) {
        settings.gamutPreset = '';
      }
    }

    Object.assign(this, settings);
  }

  getSettings() {
    const {
      backgroundColor,
      diameter,
      displayFormat,
      distortion,
      gamutPreset,
      gap,
      padding,
      segmentsHue,
      segmentsLightness,
      segmentsSaturation,
      swatchGap,
      thicknessHue,
      thicknessLightness,
      thicknessSaturation,
    } = this;

    const settings = {
      backgroundColor,
      diameter,
      displayFormat,
      distortion,
      gamutPreset,
      gap,
      padding,
      segmentsHue,
      segmentsLightness,
      segmentsSaturation,
      swatchGap,
      thicknessHue,
      thicknessLightness,
      thicknessSaturation,
    };

    return settings;
  }

  savePreset(id, title) {
    const { presets } = this;

    const settings = this.getSettings();

    const index = presets.findIndex((d) => d[0] === id);

    if (index !== -1) {
      presets[index] = [id, title, settings];
    } else {
      presets.push([id, title, settings]);
    }

    this.#savePresetsToLocalStorage(presets);

    this.preset = id;
  }

  loadPreset(id) {
    if (!id) return;

    const preset = this.presets.find((d) => d[0] === id);

    if (!preset) {
      this.preset = '';

      return;
    }

    const [_id, _title, settings] = preset;

    this.loadSettings(settings);

    this.preset = id;
  }

  deletePreset(name) {
    const presetsWithout = this.presets.filter((d) => d[0] !== name);

    this.presets = presetsWithout;

    this.#savePresetsToLocalStorage(presetsWithout);

    this.preset = '';
  }

  clearStore() {
    window.localStorage.removeItem(this.#storeConfigKey);
    window.localStorage.removeItem(this.#storeGamutPresetsKey);
    window.localStorage.removeItem(this.#storePresetsKey);
  }

  reset() {
    this.preset = '';

    this.cube = getDefaultCube();

    const { _initialSettings: settings } = this;

    settings.gamutPreset = '';

    this.loadSettings(settings);
  }

  // --- lifecycle ---

  connectedCallback() {
    super.connectedCallback();

    // -- initial settings

    this._initialSettings = this.getSettings();

    // --- load config

    if (!localStorage.getItem(this.#storeConfigKey)) {
      this.#saveConfigToLocalStorage();
    }

    const config = this.#loadConfigFromLocalStorage();

    if (config) {
      this.preset = config.preset;
      this.gamutPreset = config.gamutPreset;
    }

    // --- load presets

    if (!localStorage.getItem(this.#storePresetsKey)) {
      this.#savePresetsToLocalStorage([]);
    }

    this.presets = this.#loadPresetsFromLocalStorage() ?? [];

    // --- load gamut presets

    if (!localStorage.getItem(this.#storeGamutPresetsKey)) {
      this.#saveGamutPresetsToLocalStorage([]);
    }

    this.gamutPresets = this.#loadGamutPresetsFromLocalStorage() ?? [];
  }

  willUpdate(props) {
    if (props.has('initialValue')) {
      this.setValue(this.initialValue);
    }

    if (props.has('preset')) {
      this.loadPreset(this.preset);
    }

    if (props.has('gamutPreset')) {
      this.#updateCubeFromGamutPreset();
    }

    if (props.has('gamutPreset') || props.has('preset')) {
      this.#saveConfigToLocalStorage();
    }

    if (props.has('_hslColor') || props.has('cube')) {
      this.value = this.colorCss;
    }

    // ---

    if (props.has('value')) {
      this.#emitValueUpdate(this.value);
    }

    if (props.has('preset')) {
      this.#emitPresetUpdate(this.preset);
    }

    if (props.has('ready')) {
      this.ready && this.#emitReady();
    }
  }

  #firstUpdated() {
    const {
      animationDuration,
      gap,
      radius,
      segmentsLightness,
      segmentsHue,
      segmentsSaturation,
      thicknessLightness,
      thicknessHue,
      thicknessSaturation,
    } = this;

    const svg = this.svgEl.value;
    const context = this.rangesEl.value;

    // ---

    const radiusHue = radius;
    const radiusSaturation = radiusHue - thicknessHue - gap;
    const radiusLightness = radiusSaturation - thicknessSaturation - gap;

    this.scaleLightness = d3
      .scaleLinear([0, segmentsLightness])
      .interpolate(() => {
        return (i) => {
          const { cube } = this;
          const l = (1 / this.segmentsLightness) * i;
          const [h, s] = this._hslColor;

          const fill = rgbToCss(rybHsl2rgb([h, s, l], { cube }));
          const stroke = rgbToCss(
            rybHsl2rgb([h, s, Math.max(0, l - 0.11)], { cube }),
          );

          return {
            fill,
            stroke,
          };
        };
      });

    this.scaleSaturation = d3
      .scaleLinear([0, segmentsSaturation])
      .interpolate(() => {
        return (i) => {
          const { cube } = this;
          const s = (1 / this.segmentsSaturation) * i;
          const [h, _, l] = this._hslColor;

          const fill = rgbToCss(rybHsl2rgb([h, s, l], { cube }));
          const stroke = rgbToCss(
            rybHsl2rgb([h, s, Math.max(0, l - 0.1)], { cube }),
          );

          return {
            fill,
            stroke,
          };
        };
      });

    this.scaleHue = d3.scaleLinear([0, segmentsHue]).interpolate(() => {
      return (i) => {
        const { cube } = this;
        const h = (360 / this.segmentsHue) * i;
        const [_, s, l] = this._hslColor;

        const fill = rgbToCss(rybHsl2rgb([h, s, l], { cube }));
        const stroke = rgbToCss(
          rybHsl2rgb([h, s, Math.max(0, l - 0.1)], { cube }),
        );

        return {
          fill,
          stroke,
        };
      };
    });

    const setLightness = (index) => {
      const [h, s, _] = this._hslColor;
      const l = (1 / this.segmentsLightness) * index;

      this._hslColor = [h, s, l];

      this.rangeSaturation.update();
      this.rangeHue.update();
    };

    const setSaturation = (index) => {
      const [h, _, l] = this._hslColor;
      const s = (1 / this.segmentsSaturation) * index;

      this._hslColor = [h, s, l];

      this.rangeLightness.update();
      this.rangeHue.update();
    };

    const setHue = (index) => {
      const [_, s, l] = this._hslColor;
      const h = (360 / this.segmentsHue) * index;

      this._hslColor = [h, s, l];

      this.rangeLightness.update();
      this.rangeSaturation.update();
    };

    this.rangeLightness = RadialRange({
      animationDuration,
      colorizeFn: (_, i) => this.scaleLightness(i),
      context,
      gap,
      name: 'lightness',
      onClick: setLightness,
      radius: radiusLightness,
      segments: segmentsLightness,
      thickness: thicknessLightness,
    });

    this.rangeSaturation = RadialRange({
      animationDuration,
      colorizeFn: (_, i) => this.scaleSaturation(i),
      context,
      gap,
      name: 'saturation',
      onClick: setSaturation,
      radius: radiusSaturation,
      segments: segmentsSaturation,
      thickness: thicknessSaturation,
    });

    this.rangeHue = RadialRange({
      animationDuration,
      colorizeFn: (_, i) => this.scaleHue(i),
      context,
      gap,
      name: 'hue',
      onClick: setHue,
      radius: radiusHue,
      segments: segmentsHue,
      thickness: thicknessHue,
    });

    this.rootEl.value.addEventListener('keyup', async (event) => {
      if (event.target !== this.rootEl.value) return;

      switch (event.key) {
        case 'c':
          if (!this.valueEl.value) {
            await this.copyToClipboard();
          } else {
            await this.valueEl.value?.copyToClipboard();
          }
          break;
        case 'f':
          this.cycleFormat();
          break;
        case 'g':
          this.cycleGamutPreset();
          break;
        case 'G':
          this.cycleGamutPreset(true);
          break;
        case 'p':
          this.cyclePreset();
          break;
        case 'P':
          this.cyclePreset(true);
          break;
        case 'r':
          this.resetValue();
          break;
        case 's':
          if (!this.noSettings) {
            this.showSettings = !this.showSettings;
          }
          break;
        case 'v':
          if (!this.noValue) {
            this.showValue = !this.showValue;
          }
          break;
      }
    });

    this.#drawRangesBody();

    setTimeout(() => {
      this.ready = true;
    }, animationDuration);
  }

  firstUpdated() {
    if (this.noInit) return;

    this.#firstUpdated();
  }

  updated(props) {
    if (!this.ready) return;

    const {
      distortion,
      gap,
      radius,
      segmentsHue,
      segmentsLightness,
      segmentsSaturation,
      thicknessHue,
      thicknessLightness,
      thicknessSaturation,
    } = this;

    if (props.has('segmentsLightness')) {
      this.scaleLightness.range([0, segmentsLightness]);
      this.rangeLightness.segments(segmentsLightness);
    }
    if (props.has('segmentsSaturation')) {
      this.scaleSaturation.range([0, segmentsSaturation]);
      this.rangeSaturation.segments(segmentsSaturation);
    }
    if (props.has('segmentsHue')) {
      this.scaleHue.range([0, segmentsHue]);
      this.rangeHue.segments(segmentsHue);
    }

    const saturationRadius = radius - thicknessHue - gap;
    const lightnessRadius = saturationRadius - thicknessSaturation - gap;

    if (props.has('thicknessLightness')) {
      this.rangeLightness.thickness(thicknessLightness);
    }
    if (props.has('thicknessSaturation')) {
      this.rangeSaturation.thickness(thicknessSaturation);
      this.rangeLightness.radius(lightnessRadius);
    }
    if (props.has('thicknessHue')) {
      this.rangeHue.thickness(thicknessHue);
      this.rangeSaturation.radius(saturationRadius);
      this.rangeLightness.radius(lightnessRadius);
    }

    if (
      props.has('diameter') ||
      props.has('gap') ||
      props.has('thicknessSaturation') ||
      props.has('thicknessHue')
    ) {
      this.rangeHue.radius(radius);
      this.rangeSaturation.radius(saturationRadius);
      this.rangeLightness.radius(lightnessRadius);
    }

    if (props.has('gap')) {
      this.#withRanges('gap', gap);
    }

    if (props.has('distortion')) {
      this.#withRanges('distortion', distortion);
    }

    if (props.has('ready') || props.has('value') || props.has('cube')) {
      this.refresh();
    }

    // ---

    this.#drawRangesBody();
  }

  render() {
    return html`
      <div
        ${ref(this.rootEl)}
        class="body"
        style=${styleMap({
          display: this.show ? 'inline-flex' : 'none',
        })}
        tabindex="0"
      >
        <svg
          ${ref(this.svgEl)}
          width=${this.width}
          height=${this.height}
          viewBox=${this.viewBox}
        >
          <circle
            r=${this.innerRadius}
            stroke-width="1"
            style=${styleMap({
              fill: this.backgroundColor,
              stroke: this.backgroundColor,
            })}
          />
          <circle
            class="color"
            r=${this.swatchRadius}
            style=${styleMap({
              fill: this.colorCss,
            })}
          />
          <g
            ${ref(this.rangesEl)}
            class="ranges"
            @pointerenter=${this.#handlePointerEnter}
            @pointerleave=${this.#handlePointerLeave}
            @pointermove=${this.#handlePointerMove}
          >
            <path
              ${ref(this.rangesBodyEl)}
              class="ranges-body"
              style=${styleMap({
                fill: this.backgroundColor,
              })}
            />
          </g>
        </svg>

        ${cache(
          !this.noValue && this.showValue
            ? html`<color-picker-value
                ${ref(this.valueEl)}
                value=${this.colorCss}
                ?disabled=${!this.ready}
                ?nosettings=${this.noSettings}
                @action:show-settings=${() =>
                  (this.showSettings = !this.showSettings)}
                @update:value=${this.#handleColorInputChange}
              ></color-picker-value>`
            : html``,
        )}
        ${cache(
          !this.noSettings && this.showSettings
            ? html`<color-picker-settings>
                <color-picker-ui-field label="Presets" slot="presets">
                  <color-picker-ui-selector
                    value=${this.preset}
                    .options=${this.presetsOptions}
                    @update:value=${this.#handlePresetChange}
                  ></color-picker-ui-selector>
                </color-picker-ui-field>

                <color-picker-ui-field label="Gamut" slot="gamut">
                  <color-picker-ui-gamut
                    .dialog=${this.dialog}
                    .cube=${this.cube}
                    .preset=${this.gamutPreset}
                    .presets=${this.gamutPresets}
                    @update:preset=${this.#handleGamutPresetChange}
                    @update:cube=${this.#handleGamutCubeChange}
                    @update:presets=${this.#handleGamutPresetsChange}
                  ></color-picker-ui-gamut>
                </color-picker-ui-field>

                <color-picker-ui-field label="BG color" slot="bg-color">
                  <color-picker-ui-input
                    value=${this.backgroundColor}
                    @update:value=${this.#handleBackgroundColorChange}
                  ></color-picker-ui-input>
                </color-picker-ui-field>

                <color-picker-ui-field label="Distortion" slot="distortion">
                  <color-picker-ui-stepper-input
                    value=${this.distortion}
                    label="Distortion"
                    min="0"
                    max="8"
                    @update:value=${this.#handleDistortionChange}
                  ></color-picker-ui-stepper-input>
                </color-picker-ui-field>

                <color-picker-ui-field label="Format" slot="color-format">
                  <color-picker-ui-selector
                    value=${this.displayFormat}
                    .options=${this.displayFormatOptions}
                    nocontrols
                    @update:value=${this.#handleDisplayFormatChange}
                  ></color-picker-ui-selector>
                </color-picker-ui-field>

                <color-picker-ui-field label="Diameter" slot="diameter">
                  <color-picker-ui-stepper-input
                    value=${this.diameter}
                    label="Diameter"
                    min="128"
                    max="512"
                    @update:value=${this.#handleDiameterChange}
                  ></color-picker-ui-stepper-input>
                </color-picker-ui-field>

                <color-picker-ui-field label="Gap" slot="gap">
                  <color-picker-ui-stepper-input
                    value=${this.gap}
                    label="Gap"
                    min="0"
                    max="4"
                    @update:value=${this.#handleGapChange}
                  ></color-picker-ui-stepper-input>
                </color-picker-ui-field>

                <color-picker-ui-field label="Swatch gap" slot="swatch-gap">
                  <color-picker-ui-stepper-input
                    value=${this.swatchGap}
                    label="Swatch gap"
                    min="0"
                    max="24"
                    @update:value=${this.#handleSwatchGapChange}
                  ></color-picker-ui-stepper-input>
                </color-picker-ui-field>

                <color-picker-ui-field
                  slot="segments"
                  class="segments"
                  label="Segments"
                >
                  <color-picker-ui-field label="Hue">
                    <color-picker-ui-stepper-input
                      value=${this.segmentsHue}
                      label="Hue"
                      min="8"
                      max="128"
                      @update:value=${this.#handleSegmentsHueChange}
                    ></color-picker-ui-stepper-input>
                  </color-picker-ui-field>
                  <color-picker-ui-field label="Saturation">
                    <color-picker-ui-stepper-input
                      value=${this.segmentsSaturation}
                      label="Saturation"
                      min="1"
                      max="64"
                      @update:value=${this.#handleSegmentsSaturationChange}
                    ></color-picker-ui-stepper-input>
                  </color-picker-ui-field>
                  <color-picker-ui-field label="Lightness">
                    <color-picker-ui-stepper-input
                      value=${this.segmentsLightness}
                      label="Lightness"
                      min="1"
                      max="64"
                      @update:value=${this.#handleSegmentsLightnessChange}
                    ></color-picker-ui-stepper-input>
                  </color-picker-ui-field>
                </color-picker-ui-field>

                <color-picker-ui-field
                  slot="thickness"
                  class="thickness"
                  label="Thickness"
                >
                  <color-picker-ui-field label="Hue">
                    <color-picker-ui-stepper-input
                      value=${this.thicknessHue}
                      label="Hue"
                      min="8"
                      max="128"
                      @update:value=${this.#handleThicknessHueChange}
                    ></color-picker-ui-stepper-input>
                  </color-picker-ui-field>
                  <color-picker-ui-field label="Saturation">
                    <color-picker-ui-stepper-input
                      value=${this.thicknessSaturation}
                      label="Saturation"
                      min="1"
                      max="64"
                      @update:value=${this.#handleThicknessSaturationChange}
                    ></color-picker-ui-stepper-input>
                  </color-picker-ui-field>
                  <color-picker-ui-field label="Lightness">
                    <color-picker-ui-stepper-input
                      value=${this.thicknessLightness}
                      label="Lightness"
                      min="1"
                      max="64"
                      @update:value=${this.#handleThicknessLightnessChange}
                    ></color-picker-ui-stepper-input>
                  </color-picker-ui-field>
                </color-picker-ui-field>

                <div class="actions" slot="actions">
                  <color-picker-ui-button
                    ${ref(this.savePresetEl)}
                    feedback
                    @click=${this.preset
                      ? this.#handleUpdatePreset
                      : this.#handleSavePreset}
                    >${this.preset
                      ? 'Update Preset'
                      : 'Save Preset'}</color-picker-ui-button
                  >
                  <color-picker-ui-button
                    ${ref(this.deletePresetEl)}
                    feedback
                    ?disabled=${!this.preset}
                    @click=${this.#handleDeletePreset}
                    >Delete Preset</color-picker-ui-button
                  >
                  ${!this.noStore
                    ? html` <color-picker-ui-icon-button
                        ${ref(this.clearStoreEl)}
                        feedback
                        @click=${this.#handleClearStore}
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path
                            d="M3 3m0 3a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v12a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3z"
                          />
                          <path
                            d="M12 12m-6 0a6 6 0 1 0 12 0a6 6 0 1 0 -12 0"
                          />
                          <path d="M12 12h.01" />
                        </svg>
                      </color-picker-ui-icon-button>`
                    : html``}
                  <color-picker-ui-icon-button
                    ${ref(this.resetStoreEl)}
                    feedback
                    @click=${this.#handleResetStore}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M3.06 13a9 9 0 1 0 .49 -4.087" />
                      <path d="M3 4.001v5h5" />
                      <path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                    </svg>
                  </color-picker-ui-icon-button>
                  <color-picker-ui-button
                    class="close-button"
                    @click=${this.#handleCloseSettings}
                    >Close</color-picker-ui-button
                  >
                </div>
              </color-picker-settings>`
            : html``,
        )}
        ${this._dialogs.length > 0
          ? html` <div class="dialogs">
              ${this._dialogs.map((item) =>
                item.type === 'prompt'
                  ? html`<color-picker-ui-prompt
                      text=${item.text}
                      @continue=${item.onContinue}
                      @cancel=${item.onCancel}
                    ></color-picker-ui-prompt>`
                  : item.type === 'confirm'
                  ? html`<color-picker-ui-confirm
                      text=${item.text}
                      @continue=${item.onContinue}
                      @cancel=${item.onCancel}
                    ></color-picker-ui-confirm>`
                  : item.type === 'alert'
                  ? html`<color-picker-ui-alert
                      text=${item.text}
                      @ok=${item.onOk}
                    ></color-picker-ui-alert>`
                  : html``,
              )}
            </div>`
          : html``}
      </div>
    `;
  }

  static styles = css`
    :host {
      display: inline-flex;
    }

    .body {
      align-items: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      outline: none;
      padding: 1rem;
      position: relative;
    }

    .color {
      transition: fill 0.2s ease-out;
    }

    .shape {
      transition-duration: 0.2s;
      transition-property: fill, stroke;
      transition-timing-function: ease-out;
    }

    .ranges {
      cursor: crosshair;
    }

    .ranges-body {
      fill: black;
    }

    .segments {
      --direction: row;

      justify-content: stretch;
    }

    .segments > * {
      flex: 1 0 auto;
    }

    .thickness {
      --direction: row;

      justify-content: stretch;
    }

    .thickness > * {
      flex: 1 0 auto;
    }

    color-picker-settings {
      margin-top: 1rem;
    }

    .actions {
      display: flex;
      gap: 0.25rem;
      width: 100%;
    }

    .close-button {
      margin-left: auto;
    }

    .dialogs {
      position: absolute;
      inset: 0;
      z-index: 1000;
    }
  `;
}
