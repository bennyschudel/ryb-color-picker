import { LitElement } from 'lit';

import type { ColorCube } from './main';

// ---

export type Settings = {
  backgroundColor: string;
  diameter: number;
  displayFormat: 'hex' | 'rgb';
  distortion: number;
  gamutPreset: string;
  gap: number;
  padding: number;
  segmentsHue: number;
  segmentsLightness: number;
  segmentsSaturation: number;
  swatchGap: number;
  thicknessHue: number;
  thicknessLightness: number;
  thicknessSaturation: number;
};

export type Preset = [string, string, Settings];
export type GamutPreset = [string, string, ColorCube];
export type DialogType = 'alert' | 'confirm' | 'prompt';

export class RybColorPicker extends LitElement {
  animationDuration: number;
  backgroundColor: string;
  cube: ColorCube;
  diameter: number;
  displayFormat: string;
  distortion: number;
  gamutPreset: string;
  gamutPresets: GamutPreset[];
  gap: number;
  hasPresets: boolean;
  initialValue: string;
  noInit: boolean;
  noSettings: boolean;
  noStore: boolean;
  noValue: boolean;
  padding: number;
  preset: string;
  presets: Preset[];
  ready: boolean;
  segmentsHue: number;
  segmentsLightness: number;
  segmentsSaturation: number;
  show: boolean;
  showSettings: boolean;
  showValue: boolean;
  storeConfigKey: string;
  storeGamutPresetsKey: string;
  storePresetsKey: string;
  swatchGap: number;
  thicknessHue: number;
  thicknessLightness: number;
  thicknessSaturation: number;
  value: string;
  // ---
  get color(): string;
  get colorCss(): string;
  get displayFormatOptions(): [string, string][];
  get height(): number;
  get innerRadius(): number;
  get isBusy(): boolean;
  get presetsOptions(): [string, string][];
  get radius(): number;
  get swatchRadius(): number;
  get width(): number;
  // ---
  clearFocus(duration?: number): void;
  clearStore(): void;
  copyToClipboard(): Promise<void>;
  cycleFormat(backwards?: boolean): void;
  cycleGamutPreset(backwards?: boolean): void;
  cyclePreset(backwards?: boolean): void;
  deletePreset(id: string): void;
  dialog: (type: DialogType, text: string) => Promise<void | string>;
  getSettings(): Settings;
  init(): void;
  loadGamutPresets(presets: GamutPreset[], presetId?: string): void;
  loadPreset(id: string): void;
  loadPresets(presets: Preset[], presetId?: string): void;
  loadSettings(settings: Partial<Settings>): void;
  refresh(duration?: number): void;
  reset(): void;
  resetValue(): void;
  savePreset(id: string, title: string): void;
  setCube(cube: ColorCube): void;
  setFocus(angle: number, duration?: number): void;
  setValue(value: string): void;
}
