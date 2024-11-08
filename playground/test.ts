import { execSync } from "child_process";

const test = async () => {
  console.log("Starting test");
  execSync("./android/gradlew -p ./android assembleRelease", {
    stdio: "inherit",
  });
  execSync(
    "adb install -r ./android/app/build/outputs/apk/release/app-release.apk",
    { stdio: "inherit" }
  );
  execSync("npx maests e2e/sampleFlow.ts", {
    stdio: "inherit",
  });
};
test();
