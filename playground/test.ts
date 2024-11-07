import { execSync, spawn } from "child_process";

const test = async () => {
  console.log("Starting test");
  execSync("npx expo run:android", {
    stdio: "inherit",
  });
  execSync("npx maests e2e/sampleFlow.ts", {
    cwd: __dirname,
    stdio: "inherit",
  });
};
test();
