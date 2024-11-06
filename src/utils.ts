import { existsSync, mkdirSync, writeFileSync } from "fs";
import { getTsconfig } from "get-tsconfig";
import { dirname, join } from "path";

const { path } = getTsconfig();
const tsConfigDir = dirname(path);
export const maestsDir = join(tsConfigDir, "maests");
if (!existsSync(maestsDir)) mkdirSync(maestsDir);

export const createYamlOutPath = (tsFlowPath: string) => {
  if (tsFlowPath.startsWith(tsConfigDir)) {
    tsFlowPath = tsFlowPath.replace(`${tsConfigDir}/`, "");
  }
  return join(maestsDir, tsFlowPath.replace(".ts", ".yaml"));
};

export const createScriptOutPath = (tsScriptPath: string) => {
  if (tsScriptPath.startsWith(tsConfigDir)) {
    tsScriptPath = tsScriptPath.replace(`${tsConfigDir}/`, "");
  }
  return join(maestsDir, tsScriptPath.replace(".ts", ".js"));
};

export const writeFileWithDirectorySync = (filePath: string, data: string) => {
  const dir = dirname(filePath);
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
  writeFileSync(filePath, data);
};
