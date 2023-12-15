var x = 10,
    z = "012.3d of34";

console.log(x.toPrecision(3));
console.log(10 == 10);      //  tre
console.log(10 === 10);       //
console.log(10 == "10");    //  
console.log(10 === "10");
console.log(parseInt(z));
console.log(parseFloat(z))
console.log(Boolean(0))
console.log(Boolean("0"))
console.log(false.toString())
console.log(String(false))

var tensquared = function(x, y) {return x * y;}(10, 12);

function printprops(o) {
    for(var p in o)
        console.log(p + ": " + o[p] + "\n")
}

var arr = [1,2,3,4];
printprops(arr);



function factorial(x) {
    if (x < 0) throw TypeError();
    if ((x = 1) || (x = 0)) return 1;
    return x * factorial(x-1);
  }
console.log(factorial(x));

console.log(tensquared);

var f = function() {
    return function() {
        console.log("hi!");
    }
}

f()();  // ingvoked f that returns function displaying "hi!" in console

var counter = function(num){
    counter.count = num !== undefined ? num : counter.count;
    return counter.count++;
};
// function are object:
counter.count = 0;  // add attribute to object

var object = {
    x:  6,
    "y": "text",
};

object.x = "Fritz"
object["z"] = 23

console.log("OBJ " + object.x);
console.log("OBJ " + object.y); 
console.log("OBJ " + object["x"]);
console.log("OBJ " + object["z"]);

function v(x, y, z) {
    console.log(arguments)
}

v("qwer", "asdf", "zxcv");

console.log(object.__proto__);

var t = Object.create(object);

console.log(counter.prototype);

var Person, person, anotherPerson;

Person = function(name) {
    this.name = name;
};

Person.prototype = {
    heartRate : 74,
    greet: function() {
        console.log(this.name + "'s HR is " + this.heartRate)
    }
};

person = new Person("Jack");    // creation a new object
console.log(person.greet());    // => Jack's HR is 74

console.log(Person.prototype.constructor);
console.log(person.constructor);

console.log(person instanceof Person);
console.log(Person.prototype.isPrototypeOf(person));

console.log(person.__proto__);
