import { describe, it, expect, beforeEach } from "vitest";
import { MaestroTranslators, resetOut, out } from "../src/commands";

const getOutput = () => {
  const currentOutput = out;
  resetOut();
  return currentOutput;
};

describe("MaestroTranslators Application Launch Commands Snapshots", () => {
  beforeEach(() => {
    resetOut();
  });

  it("initFlow with appId", () => {
    MaestroTranslators.initFlow({ appId: "testAppId" });
    expect(getOutput()).toMatchInlineSnapshot(`
      "appId: testAppId
      ---
      "
    `);
  });

  it("launchApp with appId", () => {
    MaestroTranslators.launchApp({ appId: "testAppId" });
    expect(getOutput()).toMatchInlineSnapshot(`
      "- launchApp:
          appId: "testAppId"
      "
    `);
  });

  it("clearState with appId", () => {
    MaestroTranslators.clearState({ appId: "testAppId" });
    expect(getOutput()).toMatchInlineSnapshot(`
      "- clearState: testAppId
      "
    `);
  });

  it("clearKeychain", () => {
    MaestroTranslators.clearKeychain();
    expect(getOutput()).toMatchInlineSnapshot(`
      "- clearKeychain
      "
    `);
  });
});
