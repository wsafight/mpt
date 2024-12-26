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
    filenameHash: !isProduction,
    filename: {
      js: isProduction ? "block.[hash].js" : "[name].js",
      css: isProduction ? "block.[hash].css" : "[name].css",
    },
    target: "web",
    externals: {},
    minify: isProduction,
  },
});
