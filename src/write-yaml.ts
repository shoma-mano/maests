import { out, resetOut } from "./out";
import { writeFileWithDirectorySync } from "./utils";

export const writeYaml = (outPath?: string) => {
  writeFileWithDirectorySync(outPath, out);
  resetOut();
};
