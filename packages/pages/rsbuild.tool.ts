import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { HtmlTagDescriptor } from '@rsbuild/core';

const configStr = readFileSync(join(__dirname, '../../mpt.config.json') , "utf-8");
export const config = JSON.parse(configStr);

const buildPages = (pages: string[]) => {
  return pages.reduce((entry, pageName) => {
    entry[pageName] = `./src/${pageName}/index.ts`;
    return entry;
  }, {});
};

const isProduction = 'production' === process.env.NODE_ENV;

const getTagTypeFromEnvUrl = (url: string): 'css' | 'js' => {
  if (url.includes('CSS')) {
    return 'css';
  }
  return 'js';
};

// Inject asset from the `public` directory.
const injectHtmlTags = (envUrls: string[]) => {
  const globalTags = envUrls.reduce((tags: HtmlTagDescriptor[], envUrl: string) => {
    const tagType = getTagTypeFromEnvUrl(envUrl);
    tags.push({
      append: false,
      tag: tagType === 'css' ? 'link' : 'script',
      attrs: {
        crossorigin: 'anonymous',
        ...(tagType === 'css'
          ? {
              href: process.env[envUrl],
              rel: 'stylesheet',
            }
          : {
              src: process.env[envUrl],
            }),
      },
    });
    return tags;
  }, []);
  let workSpaceTags: HtmlTagDescriptor[] = [];
  if (isProduction) {
    workSpaceTags = [
      {
        append: false,
        tag: 'link',
        attrs: {
          crossorigin: 'anonymous',
          rel: 'stylesheet',
          inject: 'block.css',
        },
      },
      {
        append: false,
        tag: 'script',
        attrs: {
          crossorigin: 'anonymous',
          inject: 'block.js',
        },
      },
    ];
  }
  return globalTags.concat(workSpaceTags);
};

export { isProduction, buildPages, injectHtmlTags };
