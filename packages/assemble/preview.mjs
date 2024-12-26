import { findUpSync } from "find-up";
import { readFileSync } from "fs";
console.log("preview, 主要处理服务器 base");

const config = findUpSync("mpt.config.json");

if (!config) {
  throw new Error("未找到 mpt.config.json");
}

const json = readFileSync(config, "utf-8");

const serveBase= JSON.parse(json)?.base;

// TODO 调整路径 
if (serveBase && serveBase !== '/') {
}

// 开启服务器

