import { buildSync } from "esbuild";
import { join } from "path";
import { stringify } from "yaml";
import { M } from "./commands";
import { addOut, getOut, handleNest } from "../out";
import { createScriptOutPath, writeFileWithDirectorySync } from "../utils";
import { unlinkSync } from "fs";

export const runScript = ({ path }: { path: string }) => {
  const { outputFiles } = buildSync({
    entryPoints: [path],
    bundle: true,
    format: "esm",
    sourcemap: false,
    legalComments: "none",
    write: false,
  });

  let code = outputFiles[0].text;
  code = code.replace(/\${process\.env\.([^\n\s]*)}/g, (_, p1) => {
    return process.env[p1] || "";
  });
  const scriptPath = createScriptOutPath(path);
  writeFileWithDirectorySync(scriptPath, code);
  const command = `- runScript: ${scriptPath}\n`;
  addOut(command);
};

if (import.meta.vitest) {
  it("runScript", () => {
    const tsScriptPath = join(
      __dirname,
      "../../playground/e2e/utils/script.ts"
    );
    runScript({
      path: tsScriptPath,
    });
    expect(getOut()).toMatchInlineSnapshot(`
      "- runScript: ${createScriptOutPath(tsScriptPath)}
      "
    `);
    unlinkSync(createScriptOutPath(tsScriptPath));
  });
}

type WhenCondition = {
  visible?: string;
  notVisible?: string;
  true?: any;
  platform?: "Android" | "iOS" | "Web";
};

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
