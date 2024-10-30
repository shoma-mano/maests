import { describe, it, expect, beforeEach } from "vitest";
import { MaestroTranslators } from "../src/commands/commands";
import { out, resetOut } from "../src/out";

const getOutput = () => {
  const currentOutput = out;
  resetOut();
  return currentOutput;
};

describe("MaestroTranslators Application Launch Commands Snapshots", () => {
  beforeEach(() => {
    resetOut();
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
