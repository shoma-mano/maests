import { describe, it, expect, beforeEach } from "vitest";
import { M, resetOut, out } from "../src/commands/commands";

const getOutput = () => {
  const currentOutput = out;
  resetOut();
  return currentOutput;
};

describe("MaestroTranslators - Tap and Press Actions", () => {
  beforeEach(() => {
    resetOut();
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
"`
      );
    });
  });
});
