# A TypeScript-based solution inspired by [maestro-ts](https://github.com/johkade/maestro-ts) for writing and running Maestro flows in a modular and reusable way.

# ✅ Features

- You can write Maestro flows in TypeScript and execute directly.
- Break down Flow into smaller, reusable modules
- Automatically load environment variables from .env
- Handling runScript with type.

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
npx maests my-first-flow.ts
```

## Utils

### runScript

`flow.ts`

```typescript
import { M } from "maests";

M.runScript("./script.ts");
```

`script.ts`

```typescript
import type { APIResult } from "./type";
import { hello } from "./hello";

// typed http request
const body = http.get("https://jsonplaceholder.typicode.com/todos/1").body;
const result = json<APIResult>(body);
console.log(result.userId);

// you can use environment variables
console.log(process.env.MAESTRO_APP_ID);

// you can use imported functions
hello();
```

## More Example

You can try maests by simulator in [playground](playground)

```shell
cd playground
pnpm install
npx expo run:android
npx maests e2e/sampleFlow.ts
```

### 🛠️ Commands
This package offers a rich set of commands to cover various actions in your flows, including initializing flows, performing taps and presses, swiping, asserting conditions, and more.

For a detailed list of all commands with examples, refer to the [Commands Documentation](./commands.md).


