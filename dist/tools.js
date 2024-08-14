const GREEN = "\x1b[32m%s\x1b[0m";
const CYAN = "\x1b[36m%s\x1b[0m";
const YELLOW = "\x1b[33m%s\x1b[0m";
const RED = "\x1b[31m%s\x1b[0m";
const DIM = "\x1b[2m%s\x1b[0m";
export const green = (...data) => console.log(GREEN, ...data, "\n");
export const cyan = (...data) => console.log(CYAN, ...data, "\n");
export const yellow = (...data) => console.log(YELLOW, ...data, "\n");
export const red = (...data) => console.log(RED, ...data, "\n");
export const dim = (...data) => console.log(DIM, ...data, "\n");
//# sourceMappingURL=tools.js.map