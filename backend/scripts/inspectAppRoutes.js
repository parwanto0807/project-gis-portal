import app from '../src/app.js';

const stack = app._router.stack;
console.log('app._router.stack length=', stack.length);
stack.forEach((layer, index) => {
  console.log(index, layer.name, layer.regexp && layer.regexp.toString(), layer.route ? Object.keys(layer.route.methods) : 'router');
});
