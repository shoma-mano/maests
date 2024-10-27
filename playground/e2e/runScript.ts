import { M } from "maests";
import { join } from "path";

M.initFlow({ appId: "com.my.app" });
M.runScript({ path: join(__dirname, "script.ts") });
M.launchApp({ appId: "com.my.app" });
M.stopApp();
