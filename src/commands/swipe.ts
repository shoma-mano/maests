import { addOut, getOut } from "../out";

/**
 * Swipes left from the screen center.
 */
export const swipeLeft = () =>
  addOut("- swipe:\n    direction: LEFT\n    duration: 400\n");

if (import.meta.vitest) {
  it("swipeLeft", () => {
    swipeLeft();
    expect(getOut()).toMatchInlineSnapshot(`
      "- swipe:
          direction: LEFT
          duration: 400
      "
    `);
  });
}

/**
 * Swipes right from the screen center.
 */
export const swipeRight = () =>
  addOut("- swipe:\n    direction: RIGHT\n    duration: 400\n");

if (import.meta.vitest) {
  it("swipeRight", () => {
    swipeRight();
    expect(getOut()).toMatchInlineSnapshot(`
      "- swipe:
          direction: RIGHT
          duration: 400
      "
    `);
  });
}

/**
 * Swipes down from the screen center.
 */
export const swipeDown = () =>
  addOut("- swipe:\n    direction: DOWN\n    duration: 400\n");

if (import.meta.vitest) {
  it("swipeDown", () => {
    swipeDown();
    expect(getOut()).toMatchInlineSnapshot(`
      "- swipe:
          direction: DOWN
          duration: 400
      "
    `);
  });
}

/**
 * Swipes up from the screen center.
 */
export const swipeUp = () =>
  addOut("- swipe:\n    direction: UP\n    duration: 400\n");

if (import.meta.vitest) {
  it("swipeUp", () => {
    swipeUp();
    expect(getOut()).toMatchInlineSnapshot(`
      "- swipe:
          direction: UP
          duration: 400
      "
    `);
  });
}
