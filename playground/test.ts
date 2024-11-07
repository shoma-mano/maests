import { execSync, spawn, spawnSync } from "child_process";

const test = async () => {
  console.log("Starting test");
  const proc = spawn("npx", ["expo", "run:android"], {
    stdio: "inherit",
  });
  execSync(`npx wait-on tcp:localhost:8081`);
  // execSync("npx maests e2e/sampleFlow.ts", {
  //   cwd: __dirname,
  //   stdio: "inherit",
  // });
  proc.kill("SIGKILL");
};
test();
