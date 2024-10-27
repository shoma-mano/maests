# This package is inspired by [maestro-ts](https://github.com/johkade/maestro-ts)

# ✅ Features

- You can write Maestro flows in TypeScript.
- Break down Flow into smaller, reusable modules
- Automatically load environment variables from .env
- Executing a TypeScript test file directly.
- Handling runScript with type.

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

### runScript

`flow.ts`

```typescript
import { M } from "maests";

M.runScript("./script.ts");
```

`script.ts`

```typescript
output.result = http.get(`https://${process.env.APP_DOMAIN}/users`);
```
