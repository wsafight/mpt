import type { HtmlTagDescriptor } from '@rsbuild/core';

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
        tag: 'script',
        attrs: {
          crossorigin: 'anonymous',
          src: 'https://wsafight.github.io/mpt/block.js',
        },
      },
    ];
  }
  return globalTags.concat(workSpaceTags);
};

export { isProduction, buildPages, injectHtmlTags };
