import { describe, it, expect, beforeEach } from "vitest";
import { MaestroTranslators, resetOut, out } from "../src/commands";

const getOutput = () => {
  const currentOutput = out;
  resetOut(); // Reset output for clean snapshots in each test
  return currentOutput;
};

describe("MaestroTranslators Other Actions Snapshots", () => {
  beforeEach(() => {
    resetOut();
  });

  it("waitForAnimationEnd with timeout", () => {
    MaestroTranslators.waitForAnimationEnd(2000);
    expect(getOutput()).toMatchSnapshot();
  });

  it("waitForAnimationEnd without timeout", () => {
    MaestroTranslators.waitForAnimationEnd();
    expect(getOutput()).toMatchSnapshot();
  });

  it("hideKeyboard", () => {
    MaestroTranslators.hideKeyboard();
    expect(getOutput()).toMatchSnapshot();
  });

  it("screenshot", () => {
    MaestroTranslators.screenshot("myScreenshot");
    expect(getOutput()).toMatchSnapshot();
  });

  it("repeat command", () => {
    MaestroTranslators.repeat(3, () => {
      MaestroTranslators.tapOn("nestedId");
    });
    expect(getOutput()).toMatchSnapshot();
  });

  it("repeatWhileVisible command", () => {
    MaestroTranslators.repeatWhileVisible("visibleId", () => {
      MaestroTranslators.tapOn("nestedId");
    });
    expect(getOutput()).toMatchSnapshot();
  });

  it("repeatWhileNotVisible command", () => {
    MaestroTranslators.repeatWhileNotVisible("invisibleId", () => {
      MaestroTranslators.tapOn("nestedId");
    });
    expect(getOutput()).toMatchSnapshot();
  });

});
