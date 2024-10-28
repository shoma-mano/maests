import { buildSync } from "esbuild";
import { TapProps, PointProps, WaitProps } from "./command-props";

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

const addOut = (command: string) => {
  if (nestLevel) {
    if (!nestedCommands[nestLevel - 1]) nestedCommands[nestLevel - 1] = "";
    nestedCommands[nestLevel - 1] += command;
  } else out += command;
};

// Utility function for indenting except last line break
function indentExceptLastLineBreak(str: string) {
  return str.replace(/\n(?=.*[\n])/g, "\n        ");
}

const space = "    ";

// Helper function to format optional tap properties
const formatTapProps = ({
  index,
  retryTapIfNoChange = true,
  repeat,
  waitToSettleTimeoutMs,
}: TapProps): string => {
  let propsCommand = "";
  if (typeof index === "number") propsCommand += `    index: ${index}\n`;
  if (retryTapIfNoChange === false) propsCommand += `    retryTapIfNoChange: ${retryTapIfNoChange}\n`;
  if (typeof repeat === "number") propsCommand += `    repeat: ${repeat}\n`;
  if (typeof waitToSettleTimeoutMs === "number") propsCommand += `    waitToSettleTimeoutMs: ${waitToSettleTimeoutMs}\n`;
  return propsCommand;
};

type WaitAndTapProps = TapProps & WaitProps;

