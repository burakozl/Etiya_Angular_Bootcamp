let products = [
    { unitPrice: 100, productName: "Ürün 1", discount: true, rate: 15 },
    { unitPrice: 150, productName: "Ürün 2", discount: false, rate: 0 },
    { unitPrice: 200, productName: "Ürün 3", discount: true, rate: 2.5 },
]

//  İsme göre filtreleme fonksiyonu

const getProductByProductName = (productName) => {

    let filterProductName = products.filter(product => product.productName.includes(productName))
    return filterProductName;
}

console.log(getProductByProductName('Ürün 3'));

// - İsme göre ilk bulunan productu getirme fonksiyonu

const findProductByName = (productName) => {

    let findProductName = products.find(product => product.productName.includes(productName))
    return findProductName;
}

console.log(findProductByName('2'));


// - unitPrice < Parametre getirme fonksiyonu (array)

const getUnitPriceByless = (price) => {
    let priceFilter = products.filter(item => item.unitPrice < price)
    return priceFilter;
}

console.log(getUnitPriceByless(160));



// - unitPrice > Parametre getirme fonksiyonu (array)

const getUnitPriceByMore = (price) => {
    let priceFilter = products.filter(item => item.unitPrice > price)
    return priceFilter;
}

 console.log(getUnitPriceByMore(160));

//  indirimdeki ürünleri getirme

const getDiscountedItem = () => {
    return products.filter(product => product.discount === true)
}

 console.log(getDiscountedItem())

 // ürün ekleme

const addProducts = (unitPrice, productName, discount, rate) => {
    return products.push({ unitPrice, productName, discount, rate })
}

addProducts(250, 'Ürün 4', false, 1);
 console.log(products);

//- verilen isim ile ürün silme

const deleteProduct = (productName) => {

    let productsIndex = products.findIndex(product => product.productName === productName);
    return products.splice(productsIndex, 1);
    
    //diğer yöntem filter ile diziden çıkarma
    //products = products.filter(p => p.productName !== productName)
    //return products;

}

console.log(deleteProduct('Ürün 4'));

const getAllProducts = () => {
    console.log(products);
};

getAllProducts();