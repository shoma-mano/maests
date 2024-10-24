import { writeFileSync } from 'fs';

const writeYaml = (path) => {
  console.log("out", out);
  writeFileSync(`./${path.replace(".maestro.ts", ".yaml")}`, out);
  resetOut();
};

let isNested = false;
let nestedCommands = "";
const handleNest = (func) => {
  isNested = true;
  func();
  isNested = false;
  const out2 = nestedCommands;
  nestedCommands = "";
  return out2;
};
let out = "";
const resetOut = () => {
  out = "";
};
const addOut = (command) => {
  if (isNested)
    nestedCommands += command;
  else
    out += command;
};
const envAppId = process.env["appId"];
const MaestroTranslators = {
  /**
   * Should be called at the start of every test flow.
   * In the config object, you can define the appId to use.
   */
  initFlow: ({ appId } = {}) => {
    addOut(`appId: ${appId ?? envAppId}
---
`);
  },
  /**
   * Launches the app.
   * @param appId The bundle id of your app. Falls back to the appId provided in maestro-ts.config.js.
   */
  launchApp: ({ appId } = {}) => {
    addOut(`- launchApp:
    appId: "${appId ?? envAppId}"
`);
  },
  /**
   * Clear the state of the current app or of the app with the given id.
   */
  clearState: ({ appId } = {}) => {
    if (appId)
      addOut(`- clearState: ${appId ?? envAppId}
`);
    addOut("- clearState\n");
  },
  /**
   * Clear the entire keychain.
   */
  clearKeychain: () => {
    addOut("- clearKeychain\n");
  },
  /**
   * Tap on an element with the given testId.
   */
  tapOn: (id) => {
    addOut(`- tapOn:
    id: "${id}"
`);
  },
  /**
   * Tap on a text visible on screen.
   */
  tapOnText: (text) => {
    addOut(`- tapOn: ${text}
`);
  },
  /**
   * Tap on the given point.
   * Can either take numbers for dips or strings for percentages.
   */
  tapOnPoint: ({ x, y }) => {
    addOut(`- tapOn:
    point: ${x},${y}
`);
  },
  /**
   * Wait for testId to appear and the tap on an element with the given testId.
   */
  waitForAndtapOn: (id, maxWait) => {
    addOut(
      `- extendedWaitUntil:
    visible:
        id: "${id}"
    timeout: ${maxWait}
`
    );
    addOut(`- tapOn:
    id: "${id}"
`);
  },
  /**
   * Long press on an element with the given testId.
   */
  longPressOn: (id) => {
    addOut(`- longPressOn:
    id: "${id}"
`);
  },
  /**
   * Long press on the given point.
   */
  longPressOnPoint: ({ x, y }) => {
    addOut(`- longPressOn:
    point: ${x}, ${y}
`);
  },
  /**
   * Long press on an element with the given text.
   */
  longPressOnText: (text) => {
    addOut(`- longPressOn: ${text}
`);
  },
  /**
   * Swipe left from center.
   */
  swipeLeft: () => {
    addOut("- swipe:\n    direction: LEFT\n    duration: 400\n");
  },
  /**
   * Swipe right from center.
   */
  swipeRight: () => {
    addOut("- swipe:\n    direction: RIGHT\n    duration: 400\n");
  },
  /**
   * Swipe down from center.
   */
  swipeDown: () => {
    addOut("- swipe:\n    direction: DOWN\n    duration: 400\n");
  },
  /**
   * Swipe up from center.
   */
  swipeUp: () => {
    addOut("- swipe:\n    direction: UP\n    duration: 400\n");
  },
  /**
   * Swipe from a start to an end point. Use percentages or dips.
   */
  swipe: (start, end) => {
    addOut(
      `- swipe:
    start: ${start.x}, ${start.y}
    end: ${end.x}, ${end.y}
`
    );
  },
  /**
   * Input a text into the currently focused input or the input with the given testId.
   */
  inputText: (text, id) => {
    if (!id)
      addOut(`- inputText: ${text}
`);
    addOut(`- tapOn:
    id: "${id}"
- inputText: ${text}
`);
  },
  /**
   * Input random name into focused input or the one with given testId.
   */
  inputRandomName: (id) => {
    if (!id)
      addOut(`- inputRandomPersonName
`);
    addOut(`- tapOn:
    id: "${id}"
- inputRandomPersonName
`);
  },
  /**
   * Input random number into focused input or the one with given testId.
   */
  inputRandomNumber: (id) => {
    if (!id)
      addOut(`- inputRandomNumber
`);
    addOut(`- tapOn:
    id: "${id}"
- inputRandomNumber
`);
  },
  /**
   * Copies text of an element with the given testId.
   */
  copyTextFrom: (id) => {
    addOut(`- copyTextFrom:
    id: "${id}"
`);
  },
  /**
   * Input random email into focused input or the one with given testId.
   */
  inputRandomEmail: (id) => {
    if (!id)
      addOut(`- inputRandomEmail
`);
    addOut(`- tapOn:
    id: "${id}"
- inputRandomEmail
`);
  },
  /**
   * Input random text into focused input or the one with given testId.
   */
  inputRandomText: (id) => {
    if (!id)
      addOut(`- inputRandomText
`);
    addOut(`- tapOn:
    id: "${id}"
- inputRandomText
`);
  },
  /**
   * Erase a number of characters from the focused input or the input with the given testId.
   */
  eraseText: (chars, id) => {
    if (!id)
      addOut(`- eraseText: ${chars ?? 50}
`);
    addOut(`- tapOn:
    id: "${id}"
- eraseText: ${chars ?? 50}
`);
  },
  /**
   * Open a url / deepLink.
   */
  openLink: (url) => {
    addOut(`- openLink: ${url}
`);
  },
  /**
   * Use the configured deepLinkBase or appId to navigate to the given path.
   * Only works if deepLinking is set up correctly.
   */
  navigate: (path) => {
    addOut(`- openLink: ${process.env["deepLinkBase"]}${path}
`);
  },
  /**
   * Assert an element with the given testId is visible.
   * @param enabled Whether the view should also be enabled.
   */
  assertVisible: (id, enabled) => {
    if (enabled)
      addOut(`- assertVisible:
    id: "${id}"
    enabled: true
`);
    addOut(`- assertVisible:
    id: "${id}"
`);
  },
  /**
   * Assert the element with the given testId is not visible.
   */
  assertNotVisible: (id) => {
    addOut(`- assertNotVisible:
    id: "${id}"
`);
  },
  /**
   * Scroll down.
   */
  scroll: () => {
    addOut(`- scroll
`);
  },
  /**
   * Scroll until the element with the given testId is visible.
   */
  scrollUntilVisible: (id) => {
    addOut(`- scrollUntilVisible:
    element:
      id: "${id}"
`);
  },
  /**
   * Wait a max of n ms or until the current animation has ended.
   */
  waitForAnimationEnd: (continueAfter) => {
    if (!continueAfter) {
      addOut("- waitForAnimationToEnd\n");
    }
    addOut(`- waitForAnimationToEnd:
    timeout: ${continueAfter}
`);
  },
  /**
   * Wait a max of milliseconds until the element with the given testId is visible.
   */
  waitUntilVisible: (id, maxWait) => {
    addOut(
      `- extendedWaitUntil:
    visible:
        id: "${id}"
    timeout: ${maxWait ?? 5e3}
`
    );
  },
  /**
   * Wait a max of milliseconds until the element with the given testId is no longer visible.
   */
  waitUntilNotVisible: (id, maxWait) => {
    addOut(
      `- extendedWaitUntil:
    notVisible:
        id: "${id}"
    timeout: ${maxWait ?? 5e3}
`
    );
  },
  /**
   * Wait a number of milliseconds.
   * This is an anti-pattern, try to fall back to other waiting methods if possible.
   */
  wait: (ms) => {
    addOut(
      `- swipe:
    start: -1, -1
    end: -1, -100
    duration: ${ms}
`
    );
  },
  /**
   * Dismiss the software keyboard.
   */
  hideKeyboard: () => {
    addOut("- hideKeyboard\n");
  },
  /**
   * Take a screenshot and store at the path with the given name.
   */
  screenshot: (fileName) => {
    addOut(`- takeScreenshot: ${fileName}
`);
  },
  /**
   * Press the enter key on the software keyboard.
   */
  pressEnter: () => {
    addOut("- pressKey: Enter\n");
  },
  /**
   * Press the home button.
   */
  pressHomeButton: () => {
    addOut("- pressKey: Home\n");
  },
  /**
   * Press the lock button.
   */
  pressLockButton: () => {
    addOut("- pressKey: Lock\n");
  },
  /**
   * Press android back button.
   */
  back: () => {
    addOut("- pressKey: back\n");
  },
  /**
   * Decrease device volume.
   */
  volumeDown: () => {
    addOut("- pressKey: volume down\n");
  },
  /**
   * Increase device volume.
   */
  volumeUp: () => {
    addOut("- pressKey: volume up\n");
  },
  /**
   * Stop the current app or the one with the given appId.
   */
  stopApp: ({ appId } = {}) => {
    appId = appId ?? envAppId;
    if (appId)
      addOut(`- stopApp: ${appId}
`);
    addOut("- stopApp\n");
  },
  /**
   * Repeats the given actions a given number of times.
   */
  repeat: (times, func) => {
    const out2 = handleNest(func);
    const commands = `- repeat:
    times: ${times}
    commands:
        ${out2.replace(/\n(?=.*[\n])/g, "\n        ")}`;
    addOut(commands);
  },
  /**
   * Repeats the given actions while the element with the given testId is visible.
   */
  repeatWhileVisible: (id, func) => {
    const out2 = handleNest(func);
    addOut(`- repeat:
    while:
        visible:
            id: "${id}"
    commands:
        ${out2.replace(/\n(?=.*[\n])/g, "\n        ")}`);
  },
  /**
   * Repeats the given actions while the element with the given testId is not visible.
   */
  repeatWhileNotVisible: (id, func) => {
    const out2 = handleNest(func);
    addOut(`- repeat:
    while:
        notVisible:
            id: "${id}"
    commands:
        ${out2.replace(/\n(?=.*[\n])/g, "\n        ")}`);
  },
  /**
   * Insert inline yaml code. Good for specialized commands.
   */
  yaml: (yaml) => `${yaml}
`,
  /**
   * Check if a condition is true.
   */
  assertTrue: (condition) => {
    addOut(`- assertTrue: ${condition}
`);
  }
};

export { MaestroTranslators as M, MaestroTranslators, out, resetOut, writeYaml };
