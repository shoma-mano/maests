import { M, out, resetOut } from "./commands";

it("commands", () => {
  M.initFlow({ appId: "com.my.app" });
  expect(out).toMatchInlineSnapshot(`
    "appId: com.my.app
    ---
    "
  `);
  resetOut();

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
  resetOut();

  M.repeat(3, () => {
    M.repeat(3, () => {
      M.tapOn("test");
    });
  });
  expect(out).toMatchInlineSnapshot(`
    "- repeat:
         times: 3
         commands:
            - repeat:
                 times: 3
                 commands:
                    - tapOn:
                        id: "test"
    "
  `);
});
