/// <reference types="@rsbuild/core/types" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue';

  // biome-ignore lint/complexity/noBannedTypes: reason
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare namespace NodeJS {
  interface ProcessEnv {
    // process.env.PUBLIC_FOO
    VUE_JS_URL: string;
  }
}
