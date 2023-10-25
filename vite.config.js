import { defineConfig } from 'vite'
import Icons from 'unplugin-icons/vite'
import solid from 'vite-plugin-solid'
import webExtension, { readJsonFile } from 'vite-plugin-web-extension'

export default defineConfig({
  plugins: [
    Icons({
      compiler: 'jsx',
      jsx: 'preact',
    }),
    solid(),
    webExtension({
      browser: "chrome",
      disableAutoLaunch: true,
      additionalInputs: [
        'index.html',
        'src/entrypoints/content.tsx'
      ]
    })
  ],
  build: {
    sourcemap: true,
    minify: false,

  }
})
