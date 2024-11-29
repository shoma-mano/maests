# 🛹 Playground

## Sample Flow

There is sample flow you can try actually in [playground](https://github.com/shoma-mano/maests/tree/main/playground).

```typescript
import { getOutput, M } from "maests";
import { openApp } from "@/e2e/utils/openApp";
import { someScript } from "./utils/script";

// use composable flow easiliy
openApp();

// run script like this
M.runScript(someScript);

// use variables set in someScript
M.assertVisible({ id: getOutput("id") });

// use runFlow to run a flow with a condition
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
    visible: "Increment",
  },
});
```

## Run Sample Flow

You can try maests by above sample flow with simulator.

### 1.Clone repo

```shell
git clone https://github.com/shoma-mano/maests
cd maests
```

### 2.Build maests

```shell
pnpm install
pnpm build
```

### 3.Try maests in playground

```shell
cd playground
pnpm install
pnpm test
```
