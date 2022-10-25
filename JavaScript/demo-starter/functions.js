let products = [
    { unitPrice: 100, productName: "Ürün 1", discount: true, rate: 15 },
    { unitPrice: 150, productName: "Ürün 2", discount: false, rate: 0 },
    { unitPrice: 200, productName: "Ürün 3", discount: true, rate: 2.5 },
];
console.log(products.find(p => p.productName === "Ürün 3"));

//parametre
//default value
function getProductByName(productName = "Ürün"){
    let productsResult = products.filter(p => p.productName.includes(productName));
    console.log(`Arama sonucunda ${productsResult.length} adet ürüne ulaşıldı..`);
}

getProductByName("Ürün");

getProductByName("1");

getProductByName("asadasd");

getProductByName();

//constant => değişken tanımlama keyword değer değişmez

//arrow function

const filterByProductName = (productName) => {
    let filteredName = products.filter(p => p.productName.includes(productName));
    console.log(`bulunan ürün ${filteredName}`);
}
filterByProductName("3");