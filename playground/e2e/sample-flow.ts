import { getOutput, M } from "maests";
import { openApp } from "@/e2e/utils/openApp";
import { someScript } from "./utils/script";

// use composable flow easiliy
openApp();

// run script like this
M.runScript(someScript);

// use variables set in someScript
M.assertVisible({ id: getOutput("id") });

// use runFlow to run some flow with condition
M.runFlow({
  flow: () => {
    M.repeatWhileNotVisible(
      {
        text: "4",
      },
      () => {
        M.tapOnText("Increment");
      }
    );
  },
  condition: {
    visible: getOutput("id"),
  },
});
