import { runMain } from "citty";
import { defineCommand } from "citty";

const main = defineCommand({
  args: {
    na: {
      type: "positional",
      required: true,
    },
    name: {
      type: "positional",
      required: true,
    },
  },
  run({ args }) {
    console.log(args.name);
    console.log(args.na);
  },
});
runMain(main);
