const baseUrl = 'http://localhost:5001/api/v1/products';
const initial = {
  namaBarang: 'Update Test Product',
  namaPanggilan: 'UTP',
  customer: 'Cust',
  supplier: 'Supp',
  mtUang: 'IDR',
  payment: 'COD',
  material: 'Steel',
  kategori: 'Test',
  skus: [
    { sku: 'UPDATE-SKU-1', part: 'P1', hargaJual: 10000, hargaBeli: 8000, balance: 5, satuanId: '1' }
  ]
};

(async () => {
  try {
    const createRes = await fetch(baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(initial)
    });
    const createBody = await createRes.json();
    console.log('CREATE', createRes.status, createBody);
    if (!createBody.success) return;

    const productId = createBody.data.id;
    const existingSku = createBody.data.skus[0];
    const updateBody = {
      ...initial,
      namaBarang: 'Update Test Product Edited',
      skus: [
        { ...existingSku, hargaJual: 12000, balance: 7 },
        { sku: 'UPDATE-SKU-2', part: 'P2', hargaJual: 15000, hargaBeli: 11000, balance: 3, satuanId: '1' }
      ]
    };

    const updateRes = await fetch(`${baseUrl}/${productId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updateBody)
    });
    const updateJson = await updateRes.json();
    console.log('UPDATE', updateRes.status, updateJson);
  } catch (error) {
    console.error(error);
  }
})();
