import {
  PointProps,
  tapOn,
  tapOnPoint,
  tapOnText,
  waitForAndTapOn,
} from "./tap";
import { runFlow, runScript } from "./run";
import { clearState, initFlow, launchApp } from "./init";
import { repeat, repeatWhileVisible, repeatWhileNotVisible } from "./repeat";
import { assertNotVisible, assertTrue, assertVisible } from "./assert";
import { addMedia } from "./addMedia";
import { addOut } from "../out";
import {
  copyTextFrom,
  eraseText,
  inputRandomEmail,
  inputRandomName,
  inputRandomNumber,
  inputRandomText,
  inputText,
} from "./text";
import { swipeDown, swipeLeft, swipeRight, swipeUp } from "./swipe";
import {
  wait,
  waitForAnimationEnd,
  waitUntilNotVisible,
  waitUntilVisible,
} from "./wait";

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
  swipeLeft,
  /**
   * Swipes right from the screen center.
   */
  swipeRight,
  /**
   * Swipes down from the screen center.
   */
  swipeDown,
  /**
   * Swipes up from the screen center.
   */
  swipeUp,

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
  inputText,

  /**
   * Inputs a random name into the focused or specified input element.
   * @param id - Optional testId of the input element.
   */
  inputRandomName,

  /**
   * Inputs a random number into the focused or specified input element.
   * @param id - Optional testId of the input element.
   */
  inputRandomNumber,

  /**
   * Copies text from an element identified by its testId.
   * @param id - The testId of the element to copy text from.
   */
  copyTextFrom,

  /**
   * Inputs a random email address into the focused or specified input element.
   * @param id - Optional testId of the input element.
   */
  inputRandomEmail,

  /**
   * Inputs random text into the focused or specified input element.
   * @param id - Optional testId of the input element.
   */
  inputRandomText,

  /**
   * Erases a specified number of characters from the focused or specified input element.
   * @param chars - Number of characters to erase.
   * @param id - Optional testId of the input element.
   */
  eraseText,

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
   * Asserts that a specified condition is true.
   * @param condition - The condition to assert.
   */
  assertTrue,

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
  waitForAnimationEnd,

  /**
   * Waits until an element with the given testId is visible.
   * @param id - The testId of the element to wait for.
   * @param maxWait - Maximum wait time (in milliseconds) for the element to appear.
   */
  waitUntilVisible,

  /**
   * Waits until an element with the given testId is no longer visible.
   * @param id - The testId of the element to wait for.
   * @param maxWait - Maximum wait time (in milliseconds) for the element to disappear.
   */
  waitUntilNotVisible,

  /**
   * Waits for a specified number of milliseconds.
   * @param ms - The number of milliseconds to wait.
   */
  wait,

  /**
   * Dismisses the software keyboard.
   */
  hideKeyboard: () => {
    addOut("- hideKeyboard\n");
  },

  /**
   * Takes a screenshot and stores it with the specified filename.
   * @param fileName - The name to save the screenshot as.
   */
  screenshot: (fileName: string) => {
    addOut(`- takeScreenshot: ${fileName}\n`);
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
   * Presses the back button on Android devices.
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
   * Stops the current app or the specified app by appId.
   * @param appId - Optional appId to specify which app to stop.
   */
  stopApp: ({ appId }: { appId?: string } = {}) => {
    addOut(appId ? `- stopApp: ${appId}\n` : "- stopApp\n");
  },

  /**
   * Repeats a set of actions a specified number of times.
   * @param props - The properties of the repeat command.
   * @param func - The function containing actions to repeat.
   */
  repeat,

  /**
   * Repeats a set of actions while an element is visible.
   * @param matcher - The element matcher to repeat while visible.
   * @param func - The function containing actions to repeat.
   */
  repeatWhileVisible,

  /**
   * Repeats a set of actions while an element is not visible.
   * @param matcher - The element matcher to repeat while not visible.
   * @param func - The function containing actions to repeat.
   */
  repeatWhileNotVisible,

  addMedia,
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
