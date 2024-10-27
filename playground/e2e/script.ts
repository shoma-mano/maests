import type { APIResult } from "./type";

const body = http.get("https://jsonplaceholder.typicode.com/todos/1").body;
const result = json<APIResult>(body);
console.log(result.userId);
