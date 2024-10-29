import { M } from "maests";
import { join } from "path";
import { openApp } from "./openApp";

openApp();
M.runScript({ path: join(__dirname, "script.ts") });
M.runFlow({
  flow: () => {
    M.assertVisible("com.android.systemui:id/battery");
  },
});
