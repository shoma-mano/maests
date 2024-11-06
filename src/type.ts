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
