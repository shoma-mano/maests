import { join } from "path";
import { M, out, resetOut } from "../src/commands";

afterEach(resetOut);
it("commands", () => {
  M.initFlow({
    appId: "com.my.app",
    onFlowStart: () => {
      M.tapOn("test");
      M.runScript({ path: join(__dirname, "../playground/e2e/script.ts") });
    },
  });
  expect(out).toMatchInlineSnapshot(`
    "appId: com.my.app
    onFlowStart:
    - tapOn:    
        id: "test"    
    - evalScript: \${var hello = () => {  console.log("Hello, world!");};var body = http.get("https://jsonplaceholder.typicode.com/todos/1").body;var result = json(body);console.log(result.userId);console.log(MAESTRO_APP_ID);hello();}    
    ---
    "
  `);
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
  M.runScript({ path: join(__dirname, "../playground/e2e/script.ts") });
  expect(out).toMatchInlineSnapshot(`
    "- evalScript: \${var hello = () => {  console.log("Hello, world!");};var body = http.get("https://jsonplaceholder.typicode.com/todos/1").body;var result = json(body);console.log(result.userId);console.log(MAESTRO_APP_ID);hello();}
    "
  `);
});
