#!/usr/bin/env node
import fs, { writeFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import createJiti from 'jiti';
import dotenv from 'dotenv';

const GREEN = "\x1B[32m%s\x1B[0m";
const YELLOW = "\x1B[33m%s\x1B[0m";
const RED = "\x1B[31m%s\x1B[0m";
const DIM = "\x1B[2m%s\x1B[0m";
const green = (...data) => console.log(GREEN, ...data, "\n");
const yellow = (...data) => console.log(YELLOW, ...data, "\n");
const red = (...data) => console.log(RED, ...data, "\n");
const dim = (...data) => console.log(DIM, ...data, "\n");

const filePath = fileURLToPath(import.meta.url);
const distPath = path.join(filePath, "../");
const tempPath = distPath;
if (!fs.existsSync(tempPath))
  fs.mkdirSync(tempPath);
const getDotEnvPath = () => {
  let currentPath = process.cwd();
  let dotEnvPath2 = "";
  while (currentPath !== "/") {
    const files = fs.readdirSync(currentPath);
    if (files.includes(".env")) {
      dotEnvPath2 = path.join(currentPath, ".env");
      break;
    }
    currentPath = path.join(currentPath, "../");
  }
  return dotEnvPath2;
};
const dotEnvPath = getDotEnvPath();
if (dotEnvPath) {
  dim(`Found .env file at ${dotEnvPath}`);
  dotenv.config({ path: dotEnvPath });
}
const main = async () => {
  const flowPaths = [];
  fs.readdirSync(".").forEach((fileName) => {
    if (fileName.includes(".maestro."))
      return flowPaths.push(fileName);
  });
  const flowsCount = flowPaths.length;
  if (!flowsCount) {
    yellow("No flows found - are you in the right directory?");
    return dim(
      "File names for flows should follow the pattern `my-flow.maestro.ts`"
    );
  }
  dim(`Found ${flowsCount} flows.`);
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
    const tempFilePath = path.join(
      process.cwd(),
      `${fp.replace(".maestro.ts", ".temp.ts")}`
    );
    writeFileSync(tempFilePath, code);
    const cwd = process.cwd();
    const jiti = createJiti(cwd, { interopDefault: true });
    try {
      await jiti(tempFilePath);
      green(`Created ${fp} \u2714`);
    } catch (error) {
      red(error);
    }
    fs.unlinkSync(tempFilePath);
  }
};
main();
