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
export let out = "";
export const resetOut = () => {
  out = "";
};
const addOut = (command) => {
  if (isNested) nestedCommands += command;
  else out += command;
};
const formatTapProps = ({
  retryTapIfNoChange = true,
  repeat,
  waitToSettleTimeoutMs
}) => {
  let propsCommand = "";
  if (retryTapIfNoChange) propsCommand += `    retryTapIfNoChange: ${retryTapIfNoChange}
`;
  if (typeof repeat === "number") propsCommand += `    repeat: ${repeat}
`;
  if (typeof waitToSettleTimeoutMs === "number") propsCommand += `    waitToSettleTimeoutMs: ${waitToSettleTimeoutMs}
`;
  return propsCommand;
};
const envAppId = process.env["appId"];
export const MaestroTranslators = {
  /**
   * Initializes the test flow with an optional application ID.
   * @param appId - Optional application ID to override the default environment appId.
   */
  initFlow: ({ appId } = {}) => {
    addOut(`appId: ${appId ?? envAppId}
---
`);
  },
  /**
   * Launches the application with optional configurations.
   * @param appId - Optional app ID to use for launching the app.
   */
  launchApp: ({ appId } = {}) => {
    addOut(`- launchApp:
    appId: "${appId ?? envAppId}"
`);
  },
  /**
   * Clears the state of the application.
   * @param appId - Optional app ID to clear a specific application's state.
   */
  clearState: ({ appId } = {}) => {
    addOut(appId ? `- clearState: ${appId}
` : "- clearState\n");
  },
  /**
   * Clears the entire keychain.
   */
  clearKeychain: () => {
    addOut("- clearKeychain\n");
  },
  /**
   * Taps on an element by its test ID with optional retry and repeat configurations.
   * @param id - The test ID of the target element.
   * @param props - Optional properties to customize the tap action.
   */
  tapOn: (id, props = {}) => {
    let command = `- tapOn:
    id: "${id}"
`;
    command += formatTapProps(props);
    addOut(command);
  },
  /**
   * Taps on visible text on the screen with optional retry and repeat configurations.
   * @param text - The visible text to tap on.
   * @param props - Optional properties to customize the tap action.
   */
  tapOnText: (text, props = {}) => {
    let command = `- tapOn:
    text: "${text}"
`;
    command += formatTapProps(props);
    addOut(command);
  },
  /**
   * Taps on a specified point on the screen.
   * @param point - The x and y coordinates of the tap.
   * @param props - Optional properties for customizing the tap action.
   */
  tapOnPoint: (point, props = {}) => {
    const { x, y } = point;
    let command = `- tapOn:
    point: ${x},${y}
`;
    command += formatTapProps(props);
    addOut(command);
  },
  /**
   * Waits for an element by testId to appear, then taps on it.
   * @param id - The testId of the element to wait for and tap.
   * @param maxWait - Optional Maximum wait time in milliseconds for the element to appear, maestro defaults to 5 seconds
   * @param props - Optional properties to customize the tap action.
   */
  waitForAndTapOn: (id, maxWait, props = {}) => {
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
  /**
   * Long presses on an element by its testId.
   * @param id - The testId of the element to long press on.
   */
  longPressOn: (id) => {
    addOut(`- longPressOn:
    id: "${id}"
`);
  },
  /**
   * Long presses on a specified point on the screen.
   * @param point - The x and y coordinates for the long press.
   */
  longPressOnPoint: ({ x, y }) => {
    addOut(`- longPressOn:
    point: ${x},${y}
`);
  },
  /**
   * Long presses on a specified text on the screen.
   * @param text - The text to long press.
   */
  longPressOnText: (text) => {
    addOut(`- longPressOn: ${text}
`);
  },
  /**
   * Swipes in the specified direction from the center of the screen.
   */
  swipeLeft: () => addOut("- swipe:\n    direction: LEFT\n    duration: 400\n"),
  swipeRight: () => addOut("- swipe:\n    direction: RIGHT\n    duration: 400\n"),
  swipeDown: () => addOut("- swipe:\n    direction: DOWN\n    duration: 400\n"),
  swipeUp: () => addOut("- swipe:\n    direction: UP\n    duration: 400\n"),
  /**
   * Swipes from a starting to an ending point.
   * @param start - Starting coordinates of the swipe.
   * @param end - Ending coordinates of the swipe.
   */
  swipe: (start, end) => {
    addOut(`- swipe:
    start: ${start.x}, ${start.y}
    end: ${end.x}, ${end.y}
`);
  },
  /**
   * Inputs text into a focused element or the specified input by testId.
   * @param text - The text to input.
   * @param id - Optional testId of the target input element.
   */
  inputText: (text, id) => {
    addOut(id ? `- tapOn:
    id: "${id}"
- inputText: ${text}
` : `- inputText: ${text}
`);
  },
  /**
   * Inputs a random name into a focused input or specified by testId.
   * @param id - Optional testId of the target input element.
   */
  inputRandomName: (id) => {
    addOut(id ? `- tapOn:
    id: "${id}"
- inputRandomPersonName
` : `- inputRandomPersonName
`);
  },
  /**
   * Inputs a random number into a focused input or specified by testId.
   * @param id - Optional testId of the target input element.
   */
  inputRandomNumber: (id) => {
    addOut(id ? `- tapOn:
    id: "${id}"
- inputRandomNumber
` : `- inputRandomNumber
`);
  },
  /**
   * Copies text from an element by its testId.
   * @param id - The testId of the element.
   */
  copyTextFrom: (id) => {
    addOut(`- copyTextFrom:
    id: "${id}"
`);
  },
  /**
   * Inputs a random email into a focused input or specified by testId.
   * @param id - Optional testId of the target input element.
   */
  inputRandomEmail: (id) => {
    addOut(id ? `- tapOn:
    id: "${id}"
- inputRandomEmail
` : `- inputRandomEmail
`);
  },
  /**
   * Inputs random text into a focused input or specified by testId.
   * @param id - Optional testId of the target input element.
   */
  inputRandomText: (id) => {
    addOut(id ? `- tapOn:
    id: "${id}"
- inputRandomText
` : `- inputRandomText
`);
  },
  /**
   * Erases a specified number of characters from an input.
   * @param chars - Number of characters to erase.
   * @param id - Optional testId of the target input element.
   */
  eraseText: (chars, id) => {
    addOut(id ? `- tapOn:
    id: "${id}"
- eraseText: ${chars ?? 50}
` : `- eraseText: ${chars ?? 50}
`);
  },
  /**
   * Opens a specified URL or deep link.
   * @param url - The URL or deep link to open.
   */
  openLink: (url) => {
    addOut(`- openLink: ${url}
`);
  },
  /**
   * Navigates to a specific path using the deep link base.
   * @param path - The path to navigate.
   */
  navigate: (path) => {
    addOut(`- openLink: ${process.env["deepLinkBase"]}${path}
`);
  },
  /**
   * Asserts that an element by testId is visible.
   * @param id - The testId of the element.
   * @param enabled - Optional; checks if the element is enabled.
   */
  assertVisible: (id, enabled = false) => {
    addOut(enabled ? `- assertVisible:
    id: "${id}"
    enabled: true
` : `- assertVisible:
    id: "${id}"
`);
  },
  /**
   * Asserts that an element by testId is not visible.
   * @param id - The testId of the element.
   */
  assertNotVisible: (id) => {
    addOut(`- assertNotVisible:
    id: "${id}"
`);
  },
  /**
   * Scrolls the screen.
   */
  scroll: () => {
    addOut("- scroll\n");
  },
  /**
   * Scrolls until an element with the given testId is visible.
   * @param id - The testId of the element.
   */
  scrollUntilVisible: (id) => {
    addOut(`- scrollUntilVisible:
    element:
      id: "${id}"
`);
  },
  /**
   * Waits until an animation/video finishes and screen becomes static.
   * @param maxWait - Optional; max timeout after which flow continues.
   */
  waitForAnimationEnd: (maxWait) => {
    const command = maxWait ? `- waitForAnimationToEnd:
    timeout: ${maxWait}
` : "- waitForAnimationToEnd\n";
    addOut(command);
  },
  /**
   * Waits until an element by testId is visible.
   * @param id - The testId of the element.
   * @param maxWait - Max wait time in milliseconds.
   */
  waitUntilVisible: (id, maxWait) => {
    addOut(`- extendedWaitUntil:
    visible:
        id: "${id}"
    timeout: ${maxWait ?? 5e3}
`);
  },
  /**
   * Waits until an element by testId is not visible.
   * @param id - The testId of the element.
   * @param maxWait - Max wait time in milliseconds.
   */
  waitUntilNotVisible: (id, maxWait) => {
    addOut(`- extendedWaitUntil:
    notVisible:
        id: "${id}"
    timeout: ${maxWait ?? 5e3}
`);
  },
  /**
   * Waits a specified number of milliseconds.
   * @param ms - Number of milliseconds to wait.
   */
  wait: (ms) => {
    addOut(`- swipe:
    start: -1, -1
    end: -1, -100
    duration: ${ms}
`);
  },
  /**
   * Dismisses the software keyboard.
   */
  hideKeyboard: () => {
    addOut("- hideKeyboard\n");
  },
  /**
   * Takes a screenshot and stores it with the specified filename.
   * @param fileName - The name to save the screenshot under.
   */
  screenshot: (fileName) => {
    addOut(`- takeScreenshot: ${fileName}
`);
  },
  /**
   * Presses the enter key on the software keyboard.
   */
  pressEnter: () => {
    addOut("- pressKey: Enter\n");
  },
  /**
   * Presses the home button on the device.
   */
  pressHomeButton: () => {
    addOut("- pressKey: Home\n");
  },
  /**
   * Presses the lock button on the device.
   */
  pressLockButton: () => {
    addOut("- pressKey: Lock\n");
  },
  /**
   * Presses the Android back button.
   */
  back: () => {
    addOut("- pressKey: back\n");
  },
  /**
   * Decreases the device volume.
   */
  volumeDown: () => {
    addOut("- pressKey: volume down\n");
  },
  /**
   * Increases the device volume.
   */
  volumeUp: () => {
    addOut("- pressKey: volume up\n");
  },
  /**
   * Stops the current app or specified app ID.
   * @param appId - Optional; the app ID to stop.
   */
  stopApp: ({ appId } = {}) => {
    appId = appId ?? envAppId;
    addOut(appId ? `- stopApp: ${appId}
` : "- stopApp\n");
  },
  /**
   * Repeats specified actions a given number of times.
   * @param times - Number of repetitions.
   * @param func - Actions to repeat.
   */
  repeat: (times, func) => {
    const out2 = handleNest(func);
    addOut(`- repeat:
    times: ${times}
    commands:
        ${out2.replace(/\n/g, "\n        ")}`);
  },
  /**
   * Repeats actions while an element by testId is visible.
   * @param id - The testId of the element.
   * @param func - Actions to repeat.
   */
  repeatWhileVisible: (id, func) => {
    const out2 = handleNest(func);
    addOut(`- repeat:
    while:
        visible:
            id: "${id}"
    commands:
        ${out2.replace(/\n/g, "\n        ")}`);
  },
  /**
   * Repeats actions while an element by testId is not visible.
   * @param id - The testId of the element.
   * @param func - Actions to repeat.
   */
  repeatWhileNotVisible: (id, func) => {
    const out2 = handleNest(func);
    addOut(`- repeat:
    while:
        notVisible:
            id: "${id}"
    commands:
        ${out2.replace(/\n/g, "\n        ")}`);
  },
  /**
   * Inserts inline YAML code for specialized commands.
   * @param yaml - The inline YAML to insert.
   */
  yaml: (yaml) => `${yaml}
`,
  /**
   * Checks if a condition is true.
   * @param condition - The condition to assert.
   */
  assertTrue: (condition) => {
    addOut(`- assertTrue: ${condition}
`);
  }
};
export { MaestroTranslators as M };
export { writeYaml } from "./write-yaml.mjs";
