import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

import BundleSize from 'vite-plugin-bundlesize';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ command, mode }) => {
  return {
    build: {
      sourcemap: 'hidden',
      lib: {
        entry: resolve(__dirname, './ryb-color-picker.js'),
        name: 'RybColorPicker',
        fileName: 'ryb-color-picker',
        formats: ['es'],
      },
      rollupOptions: {
        output: {
          entryFileNames(chunkInfo) {
            return '[name].min.js';
          },
        },
        external: [
          'lit',
          /^lit-html\/.*/,
        ],
      },
      chunkSizeWarningLimit: 200,
    },
    plugins: [
      BundleSize({
        stats: 'all',
        limits: [
          {
            name: "**/*",
            limit: "200 kB"
          },
        ],
      }),
    ],
  };
});
