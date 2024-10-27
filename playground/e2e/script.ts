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