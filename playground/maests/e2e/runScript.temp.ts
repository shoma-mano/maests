import { M, writeYaml } from 'maests'
import { join } from "path";

M.initFlow({ appId: "com.my.app" });
M.runScript({ path: join(__dirname, "script.ts") });
M.stopApp();

writeYaml("/Users/mano/my-oss/maests/playground/maests/e2e/runScript.yaml")