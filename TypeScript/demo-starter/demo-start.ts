//type-safe

import { Users } from "./user";

console.log("Typscript dosyasından merhaba");

function sayHello(name:string) {
    console.log(`Hello ${name}`);
}

sayHello("Burak");

let sumFunc = (a1:number,a2:number): number => {
    return a1+ a2;
}

let sumOfNumbers:number = sumFunc(5,6);
console.log(sumOfNumbers);


class Greeter {
    private name:string;
    constructor(name:string){
        this.name = name;
    }

    sayHi(){
        console.log(`Hello ${this.name}`);
        this.sayWhatsUp();
    }

    private sayWhatsUp(){
        console.log("What's up?");     
    }
}

let greeter = new Greeter("Burak");
greeter.sayHi();

//----------

class userService {

    private users:Users[] = [];


    getUserNames():Users[]{
        return this.users;
    }
    addUser(name:Users){
        this.users.push(name);
    }
}

let user = new userService();

user.addUser({age: 55,name: "Veli",surname:"Velioğlu"});

console.log(user.getUserNames());
