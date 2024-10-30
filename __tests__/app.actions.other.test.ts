import { describe, it, expect, beforeEach } from "vitest";
import { MaestroTranslators } from "../src/commands/commands";
import { out, resetOut } from "../src/out";

const getOutput = () => {
  const currentOutput = out;
  resetOut();
  return currentOutput;
};

describe("MaestroTranslators Input Command Snapshots", () => {
  beforeEach(() => {
    resetOut();
  });

  it("inputText in focused element", () => {
    MaestroTranslators.inputText("focused text");
    expect(getOutput()).toMatchInlineSnapshot(`
      "- inputText: focused text
      "
    `);
  });

  it("inputText in element by id", () => {
    MaestroTranslators.inputText("sample text", "textId");
    expect(getOutput()).toMatchInlineSnapshot(`
      "- tapOn:
          id: "textId"
      - inputText: sample text
      "
    `);
  });

  it("inputText with text and id", () => {
    MaestroTranslators.inputText("example text", "testInput");
    expect(getOutput()).toMatchInlineSnapshot(`
      "- tapOn:
          id: "testInput"
      - inputText: example text
      "
    `);
  });
});