// Main translator functions
const envAppId = process.env["appId"];
export const MaestroTranslators = {
  initFlow: ({ appId, onFlowStart }: { appId?: string; onFlowStart?: () => void } = {}) => {
    const appIdCommand = `appId: ${appId ?? envAppId}\n`;
    let commands = appIdCommand;
    if (onFlowStart) {
      const nested = handleNest(onFlowStart);
      const flowCommand = `onFlowStart:\n${nested.replaceAll(/\n/g, `${space}\n`)}`;
      commands += flowCommand;
    }
    const separator = "---\n";
    commands += separator;
    addOut(commands);
  },

  launchApp: ({ appId }: { appId?: string } = {}) => {
    addOut(`- launchApp:\n    appId: "${appId ?? envAppId}"\n`);
  },

  clearState: ({ appId }: { appId?: string } = {}) => {
    addOut(appId ? `- clearState: ${appId}\n` : "- clearState\n");
  },

  runScript: ({ path }: { path: string }) => {
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
        console.warn("Environment variable that is not started with MAESTRO_ will be ignored:", p1);
      }
      return p1;
    });

    const command = `- evalScript: \${${code.replaceAll("\n", "")}}\n`;
    addOut(command);
  },

  clearKeychain: () => {
    addOut("- clearKeychain\n");
  },

  tapOn: (id: string, props: TapProps = {}) => {
    let command = `- tapOn:\n${space}id: "${id}"\n`;
    command += formatTapProps(props);
    addOut(command);
  },

  tapOnText: (text: string, props: TapProps = {}) => {
    let command = `- tapOn:\n    text: "${text}"\n`;
    command += formatTapProps(props);
    addOut(command);
  },

  tapOnPoint: (point: PointProps, props: TapProps = {}) => {
    const { x, y } = point;
    let command = `- tapOn:\n    point: ${x},${y}\n`;
    command += formatTapProps(props);
    addOut(command);
  },

  waitForAndTapOn: (id: string, props: WaitAndTapProps = {}) => {
    const { maxWait = 5000 } = props;
    let command = `- extendedWaitUntil:\n    visible:\n        id: "${id}"\n    timeout: ${maxWait}\n`;
    command += `- tapOn:\n    id: "${id}"\n`;
    command += formatTapProps(props);
    addOut(command);
  },

  longPressOn: (id: string) => {
    addOut(`- longPressOn:\n    id: "${id}"\n`);
  },

  longPressOnPoint: ({ x, y }: PointProps) => {
    addOut(`- longPressOn:\n    point: ${x},${y}\n`);
  },

  longPressOnText: (text: string) => {
    addOut(`- longPressOn: ${text}\n`);
  },

  swipeLeft: () => addOut("- swipe:\n    direction: LEFT\n    duration: 400\n"),
  swipeRight: () => addOut("- swipe:\n    direction: RIGHT\n    duration: 400\n"),
  swipeDown: () => addOut("- swipe:\n    direction: DOWN\n    duration: 400\n"),
  swipeUp: () => addOut("- swipe:\n    direction: UP\n    duration: 400\n"),

  swipe: (start: PointProps, end: PointProps) => {
    addOut(`- swipe:\n    start: ${start.x}, ${start.y}\n    end: ${end.x}, ${end.y}\n`);
  },

  inputText: (text: string, id?: string) => {
    addOut(id ? `- tapOn:\n    id: "${id}"\n- inputText: ${text}\n` : `- inputText: ${text}\n`);
  },

  inputRandomName: (id?: string) => {
    addOut(id ? `- tapOn:\n    id: "${id}"\n- inputRandomPersonName\n` : `- inputRandomPersonName\n`);
  },

  inputRandomNumber: (id?: string) => {
    addOut(id ? `- tapOn:\n    id: "${id}"\n- inputRandomNumber\n` : `- inputRandomNumber\n`);
  },

  copyTextFrom: (id: string) => {
    addOut(`- copyTextFrom:\n    id: "${id}"\n`);
  },

  inputRandomEmail: (id?: string) => {
    addOut(id ? `- tapOn:\n    id: "${id}"\n- inputRandomEmail\n` : `- inputRandomEmail\n`);
  },

  inputRandomText: (id?: string) => {
    addOut(id ? `- tapOn:\n    id: "${id}"\n- inputRandomText\n` : `- inputRandomText\n`);
  },

  eraseText: (chars: number, id?: string) => {
    addOut(id ? `- tapOn:\n    id: "${id}"\n- eraseText: ${chars ?? 50}\n` : `- eraseText: ${chars ?? 50}\n`);
  },

  openLink: (url: string) => {
    addOut(`- openLink: ${url}\n`);
  },

  navigate: (path: string) => {
    addOut(`- openLink: ${process.env["deepLinkBase"]}${path}\n`);
  },

  assertVisible: (id: string, enabled: boolean = false) => {
    addOut(enabled ? `- assertVisible:\n    id: "${id}"\n    enabled: true\n` : `- assertVisible:\n    id: "${id}"\n`);
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
    addOut(maxWait ? `- waitForAnimationToEnd:\n    timeout: ${maxWait}\n` : "- waitForAnimationToEnd\n");
  },

  waitUntilVisible: (id: string, maxWait: number) => {
    addOut(`- extendedWaitUntil:\n    visible:\n        id: "${id}"\n    timeout: ${maxWait ?? 5000}\n`);
  },

  waitUntilNotVisible: (id: string, maxWait: number) => {
    addOut(`- extendedWaitUntil:\n    notVisible:\n        id: "${id}"\n    timeout: ${maxWait ?? 5000}\n`);
  },

  wait: (ms: number) => {
    addOut(`- swipe:\n    start: -1, -1\n    end: -1, -100\n    duration: ${ms}\n`);
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
    const commands = `- repeat:\n     times: ${times}\n     commands:\n        ${indentExceptLastLineBreak(out)}`;
    addOut(commands);
  },

  repeatWhileVisible: (id: string, func: () => void) => {
    const out = handleNest(func);
    const commands = `- repeat:\n     while:\n         visible:\n             id: "${id}"\n     commands:\n        ${indentExceptLastLineBreak(out)}`;
    addOut(commands);
  },

  repeatWhileNotVisible: (id: string, func: () => void) => {
    const out = handleNest(func);
    addOut(`- repeat:\n    while:\n        notVisible:\n            id: "${id}"\n    commands:\n        ${out.replace(/\n(?=.*[\n])/g, "\n        ")}`);
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
