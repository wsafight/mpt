import {
  readdirSync,
  rmSync,
  cpSync,
  existsSync,
  copyFileSync,
  constants,
  readFileSync,
  writeFileSync,
} from "fs";
import { join } from "path";
import { findUpSync } from "find-up";

const __dirname = import.meta.dirname;

const targetDir = join(__dirname, "../../dist");

const config = findUpSync("mpt.config.json");

if (!config) {
  throw new Error("未找到 mpt.config.json");
}

const json = readFileSync(config, "utf-8");

const serveBase = JSON.parse(json)?.base;

const removeDistDir = () => {
  if (!existsSync(targetDir)) {
    return;
  }
  rmSync(targetDir, { recursive: true });
};

const copyPageFiles = () => {
  cpSync(join(__dirname, "../pages/dist"), targetDir, { recursive: true });
};

// 组装 mpt 文件
const assemble = () => {
  console.log("开始组装");
  // 如果文件存在，删除文件
  removeDistDir();

  // 拷贝页面文件
  copyPageFiles();

  // 处理 blocks
  const blockPath = join(__dirname, "../blocks/dist");
  // 查找 hash js 文件
  const files = readdirSync(blockPath);
  const blockjs = files.find((file) => file.endsWith(".js"));

  copyFileSync(
    join(blockPath, blockjs),
    join(__dirname, `../../dist/${blockjs}`),
    constants.COPYFILE_EXCL
  );

  const htmls = readdirSync(targetDir).filter((file) => file.endsWith(".html"));
  console.log(htmls);
  htmls.forEach((html) => {
    const htmlPath = join(targetDir, html);
    const content = readFileSync(htmlPath, "utf-8");
    const newContent = content.replace(
      `inject="block.js"`,
      //  TODO 判断 / 结尾
      `src="${serveBase}/${blockjs}"`
    );
    writeFileSync(htmlPath, newContent);
  });
};

assemble();
