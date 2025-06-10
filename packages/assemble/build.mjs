import { constants, copyFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  changeHtmlContentForBusiness,
  changeHtmlContentForCommonFiles,
  copyDir,
  getAssetsPathFromDir,
  readJsonFile,
  removeDir,
} from './utils.mjs';

const __dirname = import.meta.dirname;

// 打包目标文件夹
const targetPath = join(__dirname, '../../dist');

// pages 文件打包完成路径
const pagesPath = join(__dirname, '../pages/dist');

// block 文件打包完成路径
const blocksPath = join(__dirname, '../blocks/dist');

// 配置文件，使用 find-up 太慢了
const configPath = join(__dirname, '../../mpt.config.json');

// 组装 mpt 文件
const assemble = () => {
  // 如果文件存在，删除文件
  removeDir(targetPath);

  // 拷贝页面文件
  copyDir(pagesPath, targetPath);

  // 获取配置文件，配置项待完善
  const config = readJsonFile(configPath);

  const { cssPath: blockCssPath, jsPath: blockJsPath } =
    getAssetsPathFromDir(blocksPath);

  // 拷贝“块”文件
  copyFileSync(
    join(blocksPath, blockJsPath),
    join(__dirname, `../../dist/${blockJsPath}`),
    constants.COPYFILE_EXCL,
  );

  copyFileSync(
    join(blocksPath, blockCssPath),
    join(__dirname, `../../dist/${blockCssPath}`),
    constants.COPYFILE_EXCL,
  );

  const serveBase = config?.base;

  // 修改 html 页面 - 通用文件
  changeHtmlContentForCommonFiles({
    targetDir: targetPath,
    serveBase,
    blockCssPath,
    blockJsPath,
  });

  // 修改 html 页面 - 业务处理
  changeHtmlContentForBusiness();
};

assemble();
