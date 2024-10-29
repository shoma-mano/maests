# A TypeScript-based solution inspired by [maestro-ts](https://github.com/johkade/maestro-ts) for writing and running Maestro flows in a modular and reusable way.

## ✅ Features

- You can write Maestro flows in TypeScript and execute directly.
- Break down Flow into smaller, reusable modules
- Automatically load environment variables from .env
- Handling runScript with type.

## 🚀 Getting Started

### Installation

```sh:
pnpm -D add maests
```

### Step 1: Create your first flow

Create a new file <flow-name>.ts:

```typescript
import { M } from "maests";

M.initFlow({ appId: "com.myTeam.myApp" });
M.tapOn("someTestId");
```

### Step 2: Execute Test

```sh
npx maests my-first-flow.ts
```

## 🛠️ Commands

This package offers a rich set of commands to cover various actions in your flows, including initializing flows, performing taps and presses, swiping, asserting conditions, and more.

For a detailed list of all commands with examples, refer to the [Commands Documentation](./commands.md).

## 🛹 Playground

You can try maests by simulator in [playground](playground)

```shell
# build maests
pnpm install
pnpm build
# try maests in playground
cd playground
pnpm install
npx expo run:android
npx ma🛹ests e2e/sampleFlow.ts
```

## ⭐️ Contributing

This package is currently under active development, and we welcome contributions from everyone!
