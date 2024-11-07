import { execSync, spawn } from "child_process";

const test = async () => {
  console.log("Starting test");
  const expoProc = spawn("npx", ["expo", "run:android"], {
    stdio: "inherit",
    cwd: __dirname,
  });
  execSync(`npx wait-on tcp:localhost:8081`);
  execSync("npx tsx e2e/sampleFlow.ts", { cwd: __dirname });
  expoProc.kill();
  console.log("Process killed");
};
test();
