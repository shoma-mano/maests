import { PointProps, WaitProps } from "./command-props";
import { addOut, space, resetOut, out } from "./commands";

// Helper function to format optional tap properties
export interface TapOptions {
  index?: number;
  retryTapIfNoChange?: boolean;
  repeat?: number;
  waitToSettleTimeoutMs?: number;
}
export type WaitAndTapProps = TapOptions & WaitProps;

const processTapOptions = ({
  index,
  retryTapIfNoChange = true,
  repeat,
  waitToSettleTimeoutMs,
}: TapOptions): string => {
  let propsCommand = "";
  if (typeof index === "number") propsCommand += `    index: ${index}\n`;
  if (retryTapIfNoChange === false)
    propsCommand += `    retryTapIfNoChange: ${retryTapIfNoChange}\n`;
  if (typeof repeat === "number") propsCommand += `    repeat: ${repeat}\n`;
  if (typeof waitToSettleTimeoutMs === "number")
    propsCommand += `    waitToSettleTimeoutMs: ${waitToSettleTimeoutMs}\n`;
  return propsCommand;
};

if (import.meta.vitest) beforeEach(resetOut);

export const tapOn = (id: string, options: TapOptions = {}) => {
  let command = `- tapOn:\n${space}id: "${id}"\n`;
  command += processTapOptions(options);
  addOut(command);
};

if (import.meta.vitest) {
  it("should match snapshot for basic tapOn", () => {
    tapOn("elementId");
    expect(out).toMatchInlineSnapshot(`
        "- tapOn:
            id: "elementId"
        "
        `);

    tapOn("elementId With Options", {
      index: 1,
      retryTapIfNoChange: false,
      repeat: 2,
      waitToSettleTimeoutMs: 1000,
    });
    expect(out).toMatchInlineSnapshot(`
      "- tapOn:
          id: "elementId"
          index: 1
          retryTapIfNoChange: false
          repeat: 2
          waitToSettleTimeoutMs: 1000
      "
    `);
  });
}

export const tapOnText = (text: string, options: TapOptions = {}) => {
  let command = `- tapOn:\n    text: "${text}"\n`;
  command += processTapOptions(options);
  addOut(command);
};

if (import.meta.vitest) {
  it("should match snapshot for basic tapOnText", () => {
    tapOnText("SampleText");
    expect(out).toMatchInlineSnapshot(`
      "- tapOn:
          text: "SampleText"
      "
    `);
  });
}

export const tapOnPoint = (point: PointProps, options: TapOptions = {}) => {
  const { x, y } = point;
  let command = `- tapOn:\n    point: ${x},${y}\n`;
  command += processTapOptions(options);
  addOut(command);
};

if (import.meta.vitest) {
  it("should match snapshot for basic tapOnPoint", () => {
    tapOnPoint({ x: 100, y: 200 });
    expect(out).toMatchInlineSnapshot(`
      "- tapOn:
          point: 100,200
      "
    `);
  });
}

export const waitForAndTapOn = (id: string, options: WaitAndTapProps = {}) => {
  const { maxWait = 5000 } = options;
  let command = `- extendedWaitUntil:\n    visible:\n        id: "${id}"\n    timeout: ${maxWait}\n`;
  command += `- tapOn:\n    id: "${id}"\n`;
  command += processTapOptions(options);
  addOut(command);
};

if (import.meta.vitest) {
  it("should match snapshot for basic waitForAndTapOn", () => {
    waitForAndTapOn("elementId With Options", {
      index: 1,
      retryTapIfNoChange: false,
      repeat: 2,
      waitToSettleTimeoutMs: 1000,
      maxWait: 10000,
    });
    expect(out).toMatchInlineSnapshot(`
      "- extendedWaitUntil:
          visible:
              id: "elementId With Options"
          timeout: 10000
      - tapOn:
          id: "elementId With Options"
          index: 1
          retryTapIfNoChange: false
          repeat: 2
          waitToSettleTimeoutMs: 1000
      "
    `);
  });
}
