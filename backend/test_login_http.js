
async function testLogin() {
  try {
    const res = await fetch('http://localhost:5001/api/v1/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier: 'parwanto0807@gmail.com', password: 'password_here' })
    });
    const data = await res.json();
    console.log("Login HTTP Response:", JSON.stringify(data, null, 2));
  } catch(e) {
    console.error(e);
  }
}
testLogin();
