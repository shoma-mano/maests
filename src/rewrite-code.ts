import { parseModule } from "magicast";

import { createYamlOutPath, jiti } from "./utils";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { build, Plugin } from "esbuild";
import { readFileSync } from "fs";
import * as ts from "typescript";

const rewriteRunScriptPlugin = (): Plugin => ({
  name: "rewrite-run-script",
  setup(build) {
    build.onLoad({ filter: /.*/ }, async (args) => {
      let code = readFileSync(args.path, "utf-8");

      const _imports = parseModule(code).imports;
      const imports = JSON.parse(JSON.stringify(_imports)) as typeof _imports;
      const rewriteMap: Record<string, string> = Object.fromEntries(
        Object.entries(imports).map(([key, value]) => {
          if (value.from.startsWith(".")) {
            value.from = join(dirname(args.path), value.from);
          }
          let path = jiti.esmResolve(value.from, { try: true });
          if (path) path = fileURLToPath(path);
          return [key, path];
        })
      );
      code = rewriteRunScript(code, rewriteMap);
      return {
        contents: code,
        loader: "ts",
      };
    });
  },
});

export const rewriteCode = async ({
  yamlOutPath,
  fullFlowPath,
}: {
  yamlOutPath: string;
  fullFlowPath: string;
}) => {
  let code = await build({
    entryPoints: [fullFlowPath],
    bundle: true,
    packages: "external",
    platform: "node",
    write: false,
    target: "esnext",
    plugins: [rewriteRunScriptPlugin()],
    format: "esm",
  }).then((bundled) => bundled.outputFiles[0].text);

  code =
    `import { writeYaml } from 'maests/write-yaml'\n` +
    code +
    `\nwriteYaml("${yamlOutPath}")`;

  return code;
};

if (import.meta.vitest) {
  it("rewrites ts flow code", async () => {
    const yamlOutPath = createYamlOutPath("my-flow.maestro.ts");
    const fullFlowPath = join(__dirname, "../fixtures/sample-flow.ts");
    const result = await rewriteCode({
      yamlOutPath,
      fullFlowPath,
    });

    expect(result).toMatchInlineSnapshot(`
      "import { writeYaml } from 'maests/write-yaml'
      // fixtures/sample-flow.ts
      import { getOutput, M as M2 } from "maests";

      // fixtures/utils/openApp.ts
      import { M } from "maests";
      var openApp = () => {
        M.initFlow({ appId: "com.my.app" });
        M.launchApp({ appId: "com.my.app" });
      };

      // fixtures/sample-flow.ts
      openApp();
      M2.runScript("/Users/mano/my-oss/maests/fixtures/utils/script.ts", "someScript");
      M2.assertVisible({ id: getOutput("id") });
      M2.runFlow({
        flow: () => {
          M2.repeatWhileNotVisible({
            text: "4"
          }, () => {
            M2.tapOnText("Increment");
          });
        },
        condition: {
          visible: "Increment"
        }
      });

      writeYaml("/Users/mano/my-oss/maests/maests/my-flow.maestro.yaml")"
    `);
  });
}

const rewriteRunScript = (
  code: string,
  rewriteMap: Record<string, string>
): string => {
  const sourceFile = ts.createSourceFile(
    "tempFile.ts",
    code,
    ts.ScriptTarget.Latest,
    true
  );

  const transformer = <T extends ts.Node>(
    context: ts.TransformationContext
  ) => {
    const visit: ts.Visitor = (node: ts.Node): ts.Node | undefined => {
      if (ts.isCallExpression(node)) {
        const expression = node.expression;
        if (
          ts.isPropertyAccessExpression(expression) &&
          ts.isIdentifier(expression.expression) &&
          expression.expression.text === "M" &&
          expression.name.text === "runScript" &&
          node.arguments.length > 0 &&
          ts.isIdentifier(node.arguments[0])
        ) {
          const argName = node.arguments[0].text;
          const newArguments = [
            ts.factory.createStringLiteral(rewriteMap[argName]),
            ts.factory.createStringLiteral(argName),
          ];
          return ts.factory.updateCallExpression(
            node,
            expression,
            node.typeArguments,
            newArguments
          );
        }
      }
      return ts.visitEachChild(node, visit, context);
    };
    return (node: T) => ts.visitNode(node, visit);
  };

  const result = ts.transform(sourceFile, [transformer]);
  const printer = ts.createPrinter();
  const transformedSourceFile = result.transformed[0] as ts.SourceFile;
  const transformedCode = printer.printFile(transformedSourceFile);

  return transformedCode;
};

if (import.meta.vitest) {
  it("rewrite runScript", () => {
    const code = `
    import { someScript } from "./utils/script";
    M.runScript(someScript);
    `;
    const rewriteMap = {
      someScript: "/Users/user-name/my-oss/maests/fixtures/utils/script.ts",
    };
    const result = rewriteRunScript(code, rewriteMap);
    expect(result).toMatchInlineSnapshot(`
      "import { someScript } from "./utils/script";
      M.runScript("/Users/user-name/my-oss/maests/fixtures/utils/script.ts", "someScript");
      "
    `);
  });
}

export const deleteExport = (code: string): string => {
  const sourceFile = ts.createSourceFile(
    "tempFile.ts",
    code,
    ts.ScriptTarget.Latest,
    true
  );

  const transformer = <T extends ts.Node>(
    context: ts.TransformationContext
  ) => {
    const visit: ts.Visitor = (node: ts.Node): ts.Node | undefined => {
      // ExportNamedDeclarationを削除
      if (ts.isExportDeclaration(node) || ts.isExportAssignment(node)) {
        return undefined;
      }
      return ts.visitEachChild(node, visit, context);
    };
    return (node: T) => ts.visitNode(node, visit);
  };

  const result = ts.transform(sourceFile, [transformer]);
  const printer = ts.createPrinter();
  const transformedSourceFile = result.transformed[0] as ts.SourceFile;
  const transformedCode = printer.printFile(transformedSourceFile);

  return transformedCode;
};

if (import.meta.vitest) {
  it("delete export", () => {
    const code = `
    const foo = 1;
    export { foo }
    `;
    const result = deleteExport(code);
    expect(result).toMatchInlineSnapshot(`
      "const foo = 1;
      "
    `);
  });
}
