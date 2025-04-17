# API

## Attributes

| attribute-name         | type    | default value                       | description                                                                                              |
| ---------------------- | ------- | ----------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `animationDuration`    | number  | 150                                 | The duration of the animations                                                                           |
| `backgroundColor`      | string  | transparent                         | The background color behind the wheel                                                                    |
| `diameter`             | number  | 320                                 | The diameter of the color wheel                                                                          |
| `displayFormat`        | string  | hex                                 | 'hex' or 'rgb'                                                                                           |
| `distortion`           | number  | 3                                   | The distortion factor. 0 > no distortion                                                                 |
| `gamutPreset`          | string  |                                     | The current gamut preset                                                                                 |
| `gap`                  | number  | 0                                   | Gap between the segments                                                                                 |
| `hasPresets`           | boolean | false                               | Save and restore settings as presets.                                                                    |
| `id`                   | string  |                                     | ID of the color picker. Setting an ID, will restore a given preset on reload.                            |
| `initialValue`         | string  | hotpink                             | Initial value RGB color value                                                                            |
| `noSettings`           | boolean | false                               | Hide settings                                                                                            |
| `noStore`              | boolean | false                               | Do not persist to local storage                                                                          |
| `noValue`              | boolean | false                               | Hide value bar                                                                                           |
| `padding`              | number  | 30                                  | Padding around the weel                                                                                  |
| `preset`               | string  |                                     | Name of the current active preset                                                                        |
| `segmentsHue`          | number  | 48                                  | Number of hue segments                                                                                   |
| `segmentsLightness`    | number  | 24                                  | Number of lightness segments                                                                             |
| `segmentsSaturation`   | number  | 24                                  | Number of saturation segments                                                                            |
| `show`                 | boolean | true                                | Show or hide the color picker                                                                            |
| `showSettings`         | boolean | false                               | Show or hide the settings                                                                                |
| `showValue`            | boolean | true                                | Show or hide the value bar                                                                               |
| `storeConfigKey`       | string  | ryb-color-picker/{id}/config        | Local storage key for the config. `{id}` will be replaced with the color picker ID if one is set.        |
| `storeGamutPresetsKey` | string  | ryb-color-picker/{id}/gamut-presets | Local storage key for the gamut presets. `{id}` will be replaced with the color picker ID if one is set. |
| `storePresetsKey`      | string  | ryb-color-picker/{id}/presets       | Local storage key for the presets. `{id}` will be replaced with the color picker ID if one is set.       |
| `swatchGap`            | number  | 8                                   | Gap between the rings and the swatch color                                                               |
| `thicknessHue`         | number  | 24                                  | Hue ring thickness                                                                                       |
| `thicknessLightness`   | number  | 20                                  | Lightness ring thickness                                                                                 |
| `thicknessSaturation`  | number  | 20                                  | Saturation ring thickness                                                                                |
| `value`                | string  |                                     | The current RYB value (readonly)                                                                         |

## Properties

| property-name  | type          | default value | description                           |
| -------------- | ------------- | ------------- | ------------------------------------- |
| `cube`         | Cube          | Default Cube  | The color cube used for gamut mapping |
| `presets`      | Preset[]      | []            | An array of color presets             |
| `gamutPresets` | GamutPreset[] | []            | An array of gamut presets             |

## Getters

### `color` <sub>: [number, number, number]</sub>

> Gets the current color in RGB format modified by the current gamut.

```javascript
const currentColor = element.color;
// [r: 0-1, g: 0-1, b: 0-1]
```

### `colorCss` <sub>: string</sub>

> Gets the CSS representation of the current color.

```javascript
const currentColor = element.colorCss;
// rgb(r, g, b)
```

### `displayFormatOptions` <sub>: [string, string][]</sub>

> Gets the display format options for the color picker.

```javascript
const formatOptions = element.displayFormatOptions;
// [
//   ['hex', 'Hex'],
//   ['rgb', 'RGB'],
// ]
```

### `height` <sub>: number</sub>

> Gets the height of the color picker wheel including any padding.

