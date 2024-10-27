export const rewriteCode = ({
  code,
  flowName,
}: {
  code: string;
  flowName: string;
}) => {
  code = code.replace(
    /import.*["']maests.*/,
    `import { M, writeYaml } from 'maests'`
  );
  code += `\nwriteYaml("${flowName}")`;
  return code;
};

if (import.meta.vitest) {
  it("rewrites code", () => {
    const flow = `import { M } from "maests";
M.initFlow({ appId: "com.my.app", NAME: "Maestro" });`;

    const result = rewriteCode({
      code: flow,
      flowName: "my-flow.maestro.ts",
    });

    expect(result).toMatchInlineSnapshot(`
      "import { M, writeYaml } from 'maests'
      M.initFlow({ appId: "com.my.app", NAME: "Maestro" });
      writeYaml("my-flow.maestro.ts")"
    `);
  });
}
