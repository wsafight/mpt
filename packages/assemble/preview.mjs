import { readFileSync } from "node:fs";
console.log("preview, 主要处理服务器 base");

const configStr = readFileSync(join(__dirname, '../../mpt.config.json') , "utf-8");
const config = JSON.parse(configStr);

// TODO 调整路径 
if (config.base && config.base !== '/') {
}

// 开启服务器

