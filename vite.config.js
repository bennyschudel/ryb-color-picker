import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

import { viteStaticCopy } from 'vite-plugin-static-copy';
import eslint from 'vite-plugin-eslint';
import BundleSize from 'vite-plugin-bundlesize';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ _command, _mode }) => {
  return {
    build: {
      sourcemap: 'hidden',
      lib: {
        entry: resolve(__dirname, './src/main.js'),
        name: 'RybColorPicker',
        fileName: 'ryb-color-picker',
        formats: ['es'],
      },
      rollupOptions: {
        output: {
          entryFileNames(_chunkInfo) {
            return '[name].min.js';
          },
        },
        external: [
          'lit',
          /^lit-html\/.*/,
          /rybitten\/.*/,
          'd3-color',
          'd3-ease',
          'd3-interpolate',
          'd3-scale',
          'd3-selection',
          'd3-shape',
          'd3-transition',
        ],
      },
      chunkSizeWarningLimit: 200,
    },
    plugins: [
      eslint(),
      viteStaticCopy({
        targets: [
          {
            src: 'src/**/*.d.ts',
            dest: 'types',
          },
        ],
      }),
      BundleSize({
        stats: 'all',
        limits: [
          {
            name: '**/*',
            limit: '200 kB',
          },
        ],
      }),
    ],
  };
});
