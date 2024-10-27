# This package is inspired by [maestro-ts](https://github.com/johkade/maestro-ts)

# ✅ Features

・You can write Maestro flows in TypeScript.  
・Break down Flow into smaller, reusable modules  
・Automatically load environment variables from .env

# 🚀 Road Map

- Directly executing TypeScript test file without converting TypeScript to yaml.
- Handling runScript or runFlow by imported reusable modules like normal TypeScript.

## Usage

### Install

```sh:
pnpm -D add maests
```

### Create your first flow

Create a file called `my-first-flow.ts`.

```typescript
import { M } from "maests";

M.initFlow("com.myTeam.myApp");
M.tapOn("someTestId");
```

### Run your flows

```sh
npx maests my-first-flow.ts
```
