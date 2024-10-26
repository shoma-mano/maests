import { describe, it, expect, beforeEach } from "vitest";
import { MaestroTranslators, resetOut, out } from "../src/commands";

const getOutput = () => {
  const currentOutput = out;
  resetOut(); // Reset output for clean snapshots in each test
  return currentOutput;
};

describe("MaestroTranslators Actions - Swipe/Scroll Command Snapshots", () => {
  beforeEach(() => {
    resetOut();
  });

  it("swipeLeft", () => {
    MaestroTranslators.swipeLeft();
    expect(getOutput()).toMatchSnapshot();
  });

  it("swipeRight", () => {
    MaestroTranslators.swipeRight();
    expect(getOutput()).toMatchSnapshot();
  });

  it("swipe from start to end", () => {
    MaestroTranslators.swipe({ x: "0%", y: "0%" }, { x: "100%", y: "100%" });
    expect(getOutput()).toMatchSnapshot();
  });

  it("scroll", () => {
    MaestroTranslators.scroll();
    expect(getOutput()).toMatchSnapshot();
  });

  it("scrollUntilVisible", () => {
    MaestroTranslators.scrollUntilVisible("testId");
    expect(getOutput()).toMatchSnapshot();
  });

  it("swipe command from start to end with percentage coordinates", () => {
    MaestroTranslators.swipe(
      { x: "0%", y: "0%" },
      { x: "100%", y: "100%" }
    );
    expect(getOutput()).toMatchSnapshot();
  });
});
