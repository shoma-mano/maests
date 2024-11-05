// this file will be deleted in the future
import { TapOptions } from "./commands/tap";

export interface WaitProps {
  maxWait?: number;
}

export interface PointProps {
  x: number | string;
  y: number | string;
}

export interface NestedOrBase {
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
