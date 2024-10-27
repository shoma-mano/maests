#!/usr/bin/env node
import fs, { existsSync, mkdirSync, writeFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import createJiti from "jiti";
import dotenv from "dotenv";
import { consola } from "consola";
import { rewriteCode } from "./rewriteCode.mjs";
const filePath = fileURLToPath(import.meta.url);
const yamlFlowDir = path.join(filePath, "../");
if (!fs.existsSync(yamlFlowDir)) fs.mkdirSync(yamlFlowDir);
const main = async () => {
  const dotEnvPath = getDotEnvPath();
  if (dotEnvPath) {
    consola.info(`Found .env file at ${dotEnvPath}`);
    dotenv.config({ path: dotEnvPath });
  }
  const flowFileNames = [];
  fs.readdirSync(".").forEach((fileName) => {
    if (fileName.includes(".maestro.")) return flowFileNames.push(fileName);
  });
  const flowsCount = flowFileNames.length;
  if (!flowsCount) {
    consola.warn("No flows found - are you in the right directory?");
    return consola.info(
      "File names for flows should follow the pattern `my-flow.maestro.ts`"
    );
  }
  consola.info(`Found ${flowsCount} flows.`);
  if (!existsSync("maests")) mkdirSync("maests");
  for (const flowName of flowFileNames) {
    let code = fs.readFileSync(flowName, "utf-8");
    code = rewriteCode({ code, flowName });
    const tempFilePath = path.join(
      process.cwd(),
      `${flowName.replace(".maestro.ts", ".temp.ts")}`
    );
    writeFileSync(tempFilePath, code);
    const cwd = process.cwd();
    const jiti = createJiti(cwd, { interopDefault: true, esmResolve: true });
    try {
      await jiti(tempFilePath);
      consola.success(`Created ${flowName} \u2714`);
    } catch (error) {
      console.log("error", error);
      consola.error(error);
    }
    fs.unlinkSync(tempFilePath);
  }
};
main();
function getDotEnvPath() {
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
}
function createFile(filePath2) {
}
