import { M } from "maests";

export const openApp = () => {
  M.initFlow({ appId: "com.my.app" });
  M.launchApp({ appId: "com.my.app" });
};
