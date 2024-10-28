import { describe, it, expect, beforeEach } from "vitest";
import { MaestroTranslators, resetOut, out } from "../src/commands";

const getOutput = () => {
  const currentOutput = out;
  resetOut(); // Reset output for clean snapshots in each test
  return currentOutput;
};

describe("MaestroTranslators Tap Command Snapshots", () => {
  beforeEach(() => {
    resetOut();
  });

  it("tapOn with id only", () => {
    MaestroTranslators.tapOn("testId");
    expect(getOutput()).toMatchSnapshot();
  });

  it("tapOn with all properties", () => {
    MaestroTranslators.tapOn("testId", { retryTapIfNoChange: false, repeat: 3, waitToSettleTimeoutMs: 200 });
    expect(getOutput()).toMatchSnapshot();
  });

  it("tapOnText with text and properties", () => {
    MaestroTranslators.tapOnText("sample text", { retryTapIfNoChange: true, repeat: 2 });
    expect(getOutput()).toMatchSnapshot();
  });

  it("tapOnPoint with coordinates and properties", () => {
    MaestroTranslators.tapOnPoint({ x: "50%", y: "50%" }, { repeat: 4, waitToSettleTimeoutMs: 500 });
    expect(getOutput()).toMatchSnapshot();
  });

  it("tapOn with all properties", () => {
    MaestroTranslators.tapOn("testId", { retryTapIfNoChange: false});
    expect(getOutput()).toMatchSnapshot();
  });

  it("waitForAndTapOn with id and maxWait", () => {
    MaestroTranslators.waitForAndTapOn("testId", 3000);
    expect(getOutput()).toMatchSnapshot();
  });

  it("waitForAndTapOn with all properties", () => {
    MaestroTranslators.waitForAndTapOn("testId", 3000, { retryTapIfNoChange: false, waitToSettleTimeoutMs: 400 });
    expect(getOutput()).toMatchSnapshot();
  });

  it("tapOn with formatted tap props", () => {
    MaestroTranslators.tapOn("testId", {
      retryTapIfNoChange: false,
      repeat: 3,
      waitToSettleTimeoutMs: 500,
    });
    expect(getOutput()).toMatchSnapshot();
  });

});
