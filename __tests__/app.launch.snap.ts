import { describe, it, expect, beforeEach } from "vitest";
import { MaestroTranslators, resetOut, out } from "../src/commands";

const getOutput = () => {
  const currentOutput = out;
  resetOut(); // Reset output for clean snapshots in each test
  return currentOutput;
};

describe("MaestroTranslators Application Launch Commands Snapshots", () => {
  beforeEach(() => {
    resetOut();
  });

  it("initFlow with appId", () => {
    MaestroTranslators.initFlow({ appId: "testAppId" });
    expect(getOutput()).toMatchSnapshot();
  });

  it("launchApp with appId", () => {
    MaestroTranslators.launchApp({ appId: "testAppId" });
    expect(getOutput()).toMatchSnapshot();
  });

  it("clearState with appId", () => {
    MaestroTranslators.clearState({ appId: "testAppId" });
    expect(getOutput()).toMatchSnapshot();
  });

  it("clearKeychain", () => {
    MaestroTranslators.clearKeychain();
    expect(getOutput()).toMatchSnapshot();
  });
});
