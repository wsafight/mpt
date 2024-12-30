import axios from "redaxios";
import loadjs from "loadjs";
import "./index.css";
axios.create();

export interface JsLib {
  url: string;
  wrapper: () => any;
}

const dynamicJsLibs: Record<string, JsLib> = {
  echarts: {
    url: "//unpkg.com/echarts@5.6.0/dist/echarts.min.js",
    wrapper() {
      return (window as any).echarts;
    },
  },
};

const loadAssets = (assets: string | string[]) => {
  let inputIsArray = true;
  if (typeof assets === "string") {
    assets = [assets];
    inputIsArray = false;
  }
  const notFound = assets.find((x) => !dynamicJsLibs[x]);
  if (notFound) {
    throw new Error("Cannot found asset [" + notFound + "]");
  }
  const items = assets.map((name: string) => {
    const current = dynamicJsLibs[name];
    const result = current.wrapper();
    const isSuccess = !!result;
    return {
      name,
      isSuccess,
      result,
      ...(!isSuccess && { wrapper: current.wrapper }),
    };
  });

  // 需要加载的项
  const loadingItems = items.filter((x) => !x.isSuccess);

  // 都已经加载的场合
  if (!loadingItems.length) {
    return Promise.resolve(
      inputIsArray ? items.map((x) => x.result) : items[0].result
    );
  }

  return new Promise((resolve, reject) => {
    const urlsToLoad: string[] = loadingItems.map(
      (item) => dynamicJsLibs[item.name].url
    ) as string[];
    loadjs(urlsToLoad, {
      success: () => {
        const result = inputIsArray
          ? items.map((x) => x.wrapper!())
          : items[0].wrapper!();
        resolve(result);
      },
      error: function (urls) {
        reject(new Error("loadjs Error"));
      },
    });
  });
};

export { axios, loadAssets };
