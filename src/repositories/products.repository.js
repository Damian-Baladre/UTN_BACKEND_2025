
const products = [
    { title: 'Tv Samsung', price: 4000, id: 1 },
    { title: 'Tv LG', price: 5000, id: 2 },
    { title: 'Tv Noblex', price: 6000, id: 3 }
];
class ProductsRepository {
     create({ title, price}) { 
        const product = {title, price};
        products.push(product)
    };
    getAll(){
        return products
    }
}

const productsRepository = new ProductsRepository()
export default productsRepository