
///////////////////////////////////////////////////////////////////////////////
//
// 식별자
//
///////////////////////////////////////////////////////////////////////////////
const name = "song",
    age = 29,
    gender = "male";

const printVal = (name:string , age:number, gender?:string):string => {

    return `Hi, my name is ${name}, my age is ${age}, i'm ${gender}`;
}

console.log(printVal(name,age));
console.log(printVal(name,age,gender));

///////////////////////////////////////////////////////////////////////////////
//
// Interface
//
///////////////////////////////////////////////////////////////////////////////
interface Human {
    name:string,
    age:number,
    gender:string,
}

const Me = {
    name : "song",
    age : 29,
    gender : "male",
}

// use interface
const printObj = (human:Human):string => {
    return `Hi, my name is ${human.name}, my age is ${human.age}, i'm ${human.gender}`;    
}

console.log(printObj(Me));

//////////////////////////////////////////////////////////////////////////////
//
// Class
//
//////////////////////////////////////////////////////////////////////////////
class Person {
    public name:string;
    private age:number;
    public gender:string;
    constructor(name:string, age:number, gender?: string) {
        this.name = name;
        this.age = age;
        this.gender = gender;
    }
    public getAge():number {
        return this.age;
    }
}

const person = new Person("choi",30,"female");

const printClass = (person:Person):string => {
    return `Hi, my name is ${person.name}, my age is ${person.getAge()}, i'm ${person.gender}`;    
}

console.log(printClass(person));

export {};