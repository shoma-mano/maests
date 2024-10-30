import { TapOptions } from "./commands/tap";

export interface WaitProps {
  maxWait?: number;
}

export interface PointProps {
  x: number | string;
  y: number | string;
}

type WaitAndTapProps = TapOptions & WaitProps;

export interface NestedOrBase {
  /**
   * Taps on a visible text element on the screen.
   * @param text - The text to tap on.
   * @param props - Optional tap properties such as retries, repeat count, and timeout.
   */
  tapOnText(text: string, props?: TapOptions): void;

  /**
   * Taps on an element specified by a testId.
   * @param id - The testId of the target element.
   * @param props - Optional tap properties for customized tap behavior.
   */
  tapOn(id: string, props?: TapOptions): void;

  /**
   * Waits for an element by testId to appear, then taps on it.
   * @param id - Required: The testId of the element to wait for and tap.
   * @param props - Properties for wait and tap actions, combining both WaitProps and TapProps.
   */
  waitForAndTapOn(id: string, props?: WaitAndTapProps): void;

  /**
   * Performs a long press on an element identified by its testId.
   * @param id - The testId of the element to long press.
   */
  longPressOn(id: string): void;

  /**
   * Performs a long press on a text element visible on the screen.
   * @param text - The visible text to long press.
   */
  longPressOnText(text: string): void;

  /**
   * Taps on a specific point on the screen.
   * @param point - Coordinates to tap, can use numbers (dips) or strings (percentages).
   * @param props - Optional tap properties.
   */
  tapOnPoint(point: PointProps, props?: TapOptions): void;

  /**
   * Performs a long press on a specified point.
   * @param point - The x and y coordinates to long press.
   */
  longPressOnPoint(point: PointProps): void;

  /**
   * Swipes left from the screen center.
   */
  swipeLeft(): void;

  /**
   * Swipes right from the screen center.
   */
  swipeRight(): void;

  /**
   * Swipes down from the screen center.
   */
  swipeDown(): void;

  /**
   * Swipes up from the screen center.
   */
  swipeUp(): void;

  /**
   * Swipes from a specified start point to an end point.
   * @param start - Starting coordinates for the swipe.
   * @param end - Ending coordinates for the swipe.
   */
  swipe(start: PointProps, end: PointProps): void;

  /**
   * Inputs text into the focused or specified input element.
   * @param text - The text to input.
   * @param id - Optional testId of the input element.
   */
  inputText(text: string, id?: string): void;

  /**
   * Inputs a random name into the focused or specified input element.
   * @param id - Optional testId of the input element.
   */
  inputRandomName(id?: string): void;

  /**
   * Inputs a random number into the focused or specified input element.
   * @param id - Optional testId of the input element.
   */
  inputRandomNumber(id?: string): void;

  /**
   * Copies text from an element identified by its testId.
   * @param id - The testId of the element to copy text from.
   */
  copyTextFrom(id: string): void;

  /**
   * Inputs a random email address into the focused or specified input element.
   * @param id - Optional testId of the input element.
   */
  inputRandomEmail(id?: string): void;

  /**
   * Inputs random text into the focused or specified input element.
   * @param id - Optional testId of the input element.
   */
  inputRandomText(id?: string): void;

  /**
   * Erases a specified number of characters from the focused or specified input element.
   * @param chars - Number of characters to erase.
   * @param id - Optional testId of the input element.
   */
  eraseText(chars: number, id?: string): void;

  /**
   * Opens a specified URL or deep link.
   * @param url - The URL or deep link to open.
   */
  openLink(url: string): void;

  /**
   * Navigates to a specified path using the deep link base.
   * @param path - The path to navigate to.
   */
  navigate(path: string): void;

  /**
   * Asserts that an element with the given testId is visible.
   * @param id - The testId of the element to check.
   * @param enabled - If true, checks that the element is both visible and enabled.
   */
  assertVisible(id: string, enabled?: boolean): void;

  /**
   * Asserts that an element with the given testId is not visible.
   * @param id - The testId of the element to check.
   */
  assertNotVisible(id: string): void;

