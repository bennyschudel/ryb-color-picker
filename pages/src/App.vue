<script setup lang="ts">
import { computed, onMounted, ref, useTemplateRef } from 'vue';
import { useEventListener, useDark, useToggle } from '@vueuse/core';

import 'ryb-color-picker';
import type { GamutPreset, Preset, RybColorPicker } from 'ryb-color-picker';

import { cubes } from 'rybitten/cubes';

import { APP_VERSION, API_DOCUMENTATION_URL, GITHUB_URL } from './config';

const initialColor = ref('hotpink');

const color = ref('black');

const isDark = useDark();
const toggleDark = useToggle(isDark);

const rootStyles = computed(() => {
  return {
    '--background-color': color.value,
  };
});

function handleValueUpdate(event: CustomEvent) {
  color.value = event.detail.value;
}

const pickerEl = useTemplateRef<RybColorPicker>('picker');

const presets: Preset[] = [
  [
    'my-preset',
    'My Preset',
    {
      backgroundColor: 'white',
      diameter: 320,
      displayFormat: 'hex',
      distortion: 3,
      gamutPreset: 'itten-normalized',
      gap: 0,
      padding: 30,
      segmentsHue: 48,
      segmentsLightness: 24,
      segmentsSaturation: 24,
      swatchGap: 8,
      thicknessHue: 24,
      thicknessLightness: 20,
      thicknessSaturation: 20,
    },
  ],
  [
    'my-preset-2',
    'My Preset 2',
    {
      backgroundColor: 'transparent',
      diameter: 420,
      displayFormat: 'rgb',
      distortion: 3,
      gamutPreset: 'munsell',
      gap: 1,
      padding: 30,
      segmentsHue: 48,
      segmentsLightness: 12,
      segmentsSaturation: 12,
      swatchGap: 8,
      thicknessHue: 40,
      thicknessLightness: 28,
      thicknessSaturation: 28,
    },
  ],
];

onMounted(() => {
  if (pickerEl.value) {
    const gamutPresets: GamutPreset[] = Array.from(cubes, ([id, d]) => [
      id,
      d.title,
      d.cube,
    ]);

    pickerEl.value.loadGamutPresets(gamutPresets, 'itten-normalized');

    pickerEl.value.loadPresets(presets, 'my-preset');

    useEventListener(pickerEl.value, 'update:value', handleValueUpdate);
  }
});
</script>

<template>
  <div class="app" :style="rootStyles">
    <div class="body">
      <div class="head">
        <button @click="toggleDark()">
          <span class="ml-2">{{ isDark ? 'Dark' : 'Light' }}</span>
        </button>
        <a :href="API_DOCUMENTATION_URL">API Documentation</a>
        <a :href="GITHUB_URL">Github</a>
      </div>

      <h1>&lt;ryb-color-picker&gt;</h1>

      <div class="badge">{{ APP_VERSION }}</div>

      <ryb-color-picker
        ref="picker"
        :initialValue="initialColor"
        hasPresets
      ></ryb-color-picker>

      <p class="note">
        2025, by
        <a href="https://twitter.com/bennyschudel" target="_blank"
          >@bennyschudel</a
        >, MIT License
      </p>
    </div>
  </div>
</template>

<style scoped>
.app {
  padding: 96px 0;
  background-color: var(--background-color);
}

.body {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: light-dark(#f0f0f0, #202020);
  border-radius: 16px;
  box-shadow: 2px 2px 8px 0 hsla(0, 0%, 0%, 0.2);
}

h1 {
  display: block;
  font-size: 40px;
  background: linear-gradient(
    to right in hsl shorter hue,
    hsl(330 100 70.59),
    hsl(60 100 70.59)
  );
  color: transparent;
  background-clip: text;
  margin-bottom: 0;
  -webkit-background-clip: text;
}

h2 {
  font-size: 24px;
  margin-top: 64px;
}

code {
  background-color: light-dark(#f0f0f0, #202020);
  padding: 12px 16px;
  border-radius: 4px;
}

.head {
  align-items: center;
  display: inline-flex;
  gap: 16px;
  margin-top: 16px;
}

.badge {
  background-color: light-dark(#d0d0d0, #303030);
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
}

.note {
  margin-top: 64px;
}
</style>
