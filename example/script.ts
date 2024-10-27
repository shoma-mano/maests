const res = http.get(`https://jsonplaceholder.typicode.com/todos/1`, {
  headers: {
    "Content-Type": "application/json",
  },
});
console.log(process.env.PROFILE);
output.result = res.body;
