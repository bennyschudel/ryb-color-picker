# \<ryb-color-picker>

This is a RYB Color Picker webcomponent built using lit. It supports multiple gamut presets using the wonderful
[RYBItten](https://github.com/meodai/RYBitten) library.

## Installation

1. Install lit package

```bash
npm install lit
```

2. Install the RYB Color Picker package

```bash
npm install ryb-color-picker
```

## Usage

### Minimal example

```html
  <ryb-color-picker id="picker" initialvalue="hotpink"></ryb-color-picker>

  <script type="module">
    import 'ryb-color-picker';

    const pickerEl = document.getElementById('picker');

    pickerEl.addEventListener('update:value', (event) => {
      pickerEl.value = event.detail.value;
    });
  </script>
```

### Sync with a swatch

```html
  <ryb-color-swatch id="swatch"></ryb-color-swatch>
  <ryb-color-picker id="picker" initialvalue="hotpink"></ryb-color-picker>

  <script type="module">
    import 'ryb-color-picker';

    const swatchEl = document.getElementById('swatch');
    const pickerEl = document.getElementById('picker');

    swatchEl.addEventListener('click', (event) => {
      pickerEl.show = !pickerEl.show;
    });

    pickerEl.addEventListener('update:value', (event) => {
      swatchEl.value = event.detail.value;
    });
  </script>
```

### Preload gamut presets

The loadGamutPresets method can load predefined Gamut-Presets in the format of `[[id, title, cube], ...]`.

Gamut-Presets are persisted in localStorage. Therefore we only load the initial list if there are no Gamut-Presets defined yet.

```html
  <script type="module">
    import { cubes } from '../ryb-color-picker.js';

    const pickerEl = document.getElementById('picker');

    if (!pickerEl.gamutPresets.length) {
      const presets = Array.from(cubes, ([id, d]) => [
        id,
        d.title,
        d.cube,
      ]).filter(([id]) => {
        // filter out unused presets
        return !['rgb'].includes(id);
      });

      pickerEl.loadGamutPresets(presets);
    }
  </script>
```

## Hotkeys

There are several hotkeys that could be used. To enable them, the wheel must be given focus by clicking on it.

shortcut    | description
--------    | -----------
`c`         | copy value to clipboard
`f`         | cycle format
`g`         | cygle gamut-preset
`shift + g` | cycle gamut-preset backwards
`p`         | cycle preset
`shift + p` | cycle preset backwards
`r`         | reset value (good if the color is to dark, to bright or to desaturated)
`s`         | toggle settings
`v`         | toggle value bar

## Attributes

There are many attributes that could be set to customise the look and feel of the color picker.

attribute-name         | type    | default value                   | description
--------------         | ----    | -------------                   | -----------
`animationduration`    | Number  | 150                             | The duration of the animations
`backgroundcolor`      | String  | transparent                     | The background color behind the wheel
`diameter`             | Number  | 320                             | The diameter of the color wheel
`displayformat`        | String  | hex                             | 'hex' or 'rgb'
`distortion`           | Number  | 3                               | The distortion factor. 0 > no distortion
`gamutpreset`          | String  |                                 | The current gamut preset
`gap`                  | Number  | 0                               | Gap between the segments
`id`                   | String  |                                 | ID of the color picker. Setting an ID, will restore a given preset on reload.
`initialvalue`         | String  |                                 | Initial value RGB color value
`nosettings`           | Boolean | false                           | Hide settings
`nostore`              | Boolean | false                           | Do not persist to local storage
`novalue`              | Boolean | false                           | Hide value bar
`padding`              | Number  | 30                              | Padding around the weel
`preset`               | String  |                                 | Name of the current active preset
`segmentshue`          | Number  | 48                              | Number of hue segments
`segmentslightness`    | Number  | 24                              | Number of lightness segments
`segmentssaturation`   | Number  | 24                              | Number of saturation segments
`show`                 | Boolean | true                            | Show or hide the color picker
`showsettings`         | Boolean | false                           | Show or hide the settings
`showvalue`            | Boolean | false                           | Show or hide the value bar
`storeconfigkey`       | String  | ryb-color-picker--{id}          | Local storage key for the config. `{id}` will be replaced with the color picker ID if one is set.
`storegamutpresetskey` | String  | ryb-color-picker--gamut-presets | Local storage key for the gamut presets. `{id}` will be replaced with the color picker ID if one is set.
`storepresetskey`      | String  | ryb-color-picker--presets       | Local storage key for the presets. `{id}` will be replaced with the color picker ID if one is set.
`swatchgap`            | Number  | 8                               | Gap between the rings and the swatch color
`thicknesshue`         | Number  | 24                              | Hue ring thickness
`thicknesslightness`   | Number  | 20                              | Lightness ring thickness
`thicknesssaturation`  | Number  | 20                              | Saturation ring thickness
`value`                | String  |                                 | The current RYB value (readonly)

## Examples

There are examples provided in the `examples/` folder.

## License

`<ryb-color-picker>` is distributed under the [MIT License](./LICENSE).
