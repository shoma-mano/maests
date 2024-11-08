import { execSync, spawn } from "child_process";
import { getEmulatorNames, getFirstAVD } from "./util";

const test = async () => {
  let proc;
  if (!process.env.CI) {
    const names = getEmulatorNames();
    // use 6000 to avoid conflicts with simulator for development
    if (!names.includes("emulator-6000")) {
      const avd = getFirstAVD();
      proc = spawn("emulator", ["-avd", avd, "-port", "6000"], {
        stdio: "inherit",
      });
    }
  }
  execSync("npx expo prebuild -p android", {
    stdio: "inherit",
  });
  execSync("./android/gradlew -p ./android assembleRelease", {
    stdio: "inherit",
  });
  execSync(
    "adb -s emulator-6000 install -r ./android/app/build/outputs/apk/release/app-release.apk",
    { stdio: "inherit" }
  );
  execSync("npx maests e2e/sampleFlow.ts", {
    stdio: "inherit",
  });
  if (proc) proc.kill();
};
test();
