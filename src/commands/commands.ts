import { tapOn, tapOnPoint, tapOnText, waitForAndTapOn } from "./tap";
import { runFlow, runScript } from "./run";
import { clearState, initFlow, launchApp } from "./init";
import { repeat, repeatWhileVisible, repeatWhileNotVisible } from "./repeat";
import { assertNotVisible, assertVisible } from "./assert";
import { addMedia } from "./addMedia";
import { addOut } from "../out";
import { PointProps } from "../type";

// Utility function for indenting except last line break
export const indentExceptLastLineBreak = (str: string) => {
  return str.replace(/\n(?=.*[\n])/g, "\n        ");
};

export const space = "    ";

// Main translator functions
const MaestroTranslators = {
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

  /**
   * Runs a sub-flow defined by a path with optional environment variables.
   * @param path - The path to the sub-flow.
   * @param env - Optional map of environment variables for the sub-flow.
   */
  runFlow,
  /**
   * Taps on an element specified by a testId.
   * @param id - The testId of the target element.
   * @param props - Optional tap properties for customized tap behavior.
   */
  tapOn,
  /**
   * Taps on a visible text element on the screen.
   * @param text - The text to tap on.
   * @param props - Optional tap properties such as retries, repeat count, and timeout.
   */
  tapOnText,
  /**
   * Taps on a specific point on the screen.
   * @param point - Coordinates to tap, can use numbers (dips) or strings (percentages).
   * @param props - Optional tap properties.
   */
  tapOnPoint,
  /**
   * Waits for an element by testId to appear, then taps on it.
   * @param id - Required: The testId of the element to wait for and tap.
   * @param props - Properties for wait and tap actions, combining both WaitProps and TapProps.
   */
  waitForAndTapOn,
  /**
   * Clears the entire keychain.
   */
  clearKeychain: () => {
    addOut("- clearKeychain\n");
  },
  /**
   * Performs a long press on an element identified by its testId.
   * @param id - The testId of the element to long press.
   */
  longPressOn: (id: string) => {
    addOut(`- longPressOn:\n    id: "${id}"\n`);
  },
  /**
   * Performs a long press on a specified point.
   * @param point - The x and y coordinates to long press.
   */
  longPressOnPoint: (pointProps: PointProps) => {
    addOut(`- longPressOn:\n    point: ${pointProps.x},${pointProps.y}\n`);
  },
  /**
   * Performs a long press on a text element visible on the screen.
   * @param text - The visible text to long press.
   */
  longPressOnText: (text: string) => {
    addOut(`- longPressOn: ${text}\n`);
  },

  /**
   * Swipes left from the screen center.
   */
  swipeLeft: () => addOut("- swipe:\n    direction: LEFT\n    duration: 400\n"),
  /**
   * Swipes right from the screen center.
   */
  swipeRight: () =>
    addOut("- swipe:\n    direction: RIGHT\n    duration: 400\n"),
  /**
   * Swipes down from the screen center.
   */
  swipeDown: () => addOut("- swipe:\n    direction: DOWN\n    duration: 400\n"),
  /**
   * Swipes up from the screen center.
   */
  swipeUp: () => addOut("- swipe:\n    direction: UP\n    duration: 400\n"),

  /**
   * Swipes from a specified start point to an end point.
   * @param start - Starting coordinates for the swipe.
   * @param end - Ending coordinates for the swipe.
   */
  swipe: (start: PointProps, end: PointProps) => {
    addOut(
      `- swipe:\n    start: ${start.x}, ${start.y}\n    end: ${end.x}, ${end.y}\n`
    );
  },

  /**
   * Inputs text into the focused or specified input element.
   * @param text - The text to input.
   * @param id - Optional testId of the input element.
   */
  inputText: (text: string, id?: string) => {
    addOut(
      id
        ? `- tapOn:\n    id: "${id}"\n- inputText: ${text}\n`
        : `- inputText: ${text}\n`
    );
  },

  /**
   * Inputs a random name into the focused or specified input element.
   * @param id - Optional testId of the input element.
   */
  inputRandomName: (id?: string) => {
    addOut(
      id
        ? `- tapOn:\n    id: "${id}"\n- inputRandomPersonName\n`
        : `- inputRandomPersonName\n`
    );
  },

  /**
   * Inputs a random number into the focused or specified input element.
   * @param id - Optional testId of the input element.
   */
  inputRandomNumber: (id?: string) => {
    addOut(
      id
        ? `- tapOn:\n    id: "${id}"\n- inputRandomNumber\n`
        : `- inputRandomNumber\n`
    );
  },

  /**
   * Copies text from an element identified by its testId.
   * @param id - The testId of the element to copy text from.
   */
  copyTextFrom: (id: string) => {
    addOut(`- copyTextFrom:\n    id: "${id}"\n`);
  },

  /**
   * Inputs a random email address into the focused or specified input element.
   * @param id - Optional testId of the input element.
   */
  inputRandomEmail: (id?: string) => {
    addOut(
      id
        ? `- tapOn:\n    id: "${id}"\n- inputRandomEmail\n`
        : `- inputRandomEmail\n`
    );
  },

  /**
   * Inputs random text into the focused or specified input element.
   * @param id - Optional testId of the input element.
   */
  inputRandomText: (id?: string) => {
    addOut(
      id
        ? `- tapOn:\n    id: "${id}"\n- inputRandomText\n`
        : `- inputRandomText\n`
    );
  },

  /**
   * Erases a specified number of characters from the focused or specified input element.
   * @param chars - Number of characters to erase.
   * @param id - Optional testId of the input element.
   */
  eraseText: (chars: number, id?: string) => {
    addOut(
      id
        ? `- tapOn:\n    id: "${id}"\n- eraseText: ${chars ?? 50}\n`
        : `- eraseText: ${chars ?? 50}\n`
    );
  },

  /**
   * Opens a specified URL or deep link.
   * @param url - The URL or deep link to open.
   */
  openLink: (url: string) => {
    addOut(`- openLink: ${url}\n`);
  },

  /**
   * Navigates to a specified path using the deep link base.
   * @param path - The path to navigate to.
   */
  navigate: (path: string) => {
    addOut(`- openLink: ${process.env["deepLinkBase"]}${path}\n`);
  },

  /**
   * Asserts that an element with the given testId is visible.
   * @param id - The testId of the element to check.
   * @param enabled - If true, checks that the element is both visible and enabled.
   */
  assertVisible,

  /**
   * Asserts that an element with the given testId is not visible.
   * @param id - The testId of the element to check.
   */
  assertNotVisible,

  /**
   * Scrolls down on the screen.
   */
  scroll: () => {
    addOut("- scroll\n");
  },

  /**
   * Scrolls until an element with the given testId is visible.
   * @param id - The testId of the element to scroll until visible.
   */
  scrollUntilVisible: (id: string) => {
    addOut(`- scrollUntilVisible:\n    element:\n      id: "${id}"\n`);
  },

  /**
   * Waits until an ongoing animation or video ends.
   * @param maxWait - Optional timeout (in milliseconds) to wait before proceeding.
   */
  waitForAnimationEnd: (maxWait: number = 5000) => {
    addOut(
      maxWait
        ? `- waitForAnimationToEnd:\n    timeout: ${maxWait}\n`
        : "- waitForAnimationToEnd\n"
    );
  },

  /**
   * Waits until an element with the given testId is visible.
   * @param id - The testId of the element to wait for.
   * @param maxWait - Maximum wait time (in milliseconds) for the element to appear.
   */
  waitUntilVisible: (id: string, maxWait: number) => {
    addOut(
      `- extendedWaitUntil:\n    visible:\n        id: "${id}"\n    timeout: ${
        maxWait ?? 5000
      }\n`
    );
  },

  /**
   * Waits until an element with the given testId is no longer visible.
   * @param id - The testId of the element to wait for.
   * @param maxWait - Maximum wait time (in milliseconds) for the element to disappear.
   */
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

  /**
   * Stops the current app or the specified app by appId.
   * @param appId - Optional appId to specify which app to stop.
   */
  stopApp: ({ appId }: { appId?: string } = {}) => {
    addOut(appId ? `- stopApp: ${appId}\n` : "- stopApp\n");
  },

  repeat,

  repeatWhileVisible,

  repeatWhileNotVisible,

  addMedia,

  yaml: (yaml: string) => `${yaml}\n`,

  assertTrue: (condition: string) => {
    addOut(`- assertTrue: ${condition}\n`);
  },
};

export { MaestroTranslators as M };

// utils for user
export const getOutput = (key: string) => "${output." + key + "}";

// runScript Types
declare global {
  namespace http {
    const get: (...args: any) => { body: string };
  }

  const json: <T extends any>(str: string) => T;
  const output: Record<string, string>;
}
