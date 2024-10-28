import { buildSync } from "esbuild";
import { TapProps, PointProps, WaitProps } from "./command-props";

// Nested command handling
let isNested = false;
let nestedCommands = "";
import { buildSync } from "esbuild";
import { TapProps, PointProps, WaitProps } from "./command-props";

// nested commands
let nestLevel = 0;
let nestedCommands = [];
const handleNest = (func: () => any) => {
  nestLevel++;
  func();
  const out = nestedCommands[nestLevel - 1];
  console.log("out", out);
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

const space = "    ";

// Helper function to format optional tap properties
/**
 * Formats optional tap properties into the command output format.
 * @param retryTapIfNoChange - If true, retries the tap if no change occurs after the first attempt.
 * @param repeat - The number of times to repeat the tap action.
 * @param waitToSettleTimeoutMs - The time to wait (in milliseconds) for the element to settle after tapping.
 * @returns The formatted string of optional tap properties.
 */
const formatTapProps = ({
  retryTapIfNoChange = true,
  repeat,
  waitToSettleTimeoutMs,
}: TapProps): string => {
  let propsCommand = "";

  if (retryTapIfNoChange === false) propsCommand += `    retryTapIfNoChange: ${retryTapIfNoChange}\n`;
  if (typeof repeat === "number") propsCommand += `    repeat: ${repeat}\n`;
  if (typeof waitToSettleTimeoutMs === "number") propsCommand += `    waitToSettleTimeoutMs: ${waitToSettleTimeoutMs}\n`;

  return propsCommand;
};

type WaitAndTapProps = TapProps & WaitProps;

// Main translator functions
const envAppId = process.env["appId"];
export const MaestroTranslators = {
  /**
   * Initializes the test flow with an optional application ID.
   * @param appId - Optional application ID to override the default environment appId.
   */
  initFlow: ({
    appId,
    onFlowStart,
  }: { appId?: string; onFlowStart?: () => void } = {}) => {
    const appIdCommand = `appId: ${appId ?? envAppId}\n`;
    let commands = appIdCommand;
    if (onFlowStart) {
      const nested = handleNest(onFlowStart);
      // prettier-ignore
      const flowCommand =
`onFlowStart:
${nested.replaceAll(/\n/g,`${space}\n`)}`;

      commands += flowCommand;
    }

    const separetor = "---\n";
    commands += separetor;

    addOut(commands);
  },

  /**
   * Launches the application with optional configurations.
   * @param appId - Optional app ID to use for launching the app.
   */
  launchApp: ({ appId }: { appId?: string } = {}) => {
    addOut(`- launchApp:\n    appId: "${appId ?? envAppId}"\n`);
  },

  /**
   * Clears the state of the application.
   * @param appId - Optional app ID to clear a specific application's state.
   */
  clearState: ({ appId }: { appId?: string } = {}) => {
    addOut(appId ? `- clearState: ${appId}\n` : "- clearState\n");
  },

  /**
   * Clears the entire keychain.
   * runScript.
   */
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
    // delete comment lines
    code = code.replace(/^\s*\/\/.*/gm, "\n");
    // remove space around :
    code = code.replace(/\s*:\s*/g, ":");
    // inject env variables
    code = code.replace(/process\.env\.([^\n\s]*)/g, (_, p1) => {
      if (!p1.startsWith("MAESTRO_")) {
        console.warn(
          "Environment variable that is not started with MAESTRO_ will be ignored:",
          p1
        );
      }
      return p1;
    });

    // prettier-ignore
    const command =`- evalScript: \${${code.replaceAll("\n","")}}\n`
    addOut(command);
  },
  /**
   * Clear the entire keychain.
   */
  clearKeychain: () => {
    addOut("- clearKeychain\n");
  },

  /**
   * Taps on an element by its test ID with optional retry and repeat configurations.
   * @param id - The test ID of the target element.
   * @param props - Optional properties to customize the tap action.
   */
  tapOn: (id: string, props: TapProps = {}) => {
    let command = `- tapOn:\n${space}id: "${id}"\n`);
    command += formatTapProps(props);
    addOut(command);
  },

  /**
   * Taps on visible text on the screen with optional retry and repeat configurations.
   * @param text - The visible text to tap on.
   * @param props - Optional properties to customize the tap action.
   */
  tapOnText: (text: string, props: TapProps = {}) => {
    let command = `- tapOn:\n    text: "${text}"\n`;
    command += formatTapProps(props);
    addOut(command);
  },

  /**
   * Taps on a specified point on the screen.
   * @param point - The x and y coordinates of the tap.
   * @param props - Optional properties for customizing the tap action.
   */
  tapOnPoint: (point: PointProps, props: TapProps = {}) => {
    const { x, y } = point;
    let command = `- tapOn:\n    point: ${x},${y}\n`;
    command += formatTapProps(props);
    addOut(command);
  },

  /**
   * Waits for an element by testId to appear, then taps on it.
   * @param id - The testId of the element to wait for and tap.
   * @param props - Optional wait and tap properties, including maxWait for wait-based actions.
   */
  waitForAndTapOn: (id: string, props: WaitAndTapProps = {}) => {
    const { maxWait = 5000 } = props; // Default maxWait only for this function

    let command = `- extendedWaitUntil:\n    visible:\n        id: "${id}"\n    timeout: ${maxWait}\n`;
    command += `- tapOn:\n    id: "${id}"\n`;
    command += formatTapProps(props);
    addOut(command);
  },

  /**
   * Long presses on an element by its testId.
   * @param id - The testId of the element to long press on.
   */
  longPressOn: (id: string) => {
    addOut(`- longPressOn:\n    id: "${id}"\n`);
  },

  /**
   * Long presses on a specified point on the screen.
   * @param point - The x and y coordinates for the long press.
   */
  longPressOnPoint: ({ x, y }: PointProps) => {
    addOut(`- longPressOn:\n    point: ${x},${y}\n`);
  },

  /**
   * Long presses on a specified text on the screen.
   * @param text - The text to long press.
   */
  longPressOnText: (text: string) => {
    addOut(`- longPressOn: ${text}\n`);
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
  swipe: (start: PointProps, end: PointProps) => {
    addOut(`- swipe:\n    start: ${start.x}, ${start.y}\n    end: ${end.x}, ${end.y}\n`);
  },

  /**
   * Inputs text into a focused element or the specified input by testId.
   * @param text - The text to input.
   * @param id - Optional testId of the target input element.
   */
  inputText: (text: string, id?: string) => {
    addOut(id ? `- tapOn:\n    id: "${id}"\n- inputText: ${text}\n` : `- inputText: ${text}\n`);
  },

  /**
   * Inputs a random name into a focused input or specified by testId.
   * @param id - Optional testId of the target input element.
   */
  inputRandomName: (id?: string) => {
    addOut(id ? `- tapOn:\n    id: "${id}"\n- inputRandomPersonName\n` : `- inputRandomPersonName\n`);
  },

  /**
   * Inputs a random number into a focused input or specified by testId.
   * @param id - Optional testId of the target input element.
   */
  inputRandomNumber: (id?: string) => {
    addOut(id ? `- tapOn:\n    id: "${id}"\n- inputRandomNumber\n` : `- inputRandomNumber\n`);
  },

  /**
   * Copies text from an element by its testId.
   * @param id - The testId of the element.
   */
  copyTextFrom: (id: string) => {
    addOut(`- copyTextFrom:\n    id: "${id}"\n`);
  },

  /**
   * Inputs a random email into a focused input or specified by testId.
   * @param id - Optional testId of the target input element.
   */
  inputRandomEmail: (id?: string) => {
    addOut(id ? `- tapOn:\n    id: "${id}"\n- inputRandomEmail\n` : `- inputRandomEmail\n`);
  },

  /**
   * Inputs random text into a focused input or specified by testId.
   * @param id - Optional testId of the target input element.
   */
  inputRandomText: (id?: string) => {
    addOut(id ? `- tapOn:\n    id: "${id}"\n- inputRandomText\n` : `- inputRandomText\n`);
  },

  /**
   * Erases a specified number of characters from an input.
   * @param chars - Number of characters to erase.
   * @param id - Optional testId of the target input element.
   */
  eraseText: (chars: number, id?: string) => {
    addOut(id ? `- tapOn:\n    id: "${id}"\n- eraseText: ${chars ?? 50}\n` : `- eraseText: ${chars ?? 50}\n`);
  },

  /**
   * Opens a specified URL or deep link.
   * @param url - The URL or deep link to open.
   */
  openLink: (url: string) => {
    addOut(`- openLink: ${url}\n`);
  },

  /**
   * Navigates to a specific path using the deep link base.
   * @param path - The path to navigate.
   */
  navigate: (path: string) => {
    addOut(`- openLink: ${process.env["deepLinkBase"]}${path}\n`);
  },

  /**
   * Asserts that an element by testId is visible.
   * @param id - The testId of the element.
   * @param enabled - Optional; checks if the element is enabled.
   */
  assertVisible: (id: string, enabled: boolean) => {
      if (enabled)
        addOut(`- assertVisible:\n    id: "${id}"\n    enabled: true\n`);
      addOut(`- assertVisible:\n    id: "${id}"\n`);
    },

  /**
   * Asserts that an element by testId is not visible.
   * @param id - The testId of the element.
   */
  assertNotVisible: (id: string) => {
    addOut(`- assertNotVisible:\n    id: "${id}"\n`);
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
  scrollUntilVisible: (id: string) => {
    addOut(`- scrollUntilVisible:\n    element:\n      id: "${id}"\n`);
  },

  /**
   * Waits until an animation/video finishes and screen becomes static.
   * @param maxWait - Optional: Max timeout after which flow continues. Defaults to 5000ms
   */
  waitForAnimationEnd: (maxWait: number = 5000) => {
    const command = maxWait
        ? `- waitForAnimationToEnd:\n    timeout: ${maxWait}\n`
        : "- waitForAnimationToEnd\n";

    addOut(command);
  },
  /**
   * Waits until an element by testId is visible.
   * @param id - The testId of the element.
   * @param maxWait - Max wait time in milliseconds.
   */
  waitUntilVisible: (id: string, maxWait: number) => {
      addOut(
        "- extendedWaitUntil:\n" +
          "    visible:\n" +
          `        id: "${id}"\n` +
          `    timeout: ${maxWait ?? 5000}\n`
     );
  },

  /**
   * Waits until an element by testId is not visible.
   * @param id - The testId of the element.
   * @param maxWait - Max wait time in milliseconds.
   */
  waitUntilNotVisible: (id: string, maxWait: number) => {
      addOut(
        "- extendedWaitUntil:\n" +
          "    notVisible:\n" +
          `        id: "${id}"\n` +
          `    timeout: ${maxWait ?? 5000}\n`
      );
    },

  /**
   * Waits a specified number of milliseconds.
   * @param ms - Number of milliseconds to wait.
   */
  wait: (ms: number) => {
      addOut(
        "- swipe:\n" +
          "    start: -1, -1\n" +
          "    end: -1, -100\n" +
          `    duration: ${ms}\n`
      );
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
  stopApp: ({ appId }: { appId?: string } = {}) => {
    appId = appId ?? envAppId;
    if (appId) addOut(`- stopApp: ${appId}\n`);
    addOut("- stopApp\n");
  },

  /**
   * Repeats specified actions a given number of times.
   * @param times - Number of repetitions.
   * @param func - Actions to repeat.
   */
  repeat: (times: number, func: () => void) => {
    const out = handleNest(func);
    // prettier-ignore
    const commands =

`- repeat:
     times: ${times}
     commands:
        ${indentExceptLastLineBreak(out)}`;

    addOut(commands);
  },

  /**
   * Repeats actions while an element by testId is visible.
   * @param id - The testId of the element.
   * @param func - Actions to repeat.
   */
  repeatWhileVisible: (id: string, func: () => void) => {
    const out = handleNest(func);
    // prettier-ignore
    const commands =

`- repeat:
     while:
         visible:
             id: "${id}"
     commands:
        ${indentExceptLastLineBreak(out)}`;

    addOut(commands);
  },

  /**
   * Repeats actions while an element by testId is not visible.
   * @param id - The testId of the element.
   * @param func - Actions to repeat.
   */
  repeatWhileNotVisible: (id: string, func: () => void) => {
    const out = handleNest(func);
    addOut(`- repeat:
    while:
        notVisible:
            id: "${id}"
    commands:
        ${out.replace(/\n(?=.*[\n])/g, "\n        ")}`);
  },

  /**
   * Inserts inline YAML code for specialized commands.
   * @param yaml - The inline YAML to insert.
   */
  yaml: (yaml: string) => `${yaml}\n`,

  /**
   * Checks if a condition is true.
   * @param condition - The condition to assert.
   */
  assertTrue: (condition: string) => {
    addOut(`- assertTrue: ${condition}\n`);
  },
};

// utils
function indentExceptLastLineBreak(str: string) {
  return str.replace(/\n(?=.*[\n])/g, "\n        ");
}

export { MaestroTranslators as M };
export { writeYaml } from "./write-yaml";

declare global {
  namespace http {
    const get: (...args: any) => { body: string };
  }

  const json: <T extends any>(str: string) => T;
  const output: Record<string, string>;
}
