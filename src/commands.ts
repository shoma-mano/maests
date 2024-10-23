// nested commands
let isNested = false;
let nestedCommands = "";
const handleNest = (func: () => any) => {
  isNested = true;
  func();
  isNested = false;
  const out = nestedCommands;
  nestedCommands = "";
  return out;
};

export let out = "";
export const resetOut = () => {
  out = "";
};
const addOut = (command: string) => {
  if (isNested) nestedCommands += command;
  else out += command;
};

const envAppId = process.env["appId"];
export const MaestroTranslators = {
  /**
   * Should be called at the start of every test flow.
   * In the config object, you can define the appId to use.
   */
  initFlow: ({ appId }: { appId?: string } = {}) => {
    addOut(`appId: ${appId ?? envAppId}\n---\n`);
  },
  /**
   * Launches the app.
   * @param appId The bundle id of your app. Falls back to the appId provided in maestro-ts.config.js.
   */
  launchApp: ({ appId }: { appId?: string } = {}) => {
    addOut("- launchApp:\n" + `    appId: "${appId ?? envAppId}"\n`);
  },
  /**
   * Clear the state of the current app or of the app with the given id.
   */
  clearState: ({ appId }: { appId?: string } = {}) => {
    if (appId) addOut(`- clearState: ${appId ?? envAppId}\n`);
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
  tapOn: (id: string) => {
    addOut(`- tapOn:\n    id: "${id}"\n`);
  },
  /**
   * Tap on a text visible on screen.
   */
  tapOnText: (text) => {
    addOut(`- tapOn: ${text}\n`);
  },
  /**
   * Tap on the given point.
   * Can either take numbers for dips or strings for percentages.
   */
  tapOnPoint: ({ x, y }) => {
    addOut(`- tapOn:\n    point: ${x},${y}\n`);
  },
  /**
   * Wait for testId to appear and the tap on an element with the given testId.
   */
  waitForAndtapOn: (id, maxWait) => {
    addOut(
      "- extendedWaitUntil:\n" +
        "    visible:\n" +
        `        id: "${id}"\n` +
        `    timeout: ${maxWait}\n`
    );
    addOut(`- tapOn:\n    id: "${id}"\n`);
  },
  /**
   * Long press on an element with the given testId.
   */
  longPressOn: (id) => {
    addOut(`- longPressOn:\n    id: "${id}"\n`);
  },
  /**
   * Long press on the given point.
   */
  longPressOnPoint: ({ x, y }) => {
    addOut(`- longPressOn:\n    point: ${x}, ${y}\n`);
  },
  /**
   * Long press on an element with the given text.
   */
  longPressOnText: (text) => {
    addOut(`- longPressOn: ${text}\n`);
  },
  /**
   * Swipe left from center.
   */
  swipeLeft: () => {
    addOut("- swipe:\n" + "    direction: LEFT\n" + "    duration: 400\n");
  },
  /**
   * Swipe right from center.
   */
  swipeRight: () => {
    addOut("- swipe:\n" + "    direction: RIGHT\n" + "    duration: 400\n");
  },
  /**
   * Swipe down from center.
   */
  swipeDown: () => {
    addOut("- swipe:\n" + "    direction: DOWN\n" + "    duration: 400\n");
  },
  /**
   * Swipe up from center.
   */
  swipeUp: () => {
    addOut("- swipe:\n" + "    direction: UP\n" + "    duration: 400\n");
  },
  /**
   * Swipe from a start to an end point. Use percentages or dips.
   */
  swipe: (start: { x: number; y: number }, end: { x: number; y: number }) => {
    addOut(
      `- swipe:\n    start: ${start.x}, ${start.y}\n    end: ${end.x}, ${end.y}\n`
    );
  },
  /**
   * Input a text into the currently focused input or the input with the given testId.
   */
  inputText: (text: string, id?: string) => {
    if (!id) addOut(`- inputText: ${text}\n`);
    addOut(`- tapOn:\n    id: "${id}"\n- inputText: ${text}\n`);
  },
  /**
   * Input random name into focused input or the one with given testId.
   */
  inputRandomName: (id?: string) => {
    if (!id) addOut(`- inputRandomPersonName\n`);
    addOut(`- tapOn:\n    id: "${id}"\n- inputRandomPersonName\n`);
  },
  /**
   * Input random number into focused input or the one with given testId.
   */
  inputRandomNumber: (id?: string) => {
    if (!id) addOut(`- inputRandomNumber\n`);
    addOut(`- tapOn:\n    id: "${id}"\n- inputRandomNumber\n`);
  },
  /**
   * Copies text of an element with the given testId.
   */
  copyTextFrom: (id: string) => {
    addOut(`- copyTextFrom:\n    id: "${id}"\n`);
  },
  /**
   * Input random email into focused input or the one with given testId.
   */
  inputRandomEmail: (id?: string) => {
    if (!id) addOut(`- inputRandomEmail\n`);
    addOut(`- tapOn:\n    id: "${id}"\n- inputRandomEmail\n`);
  },
  /**
   * Input random text into focused input or the one with given testId.
   */
  inputRandomText: (id?: string) => {
    if (!id) addOut(`- inputRandomText\n`);
    addOut(`- tapOn:\n    id: "${id}"\n- inputRandomText\n`);
  },
  /**
   * Erase a number of characters from the focused input or the input with the given testId.
   */
  eraseText: (chars: number, id?: string) => {
    if (!id) addOut(`- eraseText: ${chars ?? 50}\n`);
    addOut(`- tapOn:\n    id: "${id}"\n- eraseText: ${chars ?? 50}\n`);
  },
  /**
   * Open a url / deepLink.
   */
  openLink: (url) => {
    addOut(`- openLink: ${url}\n`);
  },
  /**
   * Use the configured deepLinkBase or appId to navigate to the given path.
   * Only works if deepLinking is set up correctly.
   */
  navigate: (path) => {
    addOut(`- openLink: ${process.env["deepLinkBase"]}${path}\n`);
  },
  /**
   * Assert an element with the given testId is visible.
   * @param enabled Whether the view should also be enabled.
   */
  assertVisible: (id, enabled) => {
    if (enabled)
      addOut(`- assertVisible:\n    id: "${id}"\n    enabled: true\n`);
    addOut(`- assertVisible:\n    id: "${id}"\n`);
  },
  /**
   * Assert the element with the given testId is not visible.
   */
  assertNotVisible: (id) => {
    addOut(`- assertNotVisible:\n    id: "${id}"\n`);
  },
  /**
   * Scroll down.
   */
  scroll: () => {
    addOut(`- scroll\n`);
  },
  /**
   * Scroll until the element with the given testId is visible.
   */
  scrollUntilVisible: (id) => {
    addOut(`- scrollUntilVisible:\n    element:\n      id: "${id}"\n`);
  },
  /**
   * Wait a max of n ms or until the current animation has ended.
   */
  waitForAnimationEnd: (continueAfter?: boolean) => {
    if (!continueAfter) {
      addOut("- waitForAnimationToEnd\n");
    }
    addOut(`- waitForAnimationToEnd:\n    timeout: ${continueAfter}\n`);
  },
  /**
   * Wait a max of milliseconds until the element with the given testId is visible.
   */
  waitUntilVisible: (id, maxWait) => {
    addOut(
      "- extendedWaitUntil:\n" +
        "    visible:\n" +
        `        id: "${id}"\n` +
        `    timeout: ${maxWait ?? 5000}\n`
    );
  },
  /**
   * Wait a max of milliseconds until the element with the given testId is no longer visible.
   */
  waitUntilNotVisible: (id, maxWait) => {
    addOut(
      "- extendedWaitUntil:\n" +
        "    notVisible:\n" +
        `        id: "${id}"\n` +
        `    timeout: ${maxWait ?? 5000}\n`
    );
  },
  /**
   * Wait a number of milliseconds.
   * This is an anti-pattern, try to fall back to other waiting methods if possible.
   */
  wait: (ms) => {
    addOut(
      "- swipe:\n" +
        "    start: -1, -1\n" +
        "    end: -1, -100\n" +
        `    duration: ${ms}\n`
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
    addOut(`- takeScreenshot: ${fileName}\n`);
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
  stopApp: ({ appId }: { appId?: string } = {}) => {
    appId = appId ?? envAppId;
    if (appId) addOut(`- stopApp: ${appId}\n`);
    addOut("- stopApp\n");
  },
  /**
   * Repeats the given actions a given number of times.
   */
  repeat: (times, func) => {
    const out = handleNest(func);
    const commands = `- repeat:
    times: ${times}
    commands:
        ${out.replace(/\n(?=.*[\n])/g, "\n        ")}`;
    addOut(commands);
  },
  /**
   * Repeats the given actions while the element with the given testId is visible.
   */
  repeatWhileVisible: (id, func) => {
    const out = handleNest(func);
    addOut(`- repeat:
    while:
        visible:
            id: "${id}"
    commands:
        ${out.replace(/\n(?=.*[\n])/g, "\n        ")}`);
  },
  /**
   * Repeats the given actions while the element with the given testId is not visible.
   */
  repeatWhileNotVisible: (id, func) => {
    const out = handleNest(func);
    addOut(`- repeat:
    while:
        notVisible:
            id: "${id}"
    commands:
        ${out.replace(/\n(?=.*[\n])/g, "\n        ")}`);
  },
  /**
   * Insert inline yaml code. Good for specialized commands.
   */
  yaml: (yaml: string) => `${yaml}\n`,
  /**
   * Check if a condition is true.
   */
  assertTrue: (condition: string) => {
    addOut(`- assertTrue: ${condition}\n`);
  },
};

export { MaestroTranslators as M };
export { writeYaml } from "./write-yaml";
