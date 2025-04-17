# API

## Attributes

| attribute-name         | type    | default value                   | description                                                                                              |
| ---------------------- | ------- | ------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `animationDuration`    | number  | 150                             | The duration of the animations                                                                           |
| `backgroundColor`      | string  | transparent                     | The background color behind the wheel                                                                    |
| `diameter`             | number  | 320                             | The diameter of the color wheel                                                                          |
| `displayFormat`        | string  | hex                             | 'hex' or 'rgb'                                                                                           |
| `distortion`           | number  | 3                               | The distortion factor. 0 > no distortion                                                                 |
| `gamutPreset`          | string  |                                 | The current gamut preset                                                                                 |
| `gap`                  | number  | 0                               | Gap between the segments                                                                                 |
| `id`                   | string  |                                 | ID of the color picker. Setting an ID, will restore a given preset on reload.                            |
| `initialValue`         | string  |                                 | Initial value RGB color value                                                                            |
| `noSettings`           | boolean | false                           | Hide settings                                                                                            |
| `noStore`              | boolean | false                           | Do not persist to local storage                                                                          |
| `noValue`              | boolean | false                           | Hide value bar                                                                                           |
| `padding`              | number  | 30                              | Padding around the weel                                                                                  |
| `preset`               | string  |                                 | Name of the current active preset                                                                        |
| `segmentsHue`          | number  | 48                              | Number of hue segments                                                                                   |
| `segmentsLightness`    | number  | 24                              | Number of lightness segments                                                                             |
| `segmentsSaturation`   | number  | 24                              | Number of saturation segments                                                                            |
| `show`                 | boolean | true                            | Show or hide the color picker                                                                            |
| `showSettings`         | boolean | false                           | Show or hide the settings                                                                                |
| `showValue`            | boolean | false                           | Show or hide the value bar                                                                               |
| `storeConfigKey`       | string  | ryb-color-picker--{id}          | Local storage key for the config. `{id}` will be replaced with the color picker ID if one is set.        |
| `storeGamutPresetsKey` | string  | ryb-color-picker--gamut-presets | Local storage key for the gamut presets. `{id}` will be replaced with the color picker ID if one is set. |
| `storePresetsKey`      | string  | ryb-color-picker--presets       | Local storage key for the presets. `{id}` will be replaced with the color picker ID if one is set.       |
| `swatchGap`            | number  | 8                               | Gap between the rings and the swatch color                                                               |
| `thicknessHue`         | number  | 24                              | Hue ring thickness                                                                                       |
| `thicknessLightness`   | number  | 20                              | Lightness ring thickness                                                                                 |
| `thicknessSaturation`  | number  | 20                              | Saturation ring thickness                                                                                |
| `value`                | string  |                                 | The current RYB value (readonly)                                                                         |

## Properties

| property-name  | type          | default value | description                           |
| -------------- | ------------- | ------------- | ------------------------------------- |
| `cube`         | Cube          | Default Cube  | The color cube used for gamut mapping |
| `presets`      | Preset[]      | []            | An array of color presets             |
| `gamutPresets` | GamutPreset[] | []            | An array of gamut presets             |

## Getters

### `color` : [number, number, number]

> Gets the current color in RGB format modified by the current gamut.

```javascript
const currentColor = element.color;
// [r: 0-1, g: 0-1, b: 0-1]
```

### `colorCss` : string

> Gets the CSS representation of the current color.

```javascript
const currentColor = element.colorCss;
// rgb(r, g, b)
```

### `displayFormatOptions` : [string, string][]

> Gets the display format options for the color picker.

```javascript
const formatOptions = element.displayFormatOptions;
// [
//   ['hex', 'Hex'],
//   ['rgb', 'RGB'],
// ]
```

### `height` : number

> Gets the height of the color picker wheel including any padding.

### `innerRadius` : number

> Returns the inner radius of the color picker.

### `isBusy` : boolean

> Checks if the color picker is currently busy.

### `presetsOptions` : [string, string][]

> Gets the preset options for the color picker.

### `radius` : number

> Returns the outer radius of the color picker.

### `ready` : boolean

> Indicates if the color picker is ready

### `swatchRadius` : number

> Returns the radius of the swatch.

### `width` : number

> Gets the width of the color picker wheel including any padding.

## Methods

### `clearFocus` (duration: number = this.animationDuration): void

> Removes the focus with an optional animation duration.

### `clearStore` (): void

> Clears the stored configuration, gamut presets, and presets from the local storage.

### `copyToClipboard` (): Promise<void>

> Copies the current color value to the clipboard.

### `cycleFormat` (backwards: boolean): void

> Cycles through the available display formats.

### `cycleGamutPreset` (backwards: boolean): void

> Cycles through the gamut presets in the color picker.

### `cyclePreset` (backwards: boolean): void

> Cycles through the available presets.

### `deletePreset` (id: string): void

> Deletes a preset by ID from the presets list.

### `getSettings` (): Settings

> Retrieves the current settings.

### `loadGamutPresets` (presets: Preset[], presetId: string): void

> Loads the gamut presets and optionally sets the current preset.

> [Load Gamuts Example](./examples/load-gamuts.html)

### `init` (): void

> Initializes the component if the noinit property is used.

### `loadPreset` (id: string): void

> Loads a preset by its ID and applies its settings.

### `loadPresets` (presets: Preset[], presetId: string): void

> Loads the presets and applies the settings of the specified preset.

> [Load Presets Example](./examples/load-presets.html)

### `loadSettings` (settings: Partial<Settings>): void

> [Load Settings Example](./examples/load-settings.html)

> Loads and applies the provided settings.

### `refresh` (duration: number = this.animationDuration): void

> Refreshes the color wheel with the specified animation duration.

### `reset` (): void

> Resets the color picker to its default state.

### `resetValue` () : void

> Resets the saturation to 100% and the lightness to 50%.

### `savePreset` (id: string, title: string): void

> Saves a color preset with the given id and title. If a preset with the same id already exists, it updates the preset. Otherwise, it adds a new preset.

### `setCube` (cube: ColorCube): void

> Sets the gamut cube.

### `setFocus` (angle: number, duration: number = this.animationDuration): void

> Focuses on a specific angle with an optional animation duration.

### `setValue` (value: string) : void

> Sets the initial value of the color picker which is then converted to the current gamut.

## Events

### `ready`: (event)

> Fired when the color picker is ready.

### `udpate:preset`: (event)

> Fired when the preset is updated.

```javascript
.addEventListener('update:preset', (event) => {
  const value = event.detail.value
  // ...
});
```

### `udpate:value`: (event)

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
