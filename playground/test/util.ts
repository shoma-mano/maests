import { execSync } from "child_process";

const getBootedDevices = () => {
  const booted = execSync("adb devices -l")
    .toString()
    .split("\n")
    .slice(1)
    .filter((line) => line.includes("device"));

  return booted;
};

export const getFirstAVD = () => {
  return execSync("emulator -list-avds")
    .toString()
    .split("\n")
    .filter((line) => line && !line.includes("INFO"));
};

export const getEmulatorNames = () => {
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
};
