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

  it("assertVisible with enabled flag", () => {
    MaestroTranslators.assertVisible("testId", true);
    expect(getOutput()).toMatchSnapshot();
  });

  it("assertVisible without enabled flag", () => {
    MaestroTranslators.assertVisible("testId");
    expect(getOutput()).toMatchSnapshot();
  });

  it("assertNotVisible", () => {
    MaestroTranslators.assertNotVisible("testId");
    expect(getOutput()).toMatchSnapshot();
  });
});