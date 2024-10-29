import { buildSync } from "esbuild";
import { PointProps } from "./command-props";
import { join } from "path";
import { tapOn, tapOnPoint, tapOnText, waitForAndTapOn } from "./commands/tap";

// Nested command handling
let nestLevel = 0;
let nestedCommands: string[] = [];
const handleNest = (func: () => any) => {
  nestLevel++;
  func();
  const out = nestedCommands[nestLevel - 1];
  nestedCommands[nestLevel - 1] = "";
  nestLevel--;
  return out;
};

export let out = "";
export const resetOut = () => {
  out = "";
};

export const addOut = (command: string) => {
  if (nestLevel) {
    if (!nestedCommands[nestLevel - 1]) nestedCommands[nestLevel - 1] = "";
    nestedCommands[nestLevel - 1] += command;
  } else out += command;
};

// Utility function for indenting except last line break
function indentExceptLastLineBreak(str: string) {
  return str.replace(/\n(?=.*[\n])/g, "\n        ");
}

export const space = "    ";

// We should separate these commands into different files later
const initFlow = ({
  appId,
  onFlowStart,
}: { appId?: string; onFlowStart?: () => void } = {}) => {
  const appIdCommand = `appId: ${appId ?? envAppId}\n`;
  let commands = appIdCommand;
  if (onFlowStart) {
    const nested = handleNest(onFlowStart);
    const flowCommand = `onFlowStart:\n${nested.replaceAll(
      /\n/g,
      `${space}\n`
    )}`;
    commands += flowCommand;
  }
  const separator = "---\n";
  commands += separator;
  addOut(commands);
};

if (import.meta.vitest) beforeEach(resetOut);

if (import.meta.vitest) {
  it("initFlow with appId", () => {
    initFlow({ appId: "testAppId" });
    expect(out).toMatchInlineSnapshot(`
      "appId: testAppId
      ---
      "
    `);
  });
}

const launchApp = ({ appId }: { appId?: string } = {}) => {
  addOut(`- launchApp:\n    appId: "${appId ?? envAppId}"\n`);
};

if (import.meta.vitest) {
  it("launchApp with appId", () => {
    launchApp({ appId: "testAppId" });
    expect(out).toMatchInlineSnapshot(`
      "- launchApp:
          appId: "testAppId"
      "
    `);
  });
}

const clearState = ({ appId }: { appId?: string } = {}) => {
  addOut(appId ? `- clearState: ${appId}\n` : "- clearState\n");
};

if (import.meta.vitest) {
  it("clearState with appId", () => {
    clearState({ appId: "testAppId" });
    expect(out).toMatchInlineSnapshot(`
      "- clearState: testAppId
      "
    `);
  });
}

const runScript = ({ path }: { path: string }) => {
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
    runScript({ path: join(__dirname, "../playground/e2e/script.ts") });
    expect(out).toMatchInlineSnapshot(`
      "- evalScript: \${var hello = () => {  console.log("Hello, world!");};var body = http.get("https://jsonplaceholder.typicode.com/todos/1").body;var result = json(body);console.log(result.userId);console.log(MAESTRO_APP_ID);hello();}
      "
    `);
  });
}

