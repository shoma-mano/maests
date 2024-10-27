#!/usr/bin/env node
import fs, { writeFileSync } from "fs";
import path, { join } from "path";
import createJiti from "jiti";
import dotenv from "dotenv";
import { consola } from "consola";
import { rewriteCode } from "./rewriteCode";
import { defineCommand, runMain } from "citty";
import { createOutPath } from "./utils";
import { execSync } from "child_process";

const main = defineCommand({
  args: {
    path: {
      type: "positional",
      required: true,
    },
  },
  async run({ args }) {
    loadEnv();
    const flowPath = args.path;
    const outPath = createOutPath(flowPath);
    let code = fs.readFileSync(flowPath, "utf-8");
    code = rewriteCode({ code, outPath });

    const tempFilePath = join(
      process.cwd(),
      `${flowPath.replace(".maestro.ts", ".temp.ts")}`
    );
    writeFileSync(tempFilePath, code);

    const cwd = process.cwd();
    const jiti = createJiti(cwd, { interopDefault: true, esmResolve: true });
    await jiti(tempFilePath);
    consola.success(`Created ${outPath} ✔`);
    execSync(`maestro test ${outPath}`, { stdio: "inherit" });

    // remove temp file
    fs.unlinkSync(tempFilePath);
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
