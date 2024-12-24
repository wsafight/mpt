import { defineConfig, loadEnv } from "@rsbuild/core";
import { pluginVue } from "@rsbuild/plugin-vue";
import { pluginHtmlMinifierTerser } from "rsbuild-plugin-html-minifier-terser";

const buildPages = (pages: string[]) => {
  return pages.reduce((entry, pageName) => {
    entry[pageName] = `./src/${pageName}/index.ts`;
    return entry;
  }, {});
};

// Inject asset from the `public` directory.
const injectHtmlTags = () => [
  {
    tag: "link",
    append: false,
    attrs: {
      href: process.env.ELEMENT_CSS_URL,
      rel: "stylesheet",
      crossorigin: "anonymous",
    },
  },
  {
    tag: "script",
    append: false,
    attrs: { src: process.env.VUE_JS_URL, crossorigin: "anonymous" },
  },
  {
    tag: "script",
    append: false,
    attrs: { src: process.env.ELEMENT_JS_URL, crossorigin: "anonymous" },
  },
];

export default defineConfig({
  source: {
    entry: buildPages(["parent", "sale"]),
  },
  plugins: [pluginVue(), pluginHtmlMinifierTerser()],
  html: {
    template: "./static/index.html",
    tags: injectHtmlTags(),
  },
  output: {
    externals: {
      vue: "Vue",
      "element-plus": "ElementPlus",
    },
  },
});
