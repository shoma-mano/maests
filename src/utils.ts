import { existsSync, mkdirSync } from "fs";
import path, { join } from "path";
import { fileURLToPath } from "url";

const filePath = fileURLToPath(import.meta.url);
export const yamlFlowDir = path.join(filePath, "../../maests");
if (!existsSync(yamlFlowDir)) mkdirSync(yamlFlowDir);

export const createOutPath = (tsFlowPath: string) => {
  return join(yamlFlowDir, tsFlowPath.replace(".ts", ".yaml"));
};
