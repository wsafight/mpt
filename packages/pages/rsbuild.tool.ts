const buildPages = (pages: string[]) => {
  return pages.reduce((entry, pageName) => {
    entry[pageName] = `./src/${pageName}/index.ts`;
    return entry;
  }, {});
};

const getTagTypeFromEnvUrl = (url: string): 'css' | 'js' => {
  if (url.includes("CSS")) {
    return "css";
  }
  return "js";
};

// Inject asset from the `public` directory.
const injectHtmlTags = (envUrls: string[]) => {
  return envUrls.reduce((tags: any[], envUrl: string) => {
    const tagType = getTagTypeFromEnvUrl(envUrl)
    tags.push({
      append: false,
      tag: tagType === 'css' ? "link" : 'script',
      attrs: {
        crossorigin: "anonymous",
        ...tagType === 'css' ? { 
            href: process.env[envUrl],
            rel:  "stylesheet"
         } : {
            src: process.env[envUrl],
         },
      },
    });
    return tags;
  }, []);
};

export { buildPages, injectHtmlTags };
