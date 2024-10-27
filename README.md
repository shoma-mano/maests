# This package is inspired by [maestro-ts](https://github.com/johkade/maestro-ts)

# ✅ Features

- You can write Maestro flows in TypeScript and execute directly.
- Break down Flow into smaller, reusable modules
- Automatically load environment variables from .env
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
