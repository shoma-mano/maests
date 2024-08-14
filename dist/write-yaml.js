import { writeFileSync } from "fs";
import { out, resetOut } from "./commands.js";
export const writeYaml = (path) => {
    console.log('out', out);
    writeFileSync(`./${path.replace(".maestro.ts", ".yaml")}`, out);
    resetOut();
};
//# sourceMappingURL=write-yaml.js.map