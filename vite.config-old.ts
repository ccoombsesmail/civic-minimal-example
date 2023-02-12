import { defineConfig, loadEnv } from 'vite'
import inject from '@rollup/plugin-inject'
import nodePolyfills from 'rollup-plugin-polyfill-node'

import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill'


import { createHtmlPlugin } from 'vite-plugin-html'
import { viteCommonjs, esbuildCommonjs } from '@originjs/vite-plugin-commonjs'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import svgLoader from 'vite-svg-loader'
import { dependencies } from './package.json'



export default defineConfig(({ mode }) => {
  const env = { ...process.env, ...loadEnv(mode, __dirname, '') }

  return {

    build: {
      sourcemap: false,
      outDir: '../dist',
      minify: false,
      cssCodeSplit: false,
      rollupOptions: {
        plugins: [
          inject(({ Buffer: ['Buffer', 'Buffer'], process: 'process'})),
          nodePolyfills(),
        ],

        external: ['fsevents', 'bigint-buffer', "Buffer"],
      },
    },

    optimizeDeps: {
      esbuildOptions: {
        plugins: [
          esbuildCommonjs(['@civic/solana-gateway-react', '@solana/wallet-adapter-react-ui']),
          NodeGlobalsPolyfillPlugin({
            process: true,
            buffer: true,
          }),
          NodeModulesPolyfillPlugin()     
        ],
        define: {
          this: 'window',
          // global: '{}'
        },
      },
    },

    server: {
      https: false,
      port: 8080,
      watch: true,
      hmr: true,
    },
    resolve: {
      alias: {
        process: "process/browser",
        stream: "stream-browserify",
        zlib: "browserify-zlib",
        util: "util",
      },
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
    },
    plugins: [
      viteCommonjs(),
      svgLoader(),
      createHtmlPlugin({}),
      svgr(),
      react({
        include: '**/*.{jsx,tsx}',
        fastRefresh: false,
        babel: {
          presets: ['@babel/preset-react'],
          plugins: ['babel-plugin-styled-components'],
        },
      }),
    ],
    esbuild: {
      define: {
        this: 'window',
      },
    },
  }
})
