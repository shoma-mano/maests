import { parseModule } from "magicast";
import { PluginObj, transformSync } from "@babel/core";
import * as t from "@babel/types";
import { createYamlOutPath, jiti } from "./utils";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

export const rewriteCode = ({
  code,
  yamlOutPath,
  fullFlowPath,
}: {
  code: string;
  yamlOutPath: string;
  fullFlowPath: string;
}) => {
  code = code.replace(
    /import.*["']maests.*/,
    `import { M, getOutput } from 'maests'`
  );
  code = `import { writeYaml } from 'maests/write-yaml'\n` + code;
  code += `\nwriteYaml("${yamlOutPath}")`;

  const _imports = parseModule(code).imports;
  const imports = JSON.parse(JSON.stringify(_imports)) as typeof _imports;
  const rewriteMap: Record<string, string> = Object.fromEntries(
    Object.entries(imports).map(([key, value]) => {
      if (value.from.startsWith("./")) {
        value.from = join(dirname(fullFlowPath), value.from);
      }
      const path = jiti.esmResolve(value.from);
      return [key, fileURLToPath(path)];
    })
  );
  code = rewriteRunScript(code, rewriteMap);

  return code;
};

if (import.meta.vitest) {
  it("rewrites ts flow code", async () => {
    // prettier-ignore
    const tsFlowCode = 
`import { M } from "maests"
import { fooScript } from "@/fixtures/foo-script";
M.runScript(fooScript);
M.initFlow({ appId: "com.my.app", NAME: "Maestro" });`;

    const yamlOutPath = createYamlOutPath("my-flow.maestro.ts");
    const fullFlowPath = join(__dirname, "../playground/e2e/sampleFlow.ts");
    const result = rewriteCode({
      code: tsFlowCode,
      yamlOutPath,
      fullFlowPath,
    });

    expect(result).toMatchInlineSnapshot(`
      "import { writeYaml } from 'maests/write-yaml';
      import { M, getOutput } from 'maests';
      import { fooScript } from "@/fixtures/foo-script";
      M.runScript("/Users/mano/my-oss/maests/fixtures/foo-script.ts", "fooScript");
      M.initFlow({
        appId: "com.my.app",
        NAME: "Maestro"
      });
      writeYaml("${yamlOutPath}");"
    `);
  });
}

const rewriteRunScript = (code: string, rewriteMap: Record<string, string>) => {
  const plugin = (): PluginObj => {
    return {
      visitor: {
        CallExpression(path) {
          if (
            t.isMemberExpression(path.node.callee) &&
            t.isIdentifier(path.node.callee.object, { name: "M" }) &&
            t.isIdentifier(path.node.callee.property, { name: "runScript" }) &&
            t.isIdentifier(path.node.arguments[0])
          ) {
            if (t.isIdentifier(path.node.arguments[0])) {
              const argName = path.node.arguments[0].name;
              path.node.arguments = [
                t.stringLiteral(rewriteMap[argName]),
                t.stringLiteral(argName),
              ];
            }
          }
        },
      },
    };
  };
  return transformSync(code, {
    plugins: [plugin],
  })?.code;
};

if (import.meta.vitest) {
  it("rewrites M.runScript", () => {
    const code = `M.runScript(someScript)`;
    const result = rewriteRunScript(code, {
      someScript: "./some-script.ts",
    });
    expect(result).toMatchInlineSnapshot(
      `"M.runScript("./some-script.ts", "someScript");"`
    );
  });
}

export const deleteExport = (code: string) => {
  // delete export { ... }
  const plugin = (): PluginObj => {
    return {
      visitor: {
        ExportNamedDeclaration(path) {
          path.remove();
        },
      },
    };
  };
  return transformSync(code, {
    plugins: [plugin],
  })?.code;
};

if (import.meta.vitest) {
  it("delete export", () => {
    const code = `
    const foo = 1;
    export { foo }
    `;
    const result = deleteExport(code);
    expect(result).toMatchInlineSnapshot(`"const foo = 1;"`);
  });
}
