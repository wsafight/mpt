import type { RsbuildPlugin } from "@rsbuild/core";

export type PluginIfdefOptions = {
  env?: Record<string, any>;
};

export const pluginIfdef = (
  options: PluginIfdefOptions = {}
): RsbuildPlugin => ({
  name: "plugin-ifdef",
  setup(api) {
    api.transform({ test: /\.ts$/ }, ({ code }) => {
      if (options.env?.NODE_ENV === "production") {
        const unlessCode = `import '@mpt/blocks/index.css';`;
        if (code.includes(unlessCode)) {
          console.log('zzz')
          return code.replace(unlessCode, '')
        }
      }
      return code;
    });
  },
});
