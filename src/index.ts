#!/usr/bin/env node
import fs, { writeFileSync } from "fs";
import path, { dirname, join } from "path";
import createJiti from "jiti";
import dotenv from "dotenv";
import { consola } from "consola";
import { rewriteCode } from "./rewriteCode";
import { defineCommand, runMain } from "citty";
import { createYamlOutPath } from "./utils";
import { execSync } from "child_process";
import { getTsconfig } from "get-tsconfig";

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
    let flowPath = args.path;
    if (flowPath.startsWith(cwd)) {
      flowPath = flowPath.replace(`${cwd}/`, "");
    }
    const yamlOutPath = createYamlOutPath(flowPath);
    let code = fs.readFileSync(flowPath, "utf-8");
    code = rewriteCode({ code, yamlOutPath });
    const tempFilePath = join(cwd, `${flowPath.replace(".ts", ".temp.ts")}`);
    writeFileSync(tempFilePath, code);

    // create jiti instance
    const { config, path } = getTsconfig();
    const normalizedAlias = Object.fromEntries(
      Object.entries(config?.compilerOptions?.paths || {}).map(
        ([key, value]) => {
          const normalizedKey = key.replace("/*", "");
          const normalizedValue = value[0].replace("/*", "");
          return [normalizedKey, join(dirname(path), normalizedValue)];
        }
      )
    );
    const jiti = createJiti(cwd, {
      esmResolve: true,
      experimentalBun: true,
      alias: normalizedAlias,
    });

    // execute temp file
    try {
      await jiti(tempFilePath);
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
    } catch (e) {
      console.error(e);
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
