import {
  constants,
  copyFileSync,
  cpSync,
  existsSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from "fs";
import { join } from "path";

const readJsonFile = (jsonPath) => {
  const configContent = readFileSync(jsonPath, "utf-8");
  try {
    return JSON.parse(configContent);
  } catch (err) {
    return {};
  }
};

const removeDir = (targetDir) => {
  if (!existsSync(targetDir)) {
    return;
  }
  rmSync(targetDir, { recursive: true });
};

const copyDir = (sourcePath, targetPath) => {
  cpSync(sourcePath, targetPath, { recursive: true });
};

const getAssetsPathFromDir = (path) => {
  // 查找 hash js 文件
  const files = readdirSync(path);
  const jsPath = files.find((file) => file.endsWith(".js"));
  const cssPath = files.find((file) => file.endsWith(".css"));
  return { jsPath, cssPath };
};

const changeHtmlContentForCommonFiles = ({
  targetDir,
  serveBase,
  blockJsPath,
  blockCssPath,
}) => {
  const htmlList = readdirSync(targetDir).filter((file) =>
    file.endsWith(".html")
  );

  htmlList.forEach((html) => {
    const htmlPath = join(targetDir, html);
    const content = readFileSync(htmlPath, "utf-8");

    const blockJsStr = join(serveBase, blockJsPath);
    const blockCssStr = join(serveBase, blockCssPath);

    const newContent = content
      .replace(`inject="block.js"`, `src="${blockJsStr}"`)
      .replace(`inject="block.css"`, `href="${blockCssStr}"`);
    writeFileSync(htmlPath, newContent);
  });
};

const changeHtmlContentForBusiness = () => {};

export {
  readJsonFile,
  removeDir,
  copyDir,
  getAssetsPathFromDir,
  changeHtmlContentForCommonFiles,
  changeHtmlContentForBusiness,
};
