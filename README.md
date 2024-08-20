# This package is inspired by [maestro-ts](https://github.com/johkade/maestro-ts)

# ✅ Features

・You can write Maestro flows in TypeScript.  
・Break down Flow into smaller, reusable modules  
・Automatically load environment variables from .env  
・No need to use runScript or runFlow anymore

## Usage

### Install

```sh:
pnpm -D add maests
```

### Create E2E folder

In your app, create a folder your tests will live in.
This time, we will use `my-app/test/e2e`.

### Create your first flow

Create a file called `<flow-name>.maestro.ts` in `my-app/test/e2e`.

```typescript
import { M } from "maests";

M.initFlow("com.myTeam.myApp");
M.tapOn("someTestId");
```

### Compiling and running your flows

Now, from your e2e test folder, generate the yaml flows and run them.

```sh
cd test/e2e && npx maests
maestro test my-first-flow.yaml
```

### More Example usage

Here's a short sample flow that uses a utility flow. For more extensive examples, check out [the examples](example/sample-flow.maestro.ts)

```typescript
// test/e2e/utils/openMyApp.ts
import { M } from "maests";

export const openMyApp = () => {
  M.initFlow("com.myTeam.myApp");
  M.tapOn("someTestId");
};

// test/e2e/`<flow-name>.maestro.ts
import { openMyApp } from "./utils/openMyApp";
openMyApp();
```
