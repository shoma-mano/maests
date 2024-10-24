#!/usr/bin/env node

import fs, { writeFileSync } from "fs";
import path from "path";
import * as Tools from "./tools";
import { fileURLToPath } from "url";
import createJiti from "jiti";
import dotenv from "dotenv";

const filePath = fileURLToPath(import.meta.url);
const distPath = path.join(filePath, "../");

// create a temp folders for later
const tempPath = distPath;
if (!fs.existsSync(tempPath)) fs.mkdirSync(tempPath);

const getDotEnvPath = () => {
  let currentPath = process.cwd();
  let dotEnvPath = "";
  while (currentPath !== "/") {
    const files = fs.readdirSync(currentPath);
    if (files.includes(".env")) {
      dotEnvPath = path.join(currentPath, ".env");
      break;
    }
    currentPath = path.join(currentPath, "../");
  }
  return dotEnvPath;
};
const dotEnvPath = getDotEnvPath();
if (dotEnvPath) {
  Tools.dim(`Found .env file at ${dotEnvPath}`);
  dotenv.config({ path: dotEnvPath });
}

const main = async () => {
  // Find flows
  const flowPaths: string[] = [];
  fs.readdirSync(".").forEach((fileName) => {
    if (fileName.includes(".maestro.")) return flowPaths.push(fileName);
  });

  const flowsCount = flowPaths.length;
  if (!flowsCount) {
    Tools.yellow("No flows found - are you in the right directory?");
    return Tools.dim(
      "File names for flows should follow the pattern `my-flow.maestro.ts`"
    );
  }
  Tools.dim(`Found ${flowsCount} flows.`);

  for (const fp of flowPaths) {
    let code = fs.readFileSync(fp, "utf-8");
    code = code.replace(
      /import.*["']maests.*\n/g,
      `
      import { M, writeYaml } from '${distPath}/commands'
      `
    );
    code += `
    writeYaml("${fp}")
    `;

    // write code to a temp file
    const tempFilePath = path.join(
      process.cwd(),
      `${fp.replace(".maestro.ts", ".temp.ts")}`
    );
    writeFileSync(tempFilePath, code);

    const cwd = process.cwd();
    const jiti = createJiti(cwd, { interopDefault: true });
    try {
      await jiti(tempFilePath);
      Tools.green(`Created ${fp} ✔`);
    } catch (error) {
      Tools.red(error);
    }
    // remove temp file
    fs.unlinkSync(tempFilePath);
  }
};

main();
