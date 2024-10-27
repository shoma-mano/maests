#!/usr/bin/env node
import fs, { writeFileSync } from "fs";
import path, { join } from "path";
import createJiti from "jiti";
import dotenv from "dotenv";
import { consola } from "consola";
import { rewriteCode } from "./rewriteCode.mjs";
import { defineCommand, runMain } from "citty";
import { createOutPath } from "./utils.mjs";
import { execSync } from "child_process";
const main = defineCommand({
  args: {
    path: {
      type: "positional",
      required: true
    }
  },
  async run({ args }) {
    loadEnv();
    const flowPath = args.path;
    const outPath = createOutPath(flowPath);
    let code = fs.readFileSync(flowPath, "utf-8");
    code = rewriteCode({ code, outPath });
    const tempFilePath = join(
      process.cwd(),
      `${flowPath.replace(".ts", ".temp.ts")}`
    );
    writeFileSync(tempFilePath, code);
    try {
      const cwd = process.cwd();
      const jiti = createJiti(cwd, { interopDefault: true, esmResolve: true });
      await jiti(tempFilePath);
      consola.success(`Created ${outPath} \u2714`);
      execSync(`maestro test ${outPath}`, {
        stdio: "inherit",
        env: process.env
      });
    } catch (e) {
      console.error(e);
      fs.unlinkSync(tempFilePath);
    }
  }
});
if (true) runMain(main);
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
