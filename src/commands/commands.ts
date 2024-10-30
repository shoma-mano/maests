import { tapOn, tapOnPoint, tapOnText, waitForAndTapOn } from "./tap";
import { runFlow, runScript } from "./run";
import { clearState, initFlow, launchApp } from "./init";
import { repeat, repeatWhileVisible, repeatWhileNotVisible } from "./repeat";
import { assertNotVisible, assertVisible } from "./assert";
import { addOut } from "../out";
import { PointProps } from "../type";

// Utility function for indenting except last line break
export const indentExceptLastLineBreak = (str: string) => {
  return str.replace(/\n(?=.*[\n])/g, "\n        ");
};

export const space = "    ";

// Main translator functions
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

  runFlow,

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

  assertVisible,

  assertNotVisible,

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

  repeat,

  repeatWhileVisible,

  repeatWhileNotVisible,

  yaml: (yaml: string) => `${yaml}\n`,

  assertTrue: (condition: string) => {
    addOut(`- assertTrue: ${condition}\n`);
  },
};

export { MaestroTranslators as M };
export { writeYaml } from "../write-yaml";

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
