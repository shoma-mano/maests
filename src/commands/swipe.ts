import { addOut } from "../out";

/**
 * Swipes left from the screen center.
 */
export const swipeLeft = () =>
  addOut("- swipe:\n    direction: LEFT\n    duration: 400\n");

/**
 * Swipes right from the screen center.
 */
export const swipeRight = () =>
  addOut("- swipe:\n    direction: RIGHT\n    duration: 400\n");

/**
 * Swipes down from the screen center.
 */
export const swipeDown = () =>
  addOut("- swipe:\n    direction: DOWN\n    duration: 400\n");

/**
 * Swipes up from the screen center.
 */
export const swipeUp = () =>
  addOut("- swipe:\n    direction: UP\n    duration: 400\n");
