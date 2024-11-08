import { execSync, spawn } from "child_process";

const test = async () => {
  let proc;
  if (!process.env.CI) {
    const names = getEmulatorNames();
    // use 5584 to avoid conflicts with simulator for development
    if (!names.includes("emulator-5584")) {
      const avd = getFirstAVD();
      proc = spawn("emulator", ["-avd", avd, "-port", "5584"], {
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
    "adb -s emulator-5584 install -r ./android/app/build/outputs/apk/release/app-release.apk",
    { stdio: "inherit" }
  );
  execSync("npx maests flows/sampleFlow.ts", {
    stdio: "inherit",
  });
  if (proc) proc.kill();
};
test();

function getBootedDevices() {
  const booted = execSync("adb devices -l")
    .toString()
    .split("\n")
    .slice(1)
    .filter((line) => line.includes("device"));

  return booted;
}

function getFirstAVD() {
  return execSync("emulator -list-avds")
    .toString()
    .split("\n")
    .filter((line) => line && !line.includes("INFO"))[0];
}

function getEmulatorNames() {
  const booted = getBootedDevices();
  return booted.map((line) => {
    console.log("line:", line);
    line = line.trim();

    if (line.includes("device:panther")) {
      return line.split(" ")[0].trim();
    }

    const emulatorMatch = line.match(/^(emulator-\d+)/);
    return emulatorMatch ? emulatorMatch[1] : "";
  });
}
