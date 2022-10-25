//type-safe
console.log("Typscript dosyasından merhaba");
function sayHello(name) {
    console.log("Hello ".concat(name));
}
sayHello("Burak");
var sumFunc = function (a1, a2) {
    return a1 + a2;
};
var sumOfNumbers = sumFunc(5, 6);
console.log(sumOfNumbers);
var Greeter = /** @class */ (function () {
    function Greeter(name) {
        this.name = name;
    }
    Greeter.prototype.sayHi = function () {
        console.log("Hello ".concat(this.name));
        this.sayWhatsUp();
    };
    Greeter.prototype.sayWhatsUp = function () {
        console.log("What's up?");
    };
    return Greeter;
}());
var greeter = new Greeter("Burak");
greeter.sayHi();
//----------
var userService = /** @class */ (function () {
    function userService() {
        this.users = [];
    }
    userService.prototype.getUserNames = function () {
        return this.users;
    };
    userService.prototype.addUser = function (name) {
        this.users.push(name);
    };
    return userService;
}());
var user = new userService();
user.addUser({ age: 55, name: "Veli", surname: "Velioğlu" });
console.log(user.getUserNames());
export {};
