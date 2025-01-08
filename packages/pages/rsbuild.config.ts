import { defineConfig } from '@rsbuild/core';
import { pluginCssMinimizer } from '@rsbuild/plugin-css-minimizer';
import { pluginImageCompress } from '@rsbuild/plugin-image-compress';
import { pluginVue } from '@rsbuild/plugin-vue';
import { pluginHtmlMinifierTerser } from 'rsbuild-plugin-html-minifier-terser';
import AutoImport from 'unplugin-auto-import/rspack';
// import PreprocessorDirectives from 'unplugin-preprocessor-directives/rspack'
import { pluginSass } from '@rsbuild/plugin-sass';
import { UnoCSSRspackPlugin } from '@unocss/webpack/rspack';
import { presetAttributify } from '@unocss/preset-attributify';
import { presetUno } from '@unocss/preset-uno';
import {
  buildPages,
  config,
  injectHtmlTags,
  isProduction,
} from './rsbuild.tool';
import { pluginIfdef } from './plugin';

const { base, assetsRetry } = config;

export default defineConfig({
  source: {
    entry: buildPages(['index', 'demo1', 'demo2']),
  },
  server: {
    base,
  },
  tools: {
    rspack: {
      plugins: [
        // PreprocessorDirectives(),
        UnoCSSRspackPlugin({
          presets: [presetUno(), presetAttributify()],
        }),
        AutoImport({
          include: [
            /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
            /\.vue$/,
            /\.vue\?vue/, // .vue
            /\.md$/, // .md
          ],
          imports: [
            // presets
            'vue',
            'vue-router',
          ],
        }),
      ],
    },
  },
  plugins: [
    pluginIfdef({ env: process.env }),
    pluginVue(),
    pluginHtmlMinifierTerser(),
    pluginCssMinimizer(),
    pluginImageCompress(),
    pluginSass(),
    // 视情况开启或者关闭
    // pluginAssetsRetry(),
  ],
  html: {
    template: './static/index.html',
    title: 'Mpt',
    tags: injectHtmlTags([
      'ELEMENT_CSS_URL',
      'VUE_JS_URL',
      'VUE_ROUTER_JS_URL',
      'ELEMENT_JS_URL',
    ]),
    inject: 'body',
  },
  performance: {
    removeConsole: true,
  },
  output: {
    // 是否开启内联脚本，开启后会将所有脚本内联到 html 中
    inlineScripts: true,
    distPath: {
      js: 'js',
      css: 'css',
    },
    externals: {
      vue: 'Vue',
      'vue-router': 'VueRouter',
      'element-plus': 'ElementPlus',
      ...(isProduction && {
        '@mpt/layouts': 'mptLayouts',
        '@mpt/blocks': 'mptBlocks',
      }),
    },
  },
});
