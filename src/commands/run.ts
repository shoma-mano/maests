import { buildSync } from "esbuild";
import { join } from "path";
import { stringify } from "yaml";
import { M } from "./commands";
import { addOut, getOut, handleNest } from "../out";
import { maestsDir, tsConfigDir, writeFileWithDirectorySync } from "../utils";
import { readFileSync, unlinkSync } from "fs";
import { WhenCondition } from "./type";
import { deleteExport } from "../rewrite-code";

const createScriptOutPath = (scriptFullPath: string) => {
  const scriptPath = scriptFullPath.replace(`${tsConfigDir}/`, "");
  return join(maestsDir, scriptPath.replace(".ts", ".js"));
};

export const runScript = (path: string | (() => void), funcName?: string) => {
  if (typeof path === "function") return;
  const scriptPath = createScriptOutPath(path);

  // add command that references scriptPath
  const command = `- runScript: ${scriptPath}\n`;
  addOut(command);

  // write script file to scriptPath
  const { outputFiles } = buildSync({
    entryPoints: [path],
    bundle: true,
    format: "esm",
    sourcemap: false,
    legalComments: "none",
    write: false,
  });
  let code = outputFiles[0].text;
  code = code.replace(/(?:\${)?process\.env\.([^\n\s}]*)}?/g, (_, p1) => {
    return process.env[p1] || "";
  });
  code = deleteExport(code);
  code += `\n${funcName ? `${funcName}();` : ""}`;
  writeFileWithDirectorySync(scriptPath, code);
};

if (import.meta.vitest) {
  it("runScript", () => {
    const tsScriptPath = join(
      __dirname,
      "../../playground/e2e/utils/script.ts"
    );
    runScript(tsScriptPath, "someScript");
    const scriptPath = createScriptOutPath(tsScriptPath);
    expect(getOut()).toMatchInlineSnapshot(`
      "- runScript: ${scriptPath}
      "
    `);
    const code = readFileSync(scriptPath, "utf-8");
    expect(code).toMatchInlineSnapshot(`
      "// playground/e2e/utils/hello.ts
      var hello = () => "Hello, World!";
      // playground/e2e/utils/script.ts
      var someScript = () => {
          const body = http.get("https://jsonplaceholder.typicode.com/todos/1").body;
          const result = json(body);
          console.log("id " + result.userId);
          console.log(\`appId from env: \`);
          console.log("imported file " + hello());
          if (maestro.platform === "android") {
              console.log("platform is android");
          }
          output.id = "com.my.app:id/action_bar_root";
      };

      someScript();"
    `);
    unlinkSync(scriptPath);
  });
}

export const runFlow = ({
  flow,
  condition,
}: {
  flow: () => void;
  condition?: WhenCondition;
}) => {
  const out = handleNest(flow, true);
  const result = stringify([{ runFlow: { when: condition, commands: out } }]);
  addOut(result);
};

if (import.meta.vitest) {
  it("runFlow", () => {
    runFlow({
      flow: () => {
        M.tapOn("elementId");
        M.repeat({ times: 3 }, () => {
          M.tapOn("elementId");
        });
      },
      condition: {
        notVisible: "elementId",
      },
    });
    expect(getOut()).toMatchInlineSnapshot(`
      "- runFlow:
          when:
            notVisible: elementId
          commands:
            - tapOn:
                id: elementId
                retryTapIfNoChange: true
            - repeat:
                times: 3
                commands:
                  - tapOn:
                      id: elementId
                      retryTapIfNoChange: true
      "
    `);
  });
}
