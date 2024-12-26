import { defineConfig } from "@rslib/core";

const isProduction = process.env.ENV === "production";

export default defineConfig({
  lib: [
    {
      format: isProduction ? "umd" : "esm",
      umdName: "mptBlocks",
      syntax: "es2021",
      dts: true,
    },
  ],
  output: {
    target: "web",
    externals: {},
    minify: isProduction,
  },
});