  /**
   * Scrolls down on the screen.
   */
  scroll(): void;

  /**
   * Scrolls until an element with the given testId is visible.
   * @param id - The testId of the element to scroll until visible.
   */
  scrollUntilVisible(id: string): void;

  /**
   * Waits until an ongoing animation or video ends.
   * @param maxWait - Optional timeout (in milliseconds) to wait before proceeding.
   */
  waitForAnimationEnd(maxWait: number): void;

  /**
   * Waits until an element with the given testId is visible.
   * @param id - The testId of the element to wait for.
   * @param maxWait - Maximum wait time (in milliseconds) for the element to appear.
   */
  waitUntilVisible(id: string, maxWait: number): void;

  /**
   * Waits until an element with the given testId is no longer visible.
   * @param id - The testId of the element to wait for.
   * @param maxWait - Maximum wait time (in milliseconds) for the element to disappear.
   */
  waitUntilNotVisible(id: string, maxWait: number): void;

  /**
   * Waits for a specified number of milliseconds.
   * @param ms - The number of milliseconds to wait.
   */
  wait(ms: number): void;

  /**
   * Dismisses the software keyboard.
   */
  hideKeyboard(): void;

  /**
   * Takes a screenshot and stores it with the specified filename.
   * @param fileName - The name to save the screenshot as.
   */
  screenshot(fileName: string): void;

  /**
   * Presses the enter key on the software keyboard.
   */
  pressEnter(): void;

  /**
   * Presses the home button on the device.
   */
  pressHomeButton(): void;

  /**
   * Presses the lock button on the device.
   */
  pressLockButton(): void;

  /**
   * Presses the back button on Android devices.
   */
  back(): void;

  /**
   * Increases the device volume.
   */
  volumeUp(): void;

  /**
   * Decreases the device volume.
   */
  volumeDown(): void;

  /**
   * Repeats a set of actions a specified number of times.
   * @param times - Number of times to repeat.
   * @param func - The function containing actions to repeat.
   */
  repeat(times: number, func: () => void): void;

  /**
   * Repeats a set of actions while an element with the given testId is visible.
   * @param id - The testId of the element.
   * @param func - The function containing actions to repeat.
   */
  repeatWhileVisible(id: string, func: () => void): void;

  /**
   * Repeats a set of actions while an element with the given testId is not visible.
   * @param id - The testId of the element.
   * @param func - The function containing actions to repeat.
   */
  repeatWhileNotVisible(id: string, func: () => void): void;

  /**
   * Inserts inline YAML code for specialized commands.
   * @param yaml - The YAML code to insert.
   */
  yaml(yaml: string): void;

  /**
   * Asserts that a specified condition is true.
   * @param condition - The condition to assert.
   */
  assertTrue(condition: string): void;
}

export interface All extends NestedOrBase {
  /**
   * Initializes the test flow with optional configuration.
   * @param config - Optional configuration with appId and other environment variables.
   */
  initFlow(config?: { appId?: string; [key: string]: string | number }): void;

  /**
   * Launches the application with optional configuration settings.
   * @param config - Configuration options for appId, state clearing, keychain clearing, and app stopping.
   */
  launchApp(config?: {
    appId?: string;
    clearState?: boolean;
    clearKeychain?: boolean;
    stopApp?: boolean;
  }): void;

  /**
   * Clears the state of the current app or the specified app by appId.
   * @param appId - Optional appId to clear state for a specific app.
   */
  clearState(appId?: string): void;

  /**
   * Clears the entire keychain.
   */
  clearKeychain(): void;

  /**
   * Runs a sub-flow defined by a path with optional environment variables.
   * @param path - The path to the sub-flow.
   * @param env - Optional map of environment variables for the sub-flow.
   */
  runFlow(path: string, env?: { [key: string]: string | number }): void;

  /**
   * Stops the current app or the specified app by appId.
   * @param appId - Optional appId to specify which app to stop.
   */
  stopApp(appId?: string): void;
}
