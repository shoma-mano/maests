import { writeFileSync } from "fs";
import { out, resetOut } from "./commands";
export const writeYaml = (path: string) => {
  console.log("out", out);
  writeFileSync(`./${path.replace(".maestro.ts", ".yaml")}`, out);
  resetOut();
};
