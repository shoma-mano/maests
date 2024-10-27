#!/usr/bin/env node
import fs, { writeFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import createJiti from "jiti";
import dotenv from "dotenv";
import { consola } from "consola";
import { rewriteCode } from "./rewriteCode.mjs";
const filePath = fileURLToPath(import.meta.url);
const distPath = path.join(filePath, "../");
const tempPath = distPath;
if (!fs.existsSync(tempPath)) fs.mkdirSync(tempPath);
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
  consola.info(`Found .env file at ${dotEnvPath}`);
  dotenv.config({ path: dotEnvPath });
}
const main = async () => {
  const flowPaths = [];
  fs.readdirSync(".").forEach((fileName) => {
    if (fileName.includes(".maestro.")) return flowPaths.push(fileName);
  });
  const flowsCount = flowPaths.length;
  if (!flowsCount) {
    consola.warn("No flows found - are you in the right directory?");
    return consola.info(
      "File names for flows should follow the pattern `my-flow.maestro.ts`"
    );
  }
  consola.info(`Found ${flowsCount} flows.`);
  for (const fp of flowPaths) {
    let code = fs.readFileSync(fp, "utf-8");
    code = rewriteCode({ code, flowPath: fp, distPath });
    const tempFilePath = path.join(process.cwd(), fp);
    writeFileSync(tempFilePath, code);
    const cwd = process.cwd();
    const jiti = createJiti(cwd, { interopDefault: true });
    try {
      await jiti(tempFilePath);
      consola.success(`Created ${fp} \u2714`);
    } catch (error) {
      consola.error(error);
    }
    fs.unlinkSync(tempFilePath);
  }
};
main();
