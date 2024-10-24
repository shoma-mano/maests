export const rewriteCode = ({
  code,
  flowPath,
  distPath
}) => {
  code = code.replace(
    /import.*["']maests.*\n/g,
    `import { M, writeYaml } from '${distPath}/commands'
`
  );
  code += `
writeYaml("${flowPath}")`;
  return code;
};
if (void 0) {
  it("rewrites code", () => {
    const flow = `import { M } from "maests";
M.initFlow({ appId: "com.my.app", NAME: "Maestro" });`;
    const result = rewriteCode({
      code: flow,
      flowPath: "my-flow.maestro.ts",
      distPath: "/dist"
    });
    expect(result).toMatchInlineSnapshot(`
      "import { M, writeYaml } from '/dist/commands'
      M.initFlow({ appId: "com.my.app", NAME: "Maestro" });
      writeYaml("my-flow.maestro.ts")"
    `);
  });
}
