import { M } from "maests";
import { nestScript } from "./nest-script";

export const openApp = () => {
  M.initFlow({ appId: "com.my.app" });
  M.launchApp({ appId: "com.my.app" });
  M.runScript(nestScript);
};
