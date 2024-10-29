import { existsSync, mkdirSync } from "fs";
import path, { join } from "path";
import { out, resetOut } from "./commands/commands";

export const yamlFlowDir = path.join(process.cwd(), "maests");
if (!existsSync(yamlFlowDir)) mkdirSync(yamlFlowDir);

export const createOutPath = (tsFlowPath: string) => {
  return join(yamlFlowDir, tsFlowPath.replace(".ts", ".yaml"));
};

export const getOutput = () => {
  const currentOutput = out;
  resetOut();
  return currentOutput;
};
