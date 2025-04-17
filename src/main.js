import { RybColorPickerUiAlert } from './ui/RybColorPickerUiAlert.js';
import { RybColorPickerUiButton } from './ui/RybColorPickerUiButton.js';
import { RybColorPickerUiConfirm } from './ui/RybColorPickerUiConfirm.js';
import { RybColorPickerUiDialog } from './ui/RybColorPickerUiDialog.js';
import { RybColorPickerUiField } from './ui/RybColorPickerUiField.js';
import { RybColorPickerUiGamut } from './ui/RybColorPickerUiGamut.js';
import { RybColorPickerUiGamutCube } from './ui/RybColorPickerUiGamutCube.js';
import { RybColorPickerUiIcon } from './ui/RybColorPickerUiIcon.js';
import { RybColorPickerUiIconButton } from './ui/RybColorPickerUiIconButton.js';
import { RybColorPickerUiInput } from './ui/RybColorPickerUiInput.js';
import { RybColorPickerUiPrompt } from './ui/RybColorPickerUiPrompt.js';
import { RybColorPickerUiSelector } from './ui/RybColorPickerUiSelector.js';
import { RybColorPickerUiSeparator } from './ui/RybColorPickerUiSeparator.js';
import { RybColorPickerUiStepperInput } from './ui/RybColorPickerUiStepperInput.js';
import { RybColorPickerUiToolTip } from './ui/RybColorPickerUiToolTip.js';

import { RybColorPickerSettings } from './RybColorPickerSettings.js';
import { RybColorPickerValue } from './RybColorPickerValue.js';

import { RybColorSwatch } from './RybColorSwatch.js';
import { RybColorPicker } from './RybColorPicker.js';

export { RybColorSwatch, RybColorPicker };

// ---

window.customElements.define(
  'ryb-color-picker-ui-alert',
  RybColorPickerUiAlert,
);
window.customElements.define(
  'ryb-color-picker-ui-button',
  RybColorPickerUiButton,
);
window.customElements.define(
  'ryb-color-picker-ui-confirm',
  RybColorPickerUiConfirm,
);
window.customElements.define(
  'ryb-color-picker-ui-dialog',
  RybColorPickerUiDialog,
);
window.customElements.define(
  'ryb-color-picker-ui-field',
  RybColorPickerUiField,
);
window.customElements.define(
  'ryb-color-picker-ui-gamut',
  RybColorPickerUiGamut,
);
window.customElements.define(
  'ryb-color-picker-ui-gamut-cube',
  RybColorPickerUiGamutCube,
);
window.customElements.define('ryb-color-picker-ui-icon', RybColorPickerUiIcon);
window.customElements.define(
  'ryb-color-picker-ui-icon-button',
  RybColorPickerUiIconButton,
);
window.customElements.define(
  'ryb-color-picker-ui-input',
  RybColorPickerUiInput,
);
window.customElements.define(
  'ryb-color-picker-ui-prompt',
  RybColorPickerUiPrompt,
);
window.customElements.define(
  'ryb-color-picker-ui-selector',
  RybColorPickerUiSelector,
);
window.customElements.define(
  'ryb-color-picker-ui-separator',
  RybColorPickerUiSeparator,
);
window.customElements.define(
  'ryb-color-picker-ui-stepper-input',
  RybColorPickerUiStepperInput,
);
window.customElements.define(
  'ryb-color-picker-ui-tool-tip',
  RybColorPickerUiToolTip,
);

window.customElements.define(
  'ryb-color-picker-settings',
  RybColorPickerSettings,
);
window.customElements.define('ryb-color-picker-value', RybColorPickerValue);

window.customElements.define('ryb-color-swatch', RybColorSwatch);
window.customElements.define('ryb-color-picker', RybColorPicker);
