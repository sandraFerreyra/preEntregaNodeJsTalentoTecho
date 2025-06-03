process.env.NODE_OPTIONS = '--dns-result-order=ipv4first';
import { getAllProducts, getProductById, createProduct, deleteProduct } from './services/productService.js';

const [,, method, resource, ...args] = process.argv;

async function main() {
  if (method === 'GET' && resource === 'products') {
    const products = await getAllProducts();
    console.log(products);

  } else if (method === 'GET' && resource.startsWith('products/')) {
    const [, id] = resource.split('/');
    if (!id) {
      console.log('⚠️ Debes especificar un productId. Ejemplo: npm run start GET products/15');
      return;
    }
    const product = await getProductById(id);
    console.log(product);

  } else if (method === 'POST' && resource === 'products') {
    const [title, price, category] = args;

    if (!title || isNaN(price) || !category) {
      console.log('❌ Debes proporcionar: <title> <price> <category>');
      console.log('Ejemplo: npm run start POST products T-Shirt-Rex 300 remeras');
      return;
    }
    const newProduct = await createProduct(title, price, category);
    console.log('✅ Producto creado:', newProduct);

  } else if (method === 'DELETE' && resource.startsWith('products/')) {
    const [, id] = resource.split('/');
    if (!id) {
      console.log('⚠️ Debes especificar un productId para eliminar. Ejemplo: npm run start DELETE products/7');
      return;
    }
    const deletedProduct = await deleteProduct(id);
    console.log('🗑️ Producto eliminado:', deletedProduct);

  } else {
    console.log('❌ Comando no reconocido. Comandos válidos:');
    console.log('  npm run start GET products');
    console.log('  npm run start GET products/<productId>');
    console.log('  npm run start POST products <title> <price> <category>');
    console.log('  npm run start DELETE products/<productId>');
  }
}

main();