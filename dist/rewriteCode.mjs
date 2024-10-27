export const rewriteCode = ({
  code,
  flowName
}) => {
  code = code.replace(
    /import.*["']maests.*/,
    `import { M, writeYaml } from 'maests'`
  );
  code += `
writeYaml("${flowName}")`;
  return code;
};
if (void 0) {
  it("rewrites code", () => {
    const flow = `import { M } from "maests";
M.initFlow({ appId: "com.my.app", NAME: "Maestro" });`;
    const result = rewriteCode({
      code: flow,
      flowName: "my-flow.maestro.ts"
    });
    expect(result).toMatchInlineSnapshot(`
      "import { M, writeYaml } from 'maests'
      M.initFlow({ appId: "com.my.app", NAME: "Maestro" });
      writeYaml("my-flow.maestro.ts")"
    `);
  });
}
