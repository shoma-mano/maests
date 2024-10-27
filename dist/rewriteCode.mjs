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
  it("rewrites code", async () => {
    const { createOutPath } = await null;
    const flow = `import { M } from "maests";
M.initFlow({ appId: "com.my.app", NAME: "Maestro" });`;
    const result = rewriteCode({
      code: flow,
      outPath: createOutPath("my-flow.maestro.ts")
    });
    expect(result).toMatchInlineSnapshot(`
      "import { M, writeYaml } from 'maests'
      M.initFlow({ appId: "com.my.app", NAME: "Maestro" });
      writeYaml("${createOutPath("my-flow.maestro.ts")}")"
    `);
  });
}
