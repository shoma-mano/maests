import { buildSync } from "esbuild";
import { join } from "path";
import { stringify } from "yaml";
import { M } from "./commands";
import { addOut, getOut, handleNest } from "../out";

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
  code = code.replace(/^\s*\/\/.*/gm, "\n").replace(/\s*:\s*/g, ":");
  code = code.replace(/process\.env\.([^\n\s]*)/g, (_, p1) => {
    if (!p1.startsWith("MAESTRO_")) {
      console.warn(
        "Environment variable that is not started with MAESTRO_ will be ignored:",
        p1
      );
    }
    return p1;
  });

  const command = `- evalScript: \${${code.replaceAll("\n", "")}}\n`;
  addOut(command);
};

if (import.meta.vitest) {
  it("runScript", () => {
    runScript({
      path: join(__dirname, "../../playground/e2e/utils/script.ts"),
    });
    expect(getOut()).toMatchInlineSnapshot(`
      "- evalScript: \${var hello = () => "Hello, World!";var body = http.get("https://jsonplaceholder.typicode.com/todos/1").body;var result = json(body);console.log("id " + result.userId);console.log("appId from env " + MAESTRO_APP_ID);console.log("imported file " + hello());output.id = "com.android.systemui:id/battery";}
      "
    `);
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
        M.repeat(3, () => {
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
