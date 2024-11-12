import { existsSync, mkdirSync, writeFileSync } from "fs";
import { getTsconfig } from "get-tsconfig";
import { createJiti } from "jiti";
import { dirname, join } from "path";

const { path, config } = getTsconfig();
const tsConfigDir = dirname(path);
export const maestsDir = join(tsConfigDir, "maests");
if (!existsSync(maestsDir)) mkdirSync(maestsDir);

export const createYamlOutPath = (tsFlowPath: string) => {
  if (tsFlowPath.startsWith(tsConfigDir)) {
    tsFlowPath = tsFlowPath.replace(`${tsConfigDir}/`, "");
  }
  return join(maestsDir, tsFlowPath.replace(".ts", ".yaml"));
};

export const createScriptOutPath = (scriptFullPath: string) => {
  const scriptPath = scriptFullPath.replace(`${tsConfigDir}/`, "");
  return join(maestsDir, scriptPath.replace(".ts", ".js"));
};

export const writeFileWithDirectorySync = (filePath: string, data: string) => {
  const dir = dirname(filePath);
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
  writeFileSync(filePath, data);
};

// create jiti instance
const normalizedAlias = Object.fromEntries(
  Object.entries(config?.compilerOptions?.paths || {}).map(([key, value]) => {
    const normalizedKey = key.replace("/*", "");
    const normalizedValue = value[0].replace("/*", "");
    return [normalizedKey, join(dirname(path), normalizedValue)];
  })
);
export const jiti = createJiti(process.cwd(), {
  alias: normalizedAlias,
});
