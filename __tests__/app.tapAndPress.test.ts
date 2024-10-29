import { describe, it, expect, beforeEach } from "vitest";
import { M, resetOut, out } from "../src/commands";

const getOutput = () => {
  const currentOutput = out;
  resetOut();
  return currentOutput;
};

describe("MaestroTranslators - Tap and Press Actions", () => {
  beforeEach(() => {
    resetOut();
  });

  describe("tapOn", () => {
    it("should match snapshot for basic tapOn", () => {
      M.tapOn("elementId");
      expect(getOutput()).toMatchInlineSnapshot(`
        "- tapOn:
            id: "elementId"
        "
      `);
    });
  });

  describe("tapOnText", () => {
    it("should match snapshot for basic tapOnText", () => {
      M.tapOnText("SampleText");
      expect(getOutput()).toMatchInlineSnapshot(
        `"- tapOn:
    text: "SampleText"
"`);
    });
  });

  describe("tapOnPoint", () => {
    it("should match snapshot for basic tapOnPoint", () => {
      M.tapOnPoint({ x: 100, y: 200 });
      expect(getOutput()).toMatchInlineSnapshot(
        `"- tapOn:
    point: 100,200
"`);
    });
  });

  describe("longPressOn", () => {
    it("should match snapshot for basic longPressOn", () => {
      M.longPressOn("elementId");
      expect(getOutput()).toMatchInlineSnapshot(`
        "- longPressOn:
            id: "elementId"
        "
      `);
    });
  });

  describe("longPressOnText", () => {
    it("should match snapshot for basic longPressOnText", () => {
      M.longPressOnText("Submit");
      expect(getOutput()).toMatchInlineSnapshot(`
        "- longPressOn: Submit\n"
      `);
    });
  });

  describe("longPressOnPoint", () => {
    it("should match snapshot for basic longPressOnPoint", () => {
      M.longPressOnPoint({ x: 150, y: 250 });
      expect(getOutput()).toMatchInlineSnapshot(
        `"- longPressOn:
    point: 150,250
"`);
    });
  });
});
