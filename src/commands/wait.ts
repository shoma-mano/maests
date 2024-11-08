import { addOut } from "../out";

/**
 * Waits until an ongoing animation or video ends.
 * @param maxWait - Optional timeout (in milliseconds) to wait before proceeding.
 */
export const waitForAnimationEnd = (maxWait: number = 5000) => {
  addOut(
    maxWait
      ? `- waitForAnimationToEnd:\n    timeout: ${maxWait}\n`
      : "- waitForAnimationToEnd\n"
  );
};

/**
 * Waits until an element with the given testId is visible.
 * @param id - The testId of the element to wait for.
 * @param maxWait - Maximum wait time (in milliseconds) for the element to appear.
 */
export const waitUntilVisible = (id: string, maxWait: number) => {
  addOut(
    `- extendedWaitUntil:\n    visible:\n        id: "${id}"\n    timeout: ${
      maxWait ?? 5000
    }\n`
  );
};

/**
 * Waits until an element with the given testId is no longer visible.
 * @param id - The testId of the element to wait for.
 * @param maxWait - Maximum wait time (in milliseconds) for the element to disappear.
 */
export const waitUntilNotVisible = (id: string, maxWait: number) => {
  addOut(
    `- extendedWaitUntil:\n    notVisible:\n        id: "${id}"\n    timeout: ${
      maxWait ?? 5000
    }\n`
  );
};

/**
 * Waits for a specified number of milliseconds.
 * @param ms - The number of milliseconds to wait.
 */
export const wait = (ms: number) => {
  addOut(
    `- swipe:\n    start: -1, -1\n    end: -1, -100\n    duration: ${ms}\n`
  );
};
