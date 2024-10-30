import { existsSync, mkdirSync } from "fs";
import path, { join } from "path";

export const yamlFlowDir = path.join(process.cwd(), "maests");
if (!existsSync(yamlFlowDir)) mkdirSync(yamlFlowDir);

export const createOutPath = (tsFlowPath: string) => {
  return join(yamlFlowDir, tsFlowPath.replace(".ts", ".yaml"));
};
