import { writeFileSync } from "fs";
import { out, resetOut } from "./commands.mjs";
export const writeYaml = (path) => {
  console.log("out", out);
  writeFileSync(`./${path.replace(".maestro.ts", ".yaml")}`, out);
  resetOut();
};
