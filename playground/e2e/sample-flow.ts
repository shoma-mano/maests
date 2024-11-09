import { getOutput, M } from "maests";
import { openApp } from "@/e2e/utils/openApp";
import { someScript } from "./utils/script";

openApp();
M.runScript(someScript);
M.runFlow({
  flow: () => {
    // use variables set in script.ts
    M.assertVisible({ id: getOutput("id") });
    M.repeatWhileNotVisible(
      {
        text: "4",
      },
      () => {
        M.tapOnText("Increment");
      }
    );
  },
});
