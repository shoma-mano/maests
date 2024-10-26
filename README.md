# A TypeScript-based solution inspired by [maestro-ts](https://github.com/johkade/maestro-ts) for writing and running Maestro flows in a modular and reusable way.

# ✅ Features

 - You can write Maestro flows in TypeScript.  
 - Break down Flow into smaller, reusable modules  
 - Automatically load environment variables from .env  
 - No need to use runScript or runFlow anymore

## Usage

#### 📦 Installation

```sh:
  pnpm -D add maests
```

### 🚀 Getting Started

## Step 1: Set up your E2E folder

Create a directory for your tests within your app (e.g., `my-app/test/e2e`). All flows will be placed here.

## Step 2: Create your first flow

Inside my-app/test/e2e, create a new file <flow-name>.maestro.ts:


```typescript
import { M } from "maests";

M.initFlow({ appId: "com.myTeam.myApp" });
M.tapOn("someTestId");

```

# Initializing and Configuring Flows

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

### 🛠️ Commands
This package offers a rich set of commands to cover various actions in your flows, including initializing flows, performing taps and presses, swiping, asserting conditions, and more.

For a detailed list of all commands with examples, refer to the [Commands Documentation](./example/commands.md).


