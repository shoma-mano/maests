// e2e/utils/hello.ts
var hello = () => "Hello, World!";

// e2e/utils/script.ts
var body = http.get("https://jsonplaceholder.typicode.com/todos/1").body;
var result = json(body);
console.log("id " + result.userId);
console.log(`appId from env: ${MAESTRO_APP_ID}`);
console.log("imported file " + hello());
output.id = "com.my.app:id/action_bar_root";
