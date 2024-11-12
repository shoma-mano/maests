#!/usr/bin/env node
import fs, { writeFileSync } from "fs";
import path, { join } from "path";
import dotenv from "dotenv";
import { consola } from "consola";
import { rewriteCode } from "./rewrite-code";
import { defineCommand, runMain } from "citty";
import { createYamlOutPath, jiti } from "./utils";
import { execSync } from "child_process";

const main = defineCommand({
  args: {
    path: {
      type: "positional",
      required: true,
    },
    device: {
      type: "string",
      alias: "d",
      description: "Device to run the test on",
    },
  },
  async run({ args }) {
    loadEnv();
    const cwd = process.cwd();

    // create temp file
    const fullFlowPath = args.path.startsWith("/")
      ? args.path
      : join(cwd, args.path);
    const code = await rewriteCode(fullFlowPath);
    const tempFilePath = fullFlowPath.replace(".ts", ".temp.ts");
    writeFileSync(tempFilePath, code);

    // execute temp file
    const yamlOutPath = createYamlOutPath(fullFlowPath);
    try {
      await jiti.import(tempFilePath);
      consola.success(`Created Yaml to ${yamlOutPath} ✔`);
    } catch (e) {
      console.error(e);
      fs.unlinkSync(tempFilePath);
      process.exit(1);
    }
    fs.unlinkSync(tempFilePath);

    // run maestro test
    const command = `maestro ${
      args.device ? `--device ${args.device}` : ""
    } test  ${yamlOutPath}`;
    try {
      execSync(command, {
        stdio: "inherit",
        env: process.env,
      });
      console.log("Test passed");
    } catch (e) {
      if ("status" in e && e.status === 1) {
        consola.error({
          message: `Test failed: ${fullFlowPath}`,
        });
      } else {
        consola.error({
          message: `Failed to start test: ${fullFlowPath}`,
          additional: `You can check actual yaml file at ${yamlOutPath}`,
        });
      }
      process.exit(1);
    }
  },
});
if (!import.meta.vitest) runMain(main);

function loadEnv() {
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
  if (dotEnvPath) {
    consola.info(`Found .env file at ${dotEnvPath}`);
    dotenv.config({ path: dotEnvPath });
  }
}
