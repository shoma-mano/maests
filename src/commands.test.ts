import { join } from "path";
import { M, out, resetOut } from "./commands";

it("commands", () => {
  M.initFlow({ appId: "com.my.app" });
  expect(out).toMatchInlineSnapshot(`
    "appId: com.my.app
    ---
    "
  `);
  resetOut();
});

it("execute repeat twice", () => {
  M.repeat(3, () => {
    M.tapOn("test");
  });
  M.repeat(3, () => {
    M.tapOn("test");
  });
  expect(out).toMatchInlineSnapshot(`
    "- repeat:
         times: 3
         commands:
            - tapOn:
                id: "test"
    - repeat:
         times: 3
         commands:
            - tapOn:
                id: "test"
    "
  `);
});

it("double nested repeat", () => {
  M.repeat(3, () => {
    M.tapOn("test");
    M.tapOn("test");
    M.repeat(3, () => {
      M.tapOn("test");
    });
  });
  expect(out).toMatchInlineSnapshot(`
    "- repeat:
         times: 3
         commands:
            - tapOn:
                id: "test"
            - tapOn:
                id: "test"
            - repeat:
                 times: 3
                 commands:
                    - tapOn:
                        id: "test"
    "
  `);
});

it("runScript", () => {
  M.runScript({ path: join(__dirname, "../example/script.ts") });
  expect(out).toMatchInlineSnapshot(`"- evalScript: \${const res = http.get(\`https://jsonplaceholder.typicode.com/todos/1\`, {  headers: {    "Content-Type": "application/json"  }});console.log(MAESTRO_PROFILE);output.result = res.body;}"`);
});
