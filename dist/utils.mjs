import { existsSync, mkdirSync } from "fs";
import path, { join } from "path";
import { fileURLToPath } from "url";
const filePath = fileURLToPath(import.meta.url);
export const yamlFlowDir = path.join(process.cwd(), "maests");
if (!existsSync(yamlFlowDir)) mkdirSync(yamlFlowDir);
export const createOutPath = (tsFlowPath) => {
  return join(yamlFlowDir, tsFlowPath.replace(".ts", ".yaml"));
};
