import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  entries: [
    {
      input: "src/",
      format: "esm",
      builder: "mkdist",
      declaration: true,
      esbuild: {
        define: {
          "import.meta.vitest": "undefined",
        },
        treeShaking: true,
        format: "esm",
        minifySyntax: true,
      },
    },
  ],
});
