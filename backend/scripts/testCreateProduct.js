const url = 'http://localhost:5001/api/v1/products';
const body = {
  namaBarang: 'Test Product Node',
  skus: [
    { sku: 'TEST-SKU-NODE', part: 'PNODE', hargaJual: 15000, hargaBeli: 10000, balance: 12, satuanId: '1' }
  ]
};

(async () => {
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-skip-auth': 'true' },
      body: JSON.stringify(body)
    });
    const text = await res.text();
    console.log(res.status, res.statusText);
    console.log(text);
  } catch (err) {
    console.error(err);
  }
})();
