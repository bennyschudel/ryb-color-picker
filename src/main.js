export { cubes } from 'rybitten/cubes';

import { ColorPickerUiAlert } from './ColorPickerUiAlert.js';
import { ColorPickerUiButton } from './ColorPickerUiButton.js';
import { ColorPickerUiConfirm } from './ColorPickerUiConfirm.js';
import { ColorPickerUiDialog } from './ColorPickerUiDialog.js';
import { ColorPickerUiField } from './ColorPickerUiField.js';
import { ColorPickerUiGamut } from './ColorPickerUiGamut.js';
import { ColorPickerUiGamutCube } from './ColorPickerUiGamutCube.js';
import { ColorPickerUiIcon } from './ColorPickerUiIcon.js';
import { ColorPickerUiIconButton } from './ColorPickerUiIconButton.js';
import { ColorPickerUiInput } from './ColorPickerUiInput.js';
import { ColorPickerUiPrompt } from './ColorPickerUiPrompt.js';
import { ColorPickerUiSelector } from './ColorPickerUiSelector.js';
import { ColorPickerUiSeparator } from './ColorPickerUiSeparator.js';
import { ColorPickerUiStepperInput } from './ColorPickerUiStepperInput.js';
import { ColorPickerUiToolTip } from './ColorPickerUiToolTip.js';

import { ColorPickerSettings } from './ColorPickerSettings.js';
import { ColorPickerValue } from './ColorPickerValue.js';

import { RybColorSwatch } from './RybColorSwatch.js';
import { RybColorPicker } from './RybColorPicker.js';

export {
  RybColorSwatch,
  RybColorPicker,
};

// ---

window.customElements.define('color-picker-ui-alert', ColorPickerUiAlert);
window.customElements.define('color-picker-ui-button', ColorPickerUiButton);
window.customElements.define('color-picker-ui-confirm', ColorPickerUiConfirm);
window.customElements.define('color-picker-ui-dialog', ColorPickerUiDialog);
window.customElements.define('color-picker-ui-field', ColorPickerUiField);
window.customElements.define('color-picker-ui-gamut', ColorPickerUiGamut);
window.customElements.define('color-picker-ui-gamut-cube', ColorPickerUiGamutCube);
window.customElements.define('color-picker-ui-icon', ColorPickerUiIcon);
window.customElements.define('color-picker-ui-icon-button', ColorPickerUiIconButton);
window.customElements.define('color-picker-ui-input', ColorPickerUiInput);
window.customElements.define('color-picker-ui-prompt', ColorPickerUiPrompt);
window.customElements.define('color-picker-ui-selector', ColorPickerUiSelector);
window.customElements.define('color-picker-ui-separator', ColorPickerUiSeparator);
window.customElements.define('color-picker-ui-stepper-input', ColorPickerUiStepperInput);
window.customElements.define('color-picker-ui-tool-tip', ColorPickerUiToolTip);

window.customElements.define('color-picker-settings', ColorPickerSettings);
window.customElements.define('color-picker-value', ColorPickerValue);

window.customElements.define('ryb-color-swatch', RybColorSwatch);
window.customElements.define('ryb-color-picker', RybColorPicker);
