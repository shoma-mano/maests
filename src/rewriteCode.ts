export const rewriteCode = ({
  code,
  yamlOutPath,
}: {
  code: string;
  yamlOutPath: string;
}) => {
  code = code.replace(
    /import.*["']maests.*/,
    `import { M, getOutput } from 'maests'`
  );
  code = `import { writeYaml } from 'maests/write-yaml'\n` + code;
  code += `\nwriteYaml("${yamlOutPath}")`;
  return code;
};

if (import.meta.vitest) {
  const { createYamlOutPath } = await import("./utils");

  it("rewrites code", async () => {
    // prettier-ignore
    const flow = 
`import { M } from "maests";
M.initFlow({ appId: "com.my.app", NAME: "Maestro" });`;

    const outPath = createYamlOutPath("my-flow.maestro.ts");
    const result = rewriteCode({
      code: flow,
      yamlOutPath: outPath,
    });

    expect(result).toMatchInlineSnapshot(`
      "import { writeYaml } from 'maests/write-yaml'
      import { M, getOutput } from 'maests'
      M.initFlow({ appId: "com.my.app", NAME: "Maestro" });
      writeYaml("${outPath}")"
    `);
  });
}
