import { execSync, spawn } from "child_process";

const test = async () => {
  const playgroundDir = __dirname;
  const expoProc = spawn(`cd ${playgroundDir} && npx expo run:android`, {
    stdio: "inherit",
  });
  execSync(`npx wait-on tcp:localhost:8081`);
  expoProc.kill();
  console.log("Process killed");
};
test();
