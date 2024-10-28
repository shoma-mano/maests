import { buildSync } from "esbuild";
let nestLevel = 0;
let nestedCommands = [];
const handleNest = (func) => {
  nestLevel++;
  func();
  const out2 = nestedCommands[nestLevel - 1];
  nestedCommands[nestLevel - 1] = "";
  nestLevel--;
  return out2;
};
export let out = "";
export const resetOut = () => {
  out = "";
};
const addOut = (command) => {
  if (nestLevel) {
    if (!nestedCommands[nestLevel - 1]) nestedCommands[nestLevel - 1] = "";
    nestedCommands[nestLevel - 1] += command;
  } else out += command;
};
function indentExceptLastLineBreak(str) {
  return str.replace(/\n(?=.*[\n])/g, "\n        ");
}
const space = "    ";
const formatTapProps = ({
  index,
  retryTapIfNoChange = true,
  repeat,
  waitToSettleTimeoutMs
}) => {
  let propsCommand = "";
  if (typeof index === "number") propsCommand += `    index: ${index}
`;
  if (retryTapIfNoChange === false) propsCommand += `    retryTapIfNoChange: ${retryTapIfNoChange}
`;
  if (typeof repeat === "number") propsCommand += `    repeat: ${repeat}
`;
  if (typeof waitToSettleTimeoutMs === "number") propsCommand += `    waitToSettleTimeoutMs: ${waitToSettleTimeoutMs}
`;
  return propsCommand;
};
const envAppId = process.env["appId"];
export const MaestroTranslators = {
  initFlow: ({ appId, onFlowStart } = {}) => {
    const appIdCommand = `appId: ${appId ?? envAppId}
`;
    let commands = appIdCommand;
    if (onFlowStart) {
      const nested = handleNest(onFlowStart);
      const flowCommand = `onFlowStart:
${nested.replaceAll(/\n/g, `${space}
`)}`;
      commands += flowCommand;
    }
    const separator = "---\n";
    commands += separator;
    addOut(commands);
  },
  launchApp: ({ appId } = {}) => {
    addOut(`- launchApp:
    appId: "${appId ?? envAppId}"
`);
  },
  clearState: ({ appId } = {}) => {
    addOut(appId ? `- clearState: ${appId}
` : "- clearState\n");
  },
  runScript: ({ path }) => {
    const { outputFiles } = buildSync({
      entryPoints: [path],
      bundle: true,
      format: "esm",
      sourcemap: false,
      legalComments: "none",
      write: false
    });
    let code = outputFiles[0].text;
    code = code.replace(/^\s*\/\/.*/gm, "\n").replace(/\s*:\s*/g, ":");
    code = code.replace(/process\.env\.([^\n\s]*)/g, (_, p1) => {
      if (!p1.startsWith("MAESTRO_")) {
        console.warn("Environment variable that is not started with MAESTRO_ will be ignored:", p1);
      }
      return p1;
    });
    const command = `- evalScript: \${${code.replaceAll("\n", "")}}
`;
    addOut(command);
  },
  clearKeychain: () => {
    addOut("- clearKeychain\n");
  },
  tapOn: (id, props = {}) => {
    let command = `- tapOn:
${space}id: "${id}"
`;
    command += formatTapProps(props);
    addOut(command);
  },
  tapOnText: (text, props = {}) => {
    let command = `- tapOn:
    text: "${text}"
`;
    command += formatTapProps(props);
    addOut(command);
  },
  tapOnPoint: (point, props = {}) => {
    const { x, y } = point;
    let command = `- tapOn:
    point: ${x},${y}
`;
    command += formatTapProps(props);
    addOut(command);
  },
  waitForAndTapOn: (id, props = {}) => {
    const { maxWait = 5e3 } = props;
    let command = `- extendedWaitUntil:
    visible:
        id: "${id}"
    timeout: ${maxWait}
`;
    command += `- tapOn:
    id: "${id}"
`;
    command += formatTapProps(props);
    addOut(command);
  },
  longPressOn: (id) => {
    addOut(`- longPressOn:
    id: "${id}"
`);
  },
  longPressOnPoint: ({ x, y }) => {
    addOut(`- longPressOn:
    point: ${x},${y}
`);
  },
  longPressOnText: (text) => {
    addOut(`- longPressOn: ${text}
`);
  },
  swipeLeft: () => addOut("- swipe:\n    direction: LEFT\n    duration: 400\n"),
  swipeRight: () => addOut("- swipe:\n    direction: RIGHT\n    duration: 400\n"),
  swipeDown: () => addOut("- swipe:\n    direction: DOWN\n    duration: 400\n"),
  swipeUp: () => addOut("- swipe:\n    direction: UP\n    duration: 400\n"),
  swipe: (start, end) => {
    addOut(`- swipe:
    start: ${start.x}, ${start.y}
    end: ${end.x}, ${end.y}
`);
  },
  inputText: (text, id) => {
    addOut(id ? `- tapOn:
    id: "${id}"
- inputText: ${text}
` : `- inputText: ${text}
`);
  },
  inputRandomName: (id) => {
    addOut(id ? `- tapOn:
    id: "${id}"
- inputRandomPersonName
` : `- inputRandomPersonName
`);
  },
  inputRandomNumber: (id) => {
    addOut(id ? `- tapOn:
    id: "${id}"
- inputRandomNumber
` : `- inputRandomNumber
`);
  },
  copyTextFrom: (id) => {
    addOut(`- copyTextFrom:
    id: "${id}"
`);
  },
  inputRandomEmail: (id) => {
    addOut(id ? `- tapOn:
    id: "${id}"
- inputRandomEmail
` : `- inputRandomEmail
`);
  },
  inputRandomText: (id) => {
    addOut(id ? `- tapOn:
    id: "${id}"
- inputRandomText
` : `- inputRandomText
`);
  },
  eraseText: (chars, id) => {
    addOut(id ? `- tapOn:
    id: "${id}"
- eraseText: ${chars ?? 50}
` : `- eraseText: ${chars ?? 50}
`);
  },
  openLink: (url) => {
    addOut(`- openLink: ${url}
`);
  },
  navigate: (path) => {
    addOut(`- openLink: ${process.env["deepLinkBase"]}${path}
`);
  },
  assertVisible: (id, enabled = false) => {
    addOut(enabled ? `- assertVisible:
    id: "${id}"
    enabled: true
` : `- assertVisible:
    id: "${id}"
`);
  },
  assertNotVisible: (id) => {
    addOut(`- assertNotVisible:
    id: "${id}"
`);
  },
  scroll: () => {
    addOut("- scroll\n");
  },
  scrollUntilVisible: (id) => {
    addOut(`- scrollUntilVisible:
    element:
      id: "${id}"
`);
  },
  waitForAnimationEnd: (maxWait = 5e3) => {
    addOut(maxWait ? `- waitForAnimationToEnd:
    timeout: ${maxWait}
` : "- waitForAnimationToEnd\n");
  },
  waitUntilVisible: (id, maxWait) => {
    addOut(`- extendedWaitUntil:
    visible:
        id: "${id}"
    timeout: ${maxWait ?? 5e3}
`);
  },
  waitUntilNotVisible: (id, maxWait) => {
    addOut(`- extendedWaitUntil:
    notVisible:
        id: "${id}"
    timeout: ${maxWait ?? 5e3}
`);
  },
  wait: (ms) => {
    addOut(`- swipe:
    start: -1, -1
    end: -1, -100
    duration: ${ms}
`);
  },
  hideKeyboard: () => {
    addOut("- hideKeyboard\n");
  },
  screenshot: (fileName) => {
    addOut(`- takeScreenshot: ${fileName}
`);
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
  stopApp: ({ appId } = {}) => {
    addOut(appId ? `- stopApp: ${appId}
` : "- stopApp\n");
  },
  repeat: (times, func) => {
    const out2 = handleNest(func);
    const commands = `- repeat:
     times: ${times}
     commands:
        ${indentExceptLastLineBreak(out2)}`;
    addOut(commands);
  },
  repeatWhileVisible: (id, func) => {
    const out2 = handleNest(func);
    const commands = `- repeat:
     while:
         visible:
             id: "${id}"
     commands:
        ${indentExceptLastLineBreak(out2)}`;
    addOut(commands);
  },
  repeatWhileNotVisible: (id, func) => {
    const out2 = handleNest(func);
    addOut(`- repeat:
    while:
        notVisible:
            id: "${id}"
    commands:
        ${out2.replace(/\n(?=.*[\n])/g, "\n        ")}`);
  },
  yaml: (yaml) => `${yaml}
`,
  assertTrue: (condition) => {
    addOut(`- assertTrue: ${condition}
`);
  }
};
export { MaestroTranslators as M };
export { writeYaml } from "./write-yaml.mjs";
