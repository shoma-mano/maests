import { getOutput, M } from "maests";
import { join } from "path";
import { openApp } from "./utils/openApp";

openApp();
M.runScript({ path: join(__dirname, "utils/script.ts") });
M.runFlow({
  flow: () => {
    // use variables set in script.ts
    M.assertVisible({ id: getOutput("id") });
  },
});
