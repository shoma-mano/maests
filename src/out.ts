import { parse } from "yaml";

// Nested command handling
let nestLevel = 0;
let nestedCommands: string[] = [];
export const handleNest = (func: () => any, parseAsYaml?: boolean) => {
  nestLevel++;
  func();
  const out = nestedCommands[nestLevel - 1];
  nestedCommands[nestLevel - 1] = "";
  nestLevel--;
  return parseAsYaml ? parse(out) : out;
};

export let out = "";
export const resetOut = () => {
  out = "";
};

export const addOut = (command: string) => {
  if (nestLevel) {
    if (!nestedCommands[nestLevel - 1]) nestedCommands[nestLevel - 1] = "";
    nestedCommands[nestLevel - 1] += command;
  } else out += command;
};

export const getOut = () => {
  const currentOutput = out;
  resetOut();
  return currentOutput;
};
