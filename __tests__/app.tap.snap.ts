import { describe, it, expect, beforeEach } from "vitest";
import { M, resetOut, out } from "../src/commands";

describe("MaestroTranslators - Tap and Press Actionss", () => {
  beforeEach(() => {
    resetOut();
  });

  describe("tapOn", () => {
    it("should match snapshot for basic tapOn", () => {
      M.tapOn("elementId");
      expect(out).toMatchSnapshot();
    });

    it("should match snapshot for tapOn with index", () => {
      M.tapOn("elementId", { index: 1 });
      expect(out).toMatchSnapshot();
    });

    it("should match snapshot for tapOn with retryTapIfNoChange false", () => {
      M.tapOn("elementId", { retryTapIfNoChange: false });
      expect(out).toMatchSnapshot();
    });

    it("should match snapshot for tapOn with repeat", () => {
      M.tapOn("elementId", { repeat: 3 });
      expect(out).toMatchSnapshot();
    });

    it("should match snapshot for tapOn with waitToSettleTimeoutMs", () => {
      M.tapOn("elementId", { waitToSettleTimeoutMs: 300 });
      expect(out).toMatchSnapshot();
    });

    it("should match snapshot for tapOn with all TapProps", () => {
      M.tapOn("elementId", {
        index: 2,
        retryTapIfNoChange: false,
        repeat: 3,
        waitToSettleTimeoutMs: 300,
      });
      expect(out).toMatchSnapshot();
    });
  });

  describe("tapOnText", () => {
    it("should match snapshot for basic tapOnText", () => {
      M.tapOnText("Submit");
      expect(out).toMatchSnapshot();
    });

    it("should match snapshot for tapOnText with index", () => {
      M.tapOnText("Submit", { index: 1 });
      expect(out).toMatchSnapshot();
    });

    it("should match snapshot for tapOnText with retryTapIfNoChange false", () => {
      M.tapOnText("Submit", { retryTapIfNoChange: false });
      expect(out).toMatchSnapshot();
    });

    it("should match snapshot for tapOnText with repeat", () => {
      M.tapOnText("Submit", { repeat: 3 });
      expect(out).toMatchSnapshot();
    });

    it("should match snapshot for tapOnText with waitToSettleTimeoutMs", () => {
      M.tapOnText("Submit", { waitToSettleTimeoutMs: 300 });
      expect(out).toMatchSnapshot();
    });

    it("should match snapshot for tapOnText with all TapProps", () => {
      M.tapOnText("Submit", {
        index: 2,
        retryTapIfNoChange: false,
        repeat: 3,
        waitToSettleTimeoutMs: 300,
      });
      expect(out).toMatchSnapshot();
    });
  });

  describe("tapOnPoint", () => {
    it("should match snapshot for basic tapOnPoint", () => {
      M.tapOnPoint({ x: 100, y: 200 });
      expect(out).toMatchSnapshot();
    });

    it("should match snapshot for tapOnPoint with index", () => {
      M.tapOnPoint({ x: 100, y: 200 }, { index: 1 });
      expect(out).toMatchSnapshot();
    });

    it("should match snapshot for tapOnPoint with retryTapIfNoChange false", () => {
      M.tapOnPoint({ x: 100, y: 200 }, { retryTapIfNoChange: false });
      expect(out).toMatchSnapshot();
    });

    it("should match snapshot for tapOnPoint with repeat", () => {
      M.tapOnPoint({ x: 100, y: 200 }, { repeat: 3 });
      expect(out).toMatchSnapshot();
    });

    it("should match snapshot for tapOnPoint with waitToSettleTimeoutMs", () => {
      M.tapOnPoint({ x: 100, y: 200 }, { waitToSettleTimeoutMs: 300 });
      expect(out).toMatchSnapshot();
    });

    it("should match snapshot for tapOnPoint with all TapProps", () => {
      M.tapOnPoint(
        { x: 100, y: 200 },
        {
          index: 2,
          retryTapIfNoChange: false,
          repeat: 3,
          waitToSettleTimeoutMs: 300,
        }
      );
      expect(out).toMatchSnapshot();
    });
  });

  describe("longPressOn", () => {
    it("should match snapshot for basic longPressOn", () => {
      M.longPressOn("elementId");
      expect(out).toMatchSnapshot();
    });
  });

  describe("longPressOnText", () => {
    it("should match snapshot for basic longPressOnText", () => {
      M.longPressOnText("Submit");
      expect(out).toMatchSnapshot();
    });
  });

  describe("longPressOnPoint", () => {
    it("should match snapshot for basic longPressOnPoint", () => {
      M.longPressOnPoint({ x: 100, y: 200 });
      expect(out).toMatchSnapshot();
    });

    it("should match snapshot for longPressOnPoint with percentage values", () => {
      M.longPressOnPoint({ x: "50%", y: "75%" });
      expect(out).toMatchSnapshot();
    });
  });
});