### `innerRadius` <sub>: number</sub>

> Returns the inner radius of the color picker.

### `isBusy` <sub>: boolean</sub>

> Checks if the color picker is currently busy.

### `presetsOptions` <sub>: [string, string][]</sub>

> Gets the preset options for the color picker.

### `radius` <sub>: number</sub>

> Returns the outer radius of the color picker.

### `ready` <sub>: boolean</sub>

> Indicates if the color picker is ready

### `swatchRadius` <sub>: number</sub>

> Returns the radius of the swatch.

### `width` <sub>: number</sub>

> Gets the width of the color picker wheel including any padding.

## Methods

### `clearFocus` <sub>(duration: number = this.animationDuration): void</sub>

> Removes the focus with an optional animation duration.

### `clearStore` <sub>(): void</sub>

> Clears the stored configuration, gamut presets, and presets from the local storage.

### `copyToClipboard` <sub>(): Promise<void></sub>

> Copies the current color value to the clipboard.

### `cycleFormat` <sub>(backwards: boolean): void</sub>

> Cycles through the available display formats.

### `cycleGamutPreset` <sub>(backwards: boolean): void</sub>

> Cycles through the gamut presets in the color picker.

### `cyclePreset` <sub>(backwards: boolean): void</sub>

> Cycles through the available presets.

### `deletePreset` <sub>(id: string): void</sub>

> Deletes a preset by ID from the presets list.

### `getSettings` <sub>(): Settings</sub>

> Retrieves the current settings.

### `loadGamutPresets` <sub>(presets: Preset[], presetId: string): void</sub>

> Loads the gamut presets and optionally sets the current preset.\
> [Load Gamuts Example](./examples/load-gamuts.html)

### `init` <sub>(): void</sub>

> Initializes the component if the noinit property is used.

### `loadPreset` <sub>(id: string): void</sub>

> Loads a preset by its ID and applies its settings.

### `loadPresets` <sub>(presets: Preset[], presetId: string): void</sub>

> Loads the presets and applies the settings of the specified preset.\
> [Load Presets Example](./examples/load-presets.html)

### `loadSettings` <sub>(settings: Partial<Settings>): void</sub>

> Loads and applies the provided settings.\
> [Load Settings Example](./examples/load-settings.html)

### `refresh` <sub>(duration: number = this.animationDuration): void</sub>

> Refreshes the color wheel with the specified animation duration.

### `reset` <sub>(): void</sub>

> Resets the color picker to its default state.

### `resetValue` <sub>() : void</sub>

> Resets the saturation to 100% and the lightness to 50%.

### `savePreset` <sub>(id: string, title: string): void</sub>

> Saves a color preset with the given id and title. If a preset with the same id already exists, it updates the preset. Otherwise, it adds a new preset.

### `setCube` <sub>(cube: ColorCube): void</sub>

> Sets the gamut cube.

### `setFocus` <sub>(angle: number, duration: number = this.animationDuration): void</sub>

> Focuses on a specific angle with an optional animation duration.

### `setValue` <sub>(value: string) : void</sub>

> Sets the initial value of the color picker which is then converted to the current gamut.

## Events

### `ready` <sub>(event: CustomEvent) => {}</sub>

> Fired when the color picker is ready.

### `udpate:preset` <sub>(event: CustomEvent) => {}</sub>

> Fired when the preset is updated.

```javascript
.addEventListener('update:preset', (event) => {
  const value = event.detail.value
  // ...
});
```

### `udpate:value` <sub>(event: CustomEvent) => {}</sub>

> Fired when the color value is updated.

```javascript
.addEventListener('update:value', (event) => {
  const value = event.detail.value
  // ...
});
```

## Types

### `ColorCoords`

```ts
type ColorCoords = [number, number, number];
```

### `ColorCube`

```ts
type ColorCube = ColorCoords[] & { length: 8 };
```

### `GamutPreset`

```ts
type GamutPreset = [string, string, ColorCube];
```

### `Preset`

```ts
type Preset = [string, string, Settings];
```

### `Settings`

```ts
type Settings = {
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
```
