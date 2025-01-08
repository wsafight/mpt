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

const __dirname = import.meta.dirname;

const targetDir = join(__dirname, "../../dist");

const configStr = readFileSync(
	join(__dirname, "../../mpt.config.json"),
	"utf-8",
);
const config = JSON.parse(configStr);

const serveBase = config?.base;

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
	const blockcss = files.find((file) => file.endsWith(".css"));

	copyFileSync(
		join(blockPath, blockjs),
		join(__dirname, `../../dist/${blockjs}`),
		constants.COPYFILE_EXCL,
	);

	copyFileSync(
		join(blockPath, blockcss),
		join(__dirname, `../../dist/${blockcss}`),
		constants.COPYFILE_EXCL,
	);

	const htmls = readdirSync(targetDir).filter((file) => file.endsWith(".html"));
	htmls.forEach((html) => {
		const htmlPath = join(targetDir, html);
		const content = readFileSync(htmlPath, "utf-8");
		const blockJsStr = join(serveBase, blockjs)
		const blockCssStr = join(serveBase, blockjs)
		const newContent = content
			.replace(
				`inject="block.js"`,
				`src="${blockJsStr}"`,
			)
			.replace(`inject="block.css"`, `href="${blockCssStr}"`);
		writeFileSync(htmlPath, newContent);
	});
};

assemble();
