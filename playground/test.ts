import { exec, execSync, spawn } from "child_process";

const test = async () => {
  console.log("Starting test");
  const expoProc = spawn("npx", ["expo", "run:android"], {
    stdio: "inherit",
    cwd: __dirname,
  });
  // execSync(`npx wait-on tcp:localhost:8081`);
  await new Promise((resolve) => setTimeout(resolve, 60000));
  expoProc.kill();
  console.log("Process killed");
};
test();
