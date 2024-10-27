import type { APIResult } from "./type";

const result = http.get(
  "https://jsonplaceholder.typicode.com/todos/1"
) as APIResult;
output.userId = result.userId.toString();
