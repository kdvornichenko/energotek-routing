import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import { VitePluginFonts } from 'vite-plugin-fonts'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  root: './',
  build: {
    emptyOutDir: false,
    outDir: 'public',
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`
      },
    },
  },
  publicDir: 'static',
  plugins: [
    vue(),
    VitePluginFonts({
      custom: {
        families: [
          {
          name: 'Google Sans',
          local: 'Google Sans',
          src: './src/assets/fonts/sans/*\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/',
          },
        ],
        display: 'auto',
        prefetch: false,
        injectTo: 'head-prepend',
      },
    }),
    createSvgIconsPlugin({
      // Specify the icon folder to be cached
      iconDirs: [path.resolve(process.cwd(), 'src/assets/sprite')],
      // Specify symbolId format
      symbolId: 'i-[dir]-[name]',

      /**
       * custom insert position
       * @default: body-last
       */
      inject: 'body-first',

      /**
       * custom dom id
       * @default: __svg__icons__dom__
       */
      customDomId: '__svg__icons__dom__',
      svgoOptions: {
        plugins: [
          {
            name: 'removeAttrs',
            params: {
                attrs: ['width', 'height'],
            }
          },
          {
            name: 'removeTitle',
          },
          { 
            name: 'convertColors',
            params: {
                currentColor: true
            },
          }
        ]
      }
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
