import products from '@assets/data.json';
let productsData = products

interface Product {
    id: string
    name: string
    brand: string
    stock: string
    batch: string
    expiration: string
    discount: string 
}

function getAllUsers() {
    return productsData;
}

function getById(id: string) {
    const product = productsData.find(product => product.id === id)
    return product
}

function createProduct(data: Product) {
    data.id = productsData.length+1 + ""
    productsData.push(data);
    return productsData;
}

function updateProduct(id: string, data: Partial<Product>) {
    const productIndex = productsData.findIndex(product => product.id === id);

    productsData[productIndex] = {
        ...productsData[productIndex],
        ...data
    };

    return productsData[productIndex];

    // let updatedProduct

    // productsData = productsData.map(product => {
    //     if(product.id === id) {
    //         updatedProduct = { ...product, ...data }
    //         return updatedProduct
    //     }
    //     return product;
    // })

    // return updatedProduct;
}

function deleteProduct(id: string) {
    productsData = productsData.filter(product => product.id !== id)
    return productsData;
}

export default {
    getAllUsers,
    getById,
    createProduct,
    updateProduct,
    deleteProduct
}