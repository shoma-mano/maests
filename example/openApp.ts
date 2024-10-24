import { M } from "maests";

export const openApp = () => {
  M.initFlow({ appId: "com.app.app" });

  M.launchApp({ appId: "com.app.app" });

  M.tapOn("今すぐはじめる");
};
