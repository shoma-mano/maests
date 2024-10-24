export const rewriteCode = ({
  code,
  flowPath,
  distPath,
}: {
  code: string;
  flowPath: string;
  distPath: string;
}) => {
  code = code.replace(
    /import.*["']maests.*\n/g,
    `import { M, writeYaml } from '${distPath}/commands'\n`
  );
  code += `\nwriteYaml("${flowPath}")`;
  return code;
};

if (import.meta.vitest) {
  it("rewrites code", () => {
    const flow = `import { M } from "maests";
M.initFlow({ appId: "com.my.app", NAME: "Maestro" });`;

    const result = rewriteCode({
      code: flow,
      flowPath: "my-flow.maestro.ts",
      distPath: "/dist",
    });

    // snapshot
    expect(result).toMatchInlineSnapshot(`
      "import { M, writeYaml } from '/dist/commands'
      M.initFlow({ appId: "com.my.app", NAME: "Maestro" });
      writeYaml("my-flow.maestro.ts")"
    `);
  });
}
