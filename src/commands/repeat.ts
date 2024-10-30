import { handleNest, addOut, getOut } from "../out";
import { indentExceptLastLineBreak, M } from "./commands";

export const repeat = (times: number, func: () => any) => {
  const out = handleNest(func);
  // prettier-ignore
  const commands = 

`- repeat:
     times: ${times}
     commands:
        ${indentExceptLastLineBreak(out)}`;

  addOut(commands);
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
                id: "test"
            - tapOn:
                id: "test"
            - repeat:
                 times: 3
                 commands:
                    - tapOn:
                        id: "test"
    "
  `);
  });
}

export const repeatWhileVisible = (id: string, func: () => any) => {
  const out = handleNest(func);
  // prettier-ignore
  const commands =

`- repeat:
     while:
         visible:
             id: "${id}"
     commands:
        ${indentExceptLastLineBreak(out)}`;

  addOut(commands);
};

export const repeatWhileNotVisible = (id: string, func: () => any) => {
  const out = handleNest(func);
  addOut(`- repeat:
    while:
        notVisible:
            id: "${id}"
    commands:
        ${out.replace(/\n(?=.*[\n])/g, "\n        ")}`);
};
