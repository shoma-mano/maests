import { M } from "maests";
import { join } from "path";
import { openApp } from "./openApp";

openApp();
M.runScript({ path: join(__dirname, "script.ts") });
M.launchApp({ appId: "com.my.app" });
// M.stopApp();
