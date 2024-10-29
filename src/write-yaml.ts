import { existsSync, mkdirSync, writeFileSync } from "fs";
import { out, resetOut } from "./commands/commands";
import { dirname } from "path";

export const writeYaml = (outPath?: string) => {
  console.log("out", out);
  console.log("outPath", outPath);
  writeFileWithDirectorySync(outPath, out);
  resetOut();
};

function writeFileWithDirectorySync(filePath: string, data: string) {
  const dir = dirname(filePath);
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
  writeFileSync(filePath, data);
}
