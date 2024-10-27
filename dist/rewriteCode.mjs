import "./utils";
export const rewriteCode = ({
  code,
  outPath
}) => {
  code = code.replace(
    /import.*["']maests.*/,
    `import { M, writeYaml } from 'maests'`
  );
  code += `
writeYaml("${outPath}")`;
  return code;
};
if (void 0) {
  it("rewrites code", () => {
    const flow = `import { M } from "maests";
M.initFlow({ appId: "com.my.app", NAME: "Maestro" });`;
    const result = rewriteCode({
      code: flow,
      outPath: createOutPath("my-flow.maestro.ts")
    });
    expect(result).toMatchInlineSnapshot();
  });
}