// Main translator functions
const envAppId = process.env["appId"];
export const MaestroTranslators = {
  /**
   * Initializes the test flow with optional configuration.
   * @param config - Optional configuration with appId and other environment variables.
   */
  initFlow,

  /**
   * Launches the application with optional configuration settings.
   * @param config - Configuration options for appId, state clearing, keychain clearing, and app stopping.
   */
  launchApp,

  /**
   * Clears the state of the current app or the specified app by appId.
   * @param appId - Optional appId to clear state for a specific app.
   */
  clearState,

  runScript,

  tapOn,

  tapOnText,

  tapOnPoint,

  waitForAndTapOn,

  clearKeychain: () => {
    addOut("- clearKeychain\n");
  },

  longPressOn: (id: string) => {
    addOut(`- longPressOn:\n    id: "${id}"\n`);
  },

  longPressOnPoint: (pointProps: PointProps) => {
    addOut(`- longPressOn:\n    point: ${pointProps.x},${pointProps.y}\n`);
  },

  longPressOnText: (text: string) => {
    addOut(`- longPressOn: ${text}\n`);
  },

  swipeLeft: () => addOut("- swipe:\n    direction: LEFT\n    duration: 400\n"),
  swipeRight: () =>
    addOut("- swipe:\n    direction: RIGHT\n    duration: 400\n"),
  swipeDown: () => addOut("- swipe:\n    direction: DOWN\n    duration: 400\n"),
  swipeUp: () => addOut("- swipe:\n    direction: UP\n    duration: 400\n"),

  swipe: (start: PointProps, end: PointProps) => {
    addOut(
      `- swipe:\n    start: ${start.x}, ${start.y}\n    end: ${end.x}, ${end.y}\n`
    );
  },

  inputText: (text: string, id?: string) => {
    addOut(
      id
        ? `- tapOn:\n    id: "${id}"\n- inputText: ${text}\n`
        : `- inputText: ${text}\n`
    );
  },

  inputRandomName: (id?: string) => {
    addOut(
      id
        ? `- tapOn:\n    id: "${id}"\n- inputRandomPersonName\n`
        : `- inputRandomPersonName\n`
    );
  },

  inputRandomNumber: (id?: string) => {
    addOut(
      id
        ? `- tapOn:\n    id: "${id}"\n- inputRandomNumber\n`
        : `- inputRandomNumber\n`
    );
  },

  copyTextFrom: (id: string) => {
    addOut(`- copyTextFrom:\n    id: "${id}"\n`);
  },

  inputRandomEmail: (id?: string) => {
    addOut(
      id
        ? `- tapOn:\n    id: "${id}"\n- inputRandomEmail\n`
        : `- inputRandomEmail\n`
    );
  },

  inputRandomText: (id?: string) => {
    addOut(
      id
        ? `- tapOn:\n    id: "${id}"\n- inputRandomText\n`
        : `- inputRandomText\n`
    );
  },

  eraseText: (chars: number, id?: string) => {
    addOut(
      id
        ? `- tapOn:\n    id: "${id}"\n- eraseText: ${chars ?? 50}\n`
        : `- eraseText: ${chars ?? 50}\n`
    );
  },

  openLink: (url: string) => {
    addOut(`- openLink: ${url}\n`);
  },

  navigate: (path: string) => {
    addOut(`- openLink: ${process.env["deepLinkBase"]}${path}\n`);
  },

  assertVisible: (id: string, enabled: boolean = false) => {
    addOut(
      enabled
        ? `- assertVisible:\n    id: "${id}"\n    enabled: true\n`
        : `- assertVisible:\n    id: "${id}"\n`
    );
  },

  assertNotVisible: (id: string) => {
    addOut(`- assertNotVisible:\n    id: "${id}"\n`);
  },

  scroll: () => {
    addOut("- scroll\n");
  },

  scrollUntilVisible: (id: string) => {
    addOut(`- scrollUntilVisible:\n    element:\n      id: "${id}"\n`);
  },

  waitForAnimationEnd: (maxWait: number = 5000) => {
    addOut(
      maxWait
        ? `- waitForAnimationToEnd:\n    timeout: ${maxWait}\n`
        : "- waitForAnimationToEnd\n"
    );
  },

  waitUntilVisible: (id: string, maxWait: number) => {
    addOut(
      `- extendedWaitUntil:\n    visible:\n        id: "${id}"\n    timeout: ${
        maxWait ?? 5000
      }\n`
    );
  },

  waitUntilNotVisible: (id: string, maxWait: number) => {
    addOut(
      `- extendedWaitUntil:\n    notVisible:\n        id: "${id}"\n    timeout: ${
        maxWait ?? 5000
      }\n`
    );
  },

  wait: (ms: number) => {
    addOut(
      `- swipe:\n    start: -1, -1\n    end: -1, -100\n    duration: ${ms}\n`
    );
  },

  hideKeyboard: () => {
    addOut("- hideKeyboard\n");
  },

  screenshot: (fileName: string) => {
    addOut(`- takeScreenshot: ${fileName}\n`);
  },

  pressEnter: () => {
    addOut("- pressKey: Enter\n");
  },

  pressHomeButton: () => {
    addOut("- pressKey: Home\n");
  },

  pressLockButton: () => {
    addOut("- pressKey: Lock\n");
  },

  back: () => {
    addOut("- pressKey: back\n");
  },

  volumeDown: () => {
    addOut("- pressKey: volume down\n");
  },

  volumeUp: () => {
    addOut("- pressKey: volume up\n");
  },

  stopApp: ({ appId }: { appId?: string } = {}) => {
    addOut(appId ? `- stopApp: ${appId}\n` : "- stopApp\n");
  },

  repeat: (times: number, func: () => void) => {
    const out = handleNest(func);
    const commands = `- repeat:\n     times: ${times}\n     commands:\n        ${indentExceptLastLineBreak(
      out
    )}`;
    addOut(commands);
  },

  repeatWhileVisible: (id: string, func: () => void) => {
    const out = handleNest(func);
    const commands = `- repeat:\n     while:\n         visible:\n             id: "${id}"\n     commands:\n        ${indentExceptLastLineBreak(
      out
    )}`;
    addOut(commands);
  },

  repeatWhileNotVisible: (id: string, func: () => void) => {
    const out = handleNest(func);
    addOut(
      `- repeat:\n    while:\n        notVisible:\n            id: "${id}"\n    commands:\n        ${out.replace(
        /\n(?=.*[\n])/g,
        "\n        "
      )}`
    );
  },

  yaml: (yaml: string) => `${yaml}\n`,

  assertTrue: (condition: string) => {
    addOut(`- assertTrue: ${condition}\n`);
  },
};

export { MaestroTranslators as M };
export { writeYaml } from "./write-yaml";

declare global {
  namespace http {
    const get: (...args: any) => { body: string };
  }

  const json: <T extends any>(str: string) => T;
  const output: Record<string, string>;
}
