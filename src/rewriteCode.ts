export const rewriteCode = ({
  code,
  outPath,
}: {
  code: string;
  outPath: string;
}) => {
  code = code.replace(
    /import.*["']maests.*/,
    `import { M, getOutput } from 'maests'
import { writeYaml } from 'maests/write-yaml'`
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
      "import { M, getOutput } from 'maests'
      import { writeYaml } from 'maests/write-yaml'
      M.initFlow({ appId: "com.my.app", NAME: "Maestro" });
      writeYaml("${outPath}")"
    `);
  });
}
