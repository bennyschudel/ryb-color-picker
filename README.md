# \<ryb-color-picker> `0.5.0`

This is a RYB Color Picker web-component built using lit.\
It supports multiple gamut presets using the wonderful [RYBItten](https://github.com/meodai/RYBitten) library.

## Installation

Install the RYB Color Picker package

```bash
npm install ryb-color-picker
```

## Usage

### Minimal example

```html
<ryb-color-picker id="picker" initialValue="hotpink"></ryb-color-picker>

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
<ryb-color-picker id="picker" initialValue="hotpink"></ryb-color-picker>

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
  import { cubes } from 'rybitten/cubes';

  import 'ryb-color-picker';

  const pickerEl = document.getElementById('picker');

  if (!pickerEl.gamutPresets.length) {
    const presets = Array.from(cubes, ([id, d]) => [id, d.title, d.cube]);

    pickerEl.loadGamutPresets(presets);
  }
</script>
```

## Hotkeys

There are several hotkeys that could be used. To enable them, the wheel must be given focus by clicking on it.

| shortcut    | description                                                             |
| ----------- | ----------------------------------------------------------------------- |
| `c`         | copy value to clipboard                                                 |
| `f`         | cycle format                                                            |
| `g`         | cygle gamut-preset                                                      |
| `shift + g` | cycle gamut-preset backwards                                            |
| `p`         | cycle preset                                                            |
| `shift + p` | cycle preset backwards                                                  |
| `r`         | reset value (good if the color is to dark, to bright or to desaturated) |
| `s`         | toggle settings                                                         |
| `v`         | toggle value bar                                                        |

## API

Read the API documentation here: [API](./API.md)

## Examples

There are examples provided in the [./examples](./examples) folder.

## License

`<ryb-color-picker>` is distributed under the [MIT License](./LICENSE).
