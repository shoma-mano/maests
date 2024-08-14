import { M } from "maests";

export const openColudus = () => {
  M.initFlow({ appId: "com.coludus.coludus" });

  M.launchApp({ appId: "com.coludus.coludus" });

  M.tapOn("今すぐはじめる");
};
