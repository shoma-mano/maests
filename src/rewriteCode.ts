export const rewriteCode = ({
  code,
  outPath,
}: {
  code: string;
  outPath: string;
}) => {
  code = code.replace(
    /import.*["']maests.*/,
    `import { M, writeYaml } from 'maests'`
  );
  code += `\nwriteYaml("${outPath}")`;
  return code;
};

if (import.meta.vitest) {
  it("rewrites code", async () => {
    const { createOutPath } = await import("./utils");
    // prettier-ignore
    const flow = 
`import { M } from "maests";
M.initFlow({ appId: "com.my.app", NAME: "Maestro" });`;

    const result = rewriteCode({
      code: flow,
      outPath: createOutPath("my-flow.maestro.ts"),
    });

    expect(result).toMatchInlineSnapshot(`
      "import { M, writeYaml } from 'maests'
      M.initFlow({ appId: "com.my.app", NAME: "Maestro" });
      writeYaml("${createOutPath("my-flow.maestro.ts")}")"
    `);
  });
}
