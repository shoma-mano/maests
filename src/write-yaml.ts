import { existsSync, mkdirSync, writeFileSync } from "fs";
import { dirname } from "path";
import { out, resetOut } from "./out";

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
