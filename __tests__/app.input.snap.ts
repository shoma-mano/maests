import { describe, it, expect, beforeEach } from "vitest";
import { MaestroTranslators, resetOut, out } from "../src/commands";

const getOutput = () => {
  const currentOutput = out;
  resetOut(); // Reset output for clean snapshots in each test
  return currentOutput;
};

describe("MaestroTranslators Input Command Snapshots", () => {
  beforeEach(() => {
    resetOut();
  });

  it("inputText in focused element", () => {
    MaestroTranslators.inputText("sample text");
    expect(getOutput()).toMatchSnapshot();
  });

  it("inputText in element by id", () => {
    MaestroTranslators.inputText("sample text", "textId");
    expect(getOutput()).toMatchSnapshot();
  });

  it("inputText with text and id", () => {
    MaestroTranslators.inputText("example text", "testInput");
    expect(getOutput()).toMatchSnapshot();
  });
});
