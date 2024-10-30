import { M } from "../src/commands/commands";
import { out, resetOut } from "../src/out";

const getOutput = () => {
  const result = out;
  resetOut();
  return result;
};

describe("MaestroTranslators Input Command Snapshots", () => {
  it("inputText in focused element", () => {
    M.inputText("focused text");
    expect(getOutput()).toMatchInlineSnapshot(`
      "- inputText: focused text
      "
    `);
  });

  it("inputText in element by id", () => {
    M.inputText("sample text", "textId");
    expect(getOutput()).toMatchInlineSnapshot(`
      "- tapOn:
          id: "textId"
      - inputText: sample text
      "
    `);
  });
});
