import type { APIResult } from "./type";
import { hello } from "./hello";

// typed http request
const body = http.get("https://jsonplaceholder.typicode.com/todos/1").body;
const result = json<APIResult>(body);
console.log("id " + result.userId);

// you can use environment variables
console.log(`appId from env: ${process.env.MAESTRO_APP_ID}`);

// you can use imported functions
console.log("imported file " + hello());

console.log("platform", maestro.platform);

// set a variable to output to use in flow
output.id = "com.my.app:id/action_bar_root";
