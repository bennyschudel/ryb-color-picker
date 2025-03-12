export { cubes } from 'rybitten/cubes';

import { ColorPickerUiAlert } from './src/ColorPickerUiAlert.js';
import { ColorPickerUiButton } from './src/ColorPickerUiButton.js';
import { ColorPickerUiConfirm } from './src/ColorPickerUiConfirm.js';
import { ColorPickerUiField } from './src/ColorPickerUiField.js';
import { ColorPickerUiGamut } from './src/ColorPickerUiGamut.js';
import { ColorPickerUiGamutCube } from './src/ColorPickerUiGamutCube.js';
import { ColorPickerUiIcon } from './src/ColorPickerUiIcon.js';
import { ColorPickerUiIconButton } from './src/ColorPickerUiIconButton.js';
import { ColorPickerUiInput } from './src/ColorPickerUiInput.js';
import { ColorPickerUiPrompt } from './src/ColorPickerUiPrompt.js';
import { ColorPickerUiSelector } from './src/ColorPickerUiSelector.js';
import { ColorPickerUiStepperInput } from './src/ColorPickerUiStepperInput.js';
import { ColorPickerUiToolTip } from './src/ColorPickerUiToolTip.js';

import { ColorPickerSettings } from './src/ColorPickerSettings.js';
import { ColorPickerValue } from './src/ColorPickerValue.js';

import { RybColorSwatch } from './src/RybColorSwatch.js';
import { RybColorPicker } from './src/RybColorPicker.js';

// ---

window.customElements.define('color-picker-ui-alert', ColorPickerUiAlert);
window.customElements.define('color-picker-ui-button', ColorPickerUiButton);
window.customElements.define('color-picker-ui-confirm', ColorPickerUiConfirm);
window.customElements.define('color-picker-ui-field', ColorPickerUiField);
window.customElements.define('color-picker-ui-gamut', ColorPickerUiGamut);
window.customElements.define('color-picker-ui-gamut-cube', ColorPickerUiGamutCube);
window.customElements.define('color-picker-ui-icon', ColorPickerUiIcon);
window.customElements.define('color-picker-ui-icon-button', ColorPickerUiIconButton);
window.customElements.define('color-picker-ui-input', ColorPickerUiInput);
window.customElements.define('color-picker-ui-prompt', ColorPickerUiPrompt);
window.customElements.define('color-picker-ui-selector', ColorPickerUiSelector);
window.customElements.define('color-picker-ui-stepper-input', ColorPickerUiStepperInput);
window.customElements.define('color-picker-ui-tool-tip', ColorPickerUiToolTip);

window.customElements.define('color-picker-settings', ColorPickerSettings);
window.customElements.define('color-picker-value', ColorPickerValue);

window.customElements.define('ryb-color-swatch', RybColorSwatch);
window.customElements.define('ryb-color-picker', RybColorPicker);
