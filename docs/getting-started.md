# Getting Started

## Getting Stared

::: warning Requirement
If you have not installed maestro yet, you have to [install](https://maestro.mobile.dev/getting-started/installing-maestro) it at first.
:::

### Installation

```sh:
pnpm -D add maests
```

### 1 : Create your first flow

Create a new file `my-first-flow.ts`

```typescript
import { M } from "maests";

M.initFlow({ appId: "com.myTeam.myApp" });
M.tapOn("someTestId");
```

### 2 : Execute Test

If the Android Emulator or iOS Simulator is launched, you can execute the test with:

```sh
npx maests my-first-flow.ts
```

If you don't have a project to try, the [Playground](./playground) is ready for you to use.
