#!/usr/bin/env node
import fs, { writeFileSync } from "fs";
import path, { join } from "path";
import { fileURLToPath } from "url";
import createJiti from "jiti";
import dotenv from "dotenv";
import { consola } from "consola";
import { rewriteCode } from "./rewriteCode";
import { defineCommand, runMain } from "citty";

const filePath = fileURLToPath(import.meta.url);
const yamlFlowDir = path.join(filePath, "../");
if (!fs.existsSync(yamlFlowDir)) fs.mkdirSync(yamlFlowDir);

const main = defineCommand({
  args: {
    path: {
      type: "positional",
      required: true,
    },
  },
  async run({ args }) {
    const dotEnvPath = getDotEnvPath();
    if (dotEnvPath) {
      consola.info(`Found .env file at ${dotEnvPath}`);
      dotenv.config({ path: dotEnvPath });
    }

    const path = args.path;
    let code = fs.readFileSync(path, "utf-8");
    code = rewriteCode({ code, flowName: path });

    const tempFilePath = join(
      process.cwd(),
      `${path.replace(".maestro.ts", ".temp.ts")}`
    );
    writeFileSync(tempFilePath, code);
    // createYamlFile(path);

    const cwd = process.cwd();
    const jiti = createJiti(cwd, { interopDefault: true, esmResolve: true });
    try {
      await jiti(tempFilePath);
      consola.success(`Created ${path} ✔`);
    } catch (error) {
      console.log("error", error);
      consola.error(error);
    }
    // remove temp file
    fs.unlinkSync(tempFilePath);
  },
});
runMain(main);

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

function createYamlFile(flowPath: string) {
  const targetPath = path.join(yamlFlowDir, flowPath);
}
