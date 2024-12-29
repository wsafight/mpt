import { defineConfig } from '@rsbuild/core';
import { pluginCssMinimizer } from '@rsbuild/plugin-css-minimizer';
import { pluginImageCompress } from '@rsbuild/plugin-image-compress';
import { pluginVue } from '@rsbuild/plugin-vue';
import { pluginHtmlMinifierTerser } from 'rsbuild-plugin-html-minifier-terser';
import { pluginIfdef } from './plugin';
import {
  buildPages,
  config,
  injectHtmlTags,
  isProduction,
} from './rsbuild.tool';

const { base, assetsRetry } = config;

export default defineConfig({
  source: {
    entry: buildPages(['index', 'demo1', 'demo2']),
  },
  server: {
    base,
  },
  plugins: [
    pluginIfdef({ env: process.env }),
    pluginVue(),
    pluginHtmlMinifierTerser(),
    pluginCssMinimizer(),
    pluginImageCompress(),
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
