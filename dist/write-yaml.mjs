import { existsSync, mkdirSync, writeFileSync } from "fs";
import { out, resetOut } from "./commands.mjs";
import { dirname } from "path";
export const writeYaml = (outPath) => {
  console.log("out", out);
  writeFileWithDirectorySync(outPath, out);
  resetOut();
};
function writeFileWithDirectorySync(filePath, data) {
  const dir = dirname(filePath);
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
  writeFileSync(filePath, data);
}
