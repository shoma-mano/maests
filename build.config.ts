import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  entries: [
    {
      input: "src/",
      format: "esm",
      builder: "mkdist",
    },
  ],
  declaration: true,
  rollup: {
    emitCJS: true,
  },
  failOnWarn: false,
});
