import { defineConfig } from '@rsbuild/core';
import { pluginVue } from '@rsbuild/plugin-vue';
import { pluginHtmlMinifierTerser } from 'rsbuild-plugin-html-minifier-terser';
import { buildPages, injectHtmlTags, isProduction } from './rsbuild.tool';

export default defineConfig({
  source: {
    entry: buildPages(['index', 'demo1', 'demo2']),
  },
  plugins: [pluginVue(), pluginHtmlMinifierTerser()],
  html: {
    template: './static/index.html',
    tags: injectHtmlTags([
      'ELEMENT_CSS_URL',
      'VUE_JS_URL',
      'VUE_ROUTER_JS_URL',
      'ELEMENT_JS_URL',
    ]),
  },
  output: {
    externals: {
      vue: 'Vue',
      'vue-router': 'VueRouter',
      'element-plus': 'ElementPlus',
      ...(isProduction && {
        '@mpt/layouts': 'mptLayouts',
      }),
    },
  },
});
