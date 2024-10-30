import { stringify } from "yaml";
import { handleNest, addOut, getOut } from "../out";
import { M } from "./commands";
import { ElementMatcher } from "./type";

export const repeat = (times: number, func: () => any) => {
  const out = handleNest(func, true);
  const cmd = [{ repeat: { times, commands: out } }];
  addOut(stringify(cmd));
};

if (import.meta.vitest) {
  it("double nested repeat", () => {
    repeat(3, () => {
      M.tapOn("test");
      M.tapOn("test");
      repeat(3, () => {
        M.tapOn("test");
      });
    });

    expect(getOut()).toMatchInlineSnapshot(`
      "- repeat:
          times: 3
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

  const cmd = [{ repeat: { while: { visible: matcher }, commands: out } }];
  addOut(stringify(cmd));
};

if (import.meta.vitest) {
  it("repeatWhileVisible", () => {
    repeatWhileVisible("test", () => {
      M.tapOn("test");
    });

    expect(getOut()).toMatchInlineSnapshot(`
      "- repeat:
          while:
            visible: test
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
  const cmd = [{ repeat: { while: { notVisible: matcher }, commands: out } }];
  addOut(stringify(cmd));
};
