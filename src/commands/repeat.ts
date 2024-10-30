import { stringify } from "yaml";
import { handleNest, addOut, getOut } from "../out";
import { M } from "./commands";
import { ElementMatcher } from "./type";

type RepeatProps = {
  times?: number;
  while?: { visible?: ElementMatcher; notVisible?: ElementMatcher };
};

export const repeat = (props: RepeatProps, func: () => any) => {
  const out = handleNest(func, true);
  const cmd = [{ repeat: { ...props, commands: out } }];
  addOut(stringify(cmd));
};

if (import.meta.vitest) {
  it("double nested repeat", () => {
    repeat(
      {
        times: 3,
        while: {
          visible: {
            text: "test",
          },
        },
      },
      () => {
        M.tapOn("test");
        M.tapOn("test");
        repeat({ times: 3 }, () => {
          M.tapOn("test");
        });
      }
    );

    expect(getOut()).toMatchInlineSnapshot(`
      "- repeat:
          times: 3
          while:
            visible:
              text: test
          commands:
            - tapOn:
                id: test
                retryTapIfNoChange: true
            - tapOn:
                id: test
                retryTapIfNoChange: true
            - repeat:
                times: 3
                commands:
                  - tapOn:
                      id: test
                      retryTapIfNoChange: true
      "
    `);
  });
}

export const repeatWhileVisible = (
  matcher: ElementMatcher,
  func: () => any
) => {
  const out = handleNest(func, true);

  const cmd = [
    { repeat: { times: 10, while: { visible: matcher }, commands: out } },
  ];
  addOut(stringify(cmd));
};

if (import.meta.vitest) {
  it("repeatWhileVisible", () => {
    repeatWhileVisible(
      {
        text: "test",
      },
      () => {
        M.tapOn("test");
      }
    );

    expect(getOut()).toMatchInlineSnapshot(`
      "- repeat:
          times: 10
          while:
            visible:
              text: test
          commands:
            - tapOn:
                id: test
                retryTapIfNoChange: true
      "
    `);
  });
}

export const repeatWhileNotVisible = (
  matcher: ElementMatcher,
  func: () => any
) => {
  const out = handleNest(func, true);
  const cmd = [
    { repeat: { times: 10, while: { notVisible: matcher }, commands: out } },
  ];
  addOut(stringify(cmd));
};
