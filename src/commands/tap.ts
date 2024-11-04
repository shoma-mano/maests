import { stringify } from "yaml";
import { addOut, getOut } from "../out";
import { WaitProps, PointProps } from "../type";

// Helper function to format optional tap properties
export interface TapOptions {
  index?: number;
  retryTapIfNoChange?: boolean;
  repeat?: number;
  waitToSettleTimeoutMs?: number;
}
export type WaitAndTapProps = TapOptions & WaitProps;

export const tapOn = (id: string, options: TapOptions = {}) => {
  const commands = [
    {
      tapOn: {
        id,
        retryTapIfNoChange: true,
        ...options,
      },
    },
  ];
  addOut(stringify(commands));
};

if (import.meta.vitest) {
  it("should match snapshot for basic tapOn", () => {
    tapOn("elementId");
    expect(getOut()).toMatchInlineSnapshot(`
      "- tapOn:
          id: elementId
          retryTapIfNoChange: true
      "
    `);

    tapOn("elementId With Options", {
      index: 1,
      retryTapIfNoChange: false,
      repeat: 2,
      waitToSettleTimeoutMs: 1000,
    });
    expect(getOut()).toMatchInlineSnapshot(`
      "- tapOn:
          id: elementId With Options
          retryTapIfNoChange: false
          index: 1
          repeat: 2
          waitToSettleTimeoutMs: 1000
      "
    `);
  });
}

export const tapOnText = (text: string, options: TapOptions = {}) => {
  const command = [
    {
      tapOn: {
        text,
        retryTapIfNoChange: true,
        ...options,
      },
    },
  ];
  addOut(stringify(command));
};

if (import.meta.vitest) {
  it("should match snapshot for basic tapOnText", () => {
    tapOnText("SampleText");
    expect(getOut()).toMatchInlineSnapshot(`
      "- tapOn:
          text: SampleText
          retryTapIfNoChange: true
      "
    `);
  });
}

export const tapOnPoint = (point: PointProps, options: TapOptions = {}) => {
  const { x, y } = point;
  const command = [
    {
      tapOn: {
        point: `${x},${y}`,
        retryTapIfNoChange: true,
        ...options,
      },
    },
  ];
  addOut(stringify(command));
};

if (import.meta.vitest) {
  it("should match snapshot for basic tapOnPoint", () => {
    tapOnPoint({ x: 100, y: 200 });
    expect(getOut()).toMatchInlineSnapshot(`
      "- tapOn:
          point: 100,200
          retryTapIfNoChange: true
      "
    `);
  });
}

export const waitForAndTapOn = (id: string, options: WaitAndTapProps = {}) => {
  const { maxWait = 5000 } = options;
  let command = `- extendedWaitUntil:\n    visible:\n        id: "${id}"\n    timeout: ${maxWait}\n`;
  const cmd = {
    extendedWaitUntil: {
      visible: {
        id: id,
      },
      timeout: maxWait,
    },
  };

  const cmd2 = {
    tapOn: {
      id,
      retryTapIfNoChange: true,
      ...options,
    },
  };

  addOut(stringify([cmd, cmd2]));
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
    expect(getOut()).toMatchInlineSnapshot(`
      "- extendedWaitUntil:
          visible:
            id: elementId With Options
          timeout: 10000
      - tapOn:
          id: elementId With Options
          retryTapIfNoChange: false
          index: 1
          repeat: 2
          waitToSettleTimeoutMs: 1000
          maxWait: 10000
      "
    `);
  });
}
