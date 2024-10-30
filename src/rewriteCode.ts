export const rewriteCode = ({
  code,
  outPath,
}: {
  code: string;
  outPath: string;
}) => {
  code = code.replace(
    /import.*["']maests.*/,
    `import { M, writeYaml , getOutput } from 'maests'`
  );
  code += `\nwriteYaml("${outPath}")`;
  return code;
};

if (import.meta.vitest) {
  const { createOutPath } = await import("./utils");

  it("rewrites code", async () => {
    // prettier-ignore
    const flow = 
`import { M } from "maests";
M.initFlow({ appId: "com.my.app", NAME: "Maestro" });`;

    const outPath = createOutPath("my-flow.maestro.ts");
    const result = rewriteCode({
      code: flow,
      outPath,
    });

    expect(result).toMatchInlineSnapshot(`
      "import { M, writeYaml , getOutput } from 'maests'
      M.initFlow({ appId: "com.my.app", NAME: "Maestro" });
      writeYaml("${outPath}")"
    `);
  });
}
