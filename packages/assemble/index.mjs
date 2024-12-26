import { rmdirSync, cpSync, copyFileSync, constants } from "fs";

const assemble = () => {
  console.log("开始组装");
  rmdirSync("./dist", {recursive: true});
  cpSync("../pages/dist", "./dist", { recursive: true });
  // copyFileSync(
  //   "../layouts/src/index.js",
  //   "./dist/static/js/index.js",
  //   constants.COPYFILE_EXCL
  // );
};

assemble();
