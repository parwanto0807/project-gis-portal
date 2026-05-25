
async function test() {
  const res = await fetch('http://localhost:5001/api/v1/auth/test-me');
  const data = await res.json();
  console.log(JSON.stringify(data, null, 2));
}
test();
