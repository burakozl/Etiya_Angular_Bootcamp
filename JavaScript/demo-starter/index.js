console.log("Merhaba Kodlamaio 2");

// yorum satırı
// kod çalıştırılırken dikkate alınmaz.

// değişkenler ve türleri
// variable var
// JAVASCRIPT TIP GUVENLI DEĞİLDİR
// TYPESCRIPT tip güvenli

//number
let dolarKur = 10;
console.log(dolarKur);

//string=metinsel ifade
let euroKur = "15";
console.log(euroKur);

// matematiksel operatör
console.log(dolarKur + 5);
console.log(euroKur + 10); //! string olduğu için yanlış çalıştı

// var keywordunu unut!!
// let

// boolean = true ya da false
let euroYukselis = true;
console.log(euroYukselis);

// number ondalıklı sayı olabilir => decimal,float,double
dolarKur = 12.52;
console.log(dolarKur);

// koleksiyonlar
// array = dizi
let krediler = ["İhtiyaç", "Taşıt", "Konut"];
console.log(krediler);
console.log(krediler[0]);

// object
// JSON => Javascript Object Notation
// KEY - VALUE
// aylikOdeme => 415.53

// Naming Convention
// camelCase
let odemeBilgileri = {
	aylikOdeme: 415.53,
	faizOrani: 1.89,
	toplamGeriOdeme: 14950.42,
	krediTipi: "İhtiyaç Kredisi",
};
console.log(odemeBilgileri);

//değer tipler
let number1 = 10;
let number2 = 20;
number1 = number2;
number2=100;
console.log(number1);

//referans tipler
let product1 = {id:1, name: "Laptop", unitPrice: 15000};
let product2 = {id:1, name: "Mouse", unitPrice: 15000};
product1 = product2;
product2.name = "Keyboard";
console.log(product1);
