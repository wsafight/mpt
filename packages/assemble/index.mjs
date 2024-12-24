console.log("开始组装");
import fs, {constants} from "fs";

fs.cpSync("../pages/dist", "./dist", { recursive: true });

fs.copyFileSync('../layouts/src/index.js', './dist/static/js/index.js', constants.COPYFILE_EXCL)
