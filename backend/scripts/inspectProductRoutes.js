import productRoutes from '../src/routes/productRoutes.js';

console.log('productRoutes stack:');
productRoutes.stack.forEach((layer, index) => {
  console.log(index, layer.name, layer.regexp && layer.regexp.toString());
});

if (productRoutes.stack.length > 0) {
  console.log('first layer keys:', Object.keys(productRoutes.stack[0]));
}
