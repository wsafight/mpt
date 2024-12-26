import { rmdirSync, cpSync, existsSync, copyFileSync, constants } from "fs";

const assemble = () => {
  console.log("开始组装");
  // 如果文件存在，删除文件
  if (existsSync("../../dist")) {
    rmdirSync("../../dist", { recursive: true });
  }
  cpSync("../pages/dist", "../../dist", { recursive: true });
  copyFileSync(
    "../blocks/dist/index.js",
    "../../dist/block.js",
    constants.COPYFILE_EXCL
  );
};

assemble();
