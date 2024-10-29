import { describe, it, expect, beforeEach } from "vitest";
import { MaestroTranslators, resetOut, out } from "../src/commands/commands";

const getOutput = () => {
  const currentOutput = out;
  resetOut();
  return currentOutput;
};

describe("MaestroTranslators Assertion Command Snapshots", () => {
  beforeEach(() => {
    resetOut();
  });

  it("assertVisible with enabled flag", () => {
    MaestroTranslators.assertVisible("testId", true);
    expect(getOutput()).toMatchInlineSnapshot(`
      "- assertVisible:
          id: "testId"
          enabled: true
      "
    `);
  });

  it("assertVisible without enabled flag", () => {
    MaestroTranslators.assertVisible("testId");
    expect(getOutput()).toMatchInlineSnapshot(`
      "- assertVisible:
          id: "testId"
      "
    `);
  });

  it("assertNotVisible", () => {
    MaestroTranslators.assertNotVisible("testId");
    expect(getOutput()).toMatchInlineSnapshot(`
      "- assertNotVisible:
          id: "testId"
      "
    `);
  });
});
