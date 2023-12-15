
// An object is an unordered collection of properties,
// each of which has a name and a value. 
// Property names are strings, so we can say that objects map strings to values.
// (It is like dictionary in Python)
// In addition to maintaining its own set of properties,
// a JavaScript object also inherits the properties of another object,
// known as its prototype.
// Any value in JavaScript that is not a string, a number, true, false, null,
// or undefined is an object.
// Objects are mutable and are manipulated by reference rather than by value.
// If the variable x refers to an object, and the code let y = x; is executed,
// the variable y holds a reference to the same object, not a copy of that object.
// Any modifications made to the object through the variable y
// are also visible through the variable x.
// The most common things to do with objects are create them and to set,
// query, delete, test, and enumerate their properties.

// each property has associated values that we’ll call property attributes:
// The writable attribute specifies whether the value of the property can be set.
// - The enumerable attribute specifies whether the property name
//   is returned by a for/in loop.
// - The configurable attribute specifies whether the property can be
//   deleted and whether its attributes can be altered.

// every object has three associated object attributes:
// - An object’s prototype is a reference to another object
//   from which properties are inherited.
// - An object’s class is a string that categorizes the type of an object.
// - n object’s extensible flag specifies (in ECMAScript 5) whether new properties
//   may be added to the object.

// three broad categories of JavaScript objects and two types of properties:
// - A native object is an object or class of objects defined
//   by the ECMAScript specification. Arrays, functions, dates,
//   and regular expressions (for example) are native objects.
// - A host object is an object defined by the host environment
//   (such as a web browser) within which the JavaScript interpreter is embedded.
//   The HTMLElement objects that represent the structure of a web page in client-side
//   JavaScript are host objects. Host objects may also be native objects, as when
//   the host environment defines methods that are normal JavaScript Function objects.
// - A user-defined object is any object created by the execution of JavaScript code.
// - An own property is a property defined directly on an object.
// - An inherited property is a property defined by an object’s prototype object.

// Objects can be created with object literals, with the new keyword,
// and (in ECMAScript 5) with the Object.create() function.

// An object literal is a comma-separated list of colon-separated name:value pairs,
// enclosed within curly braces:

let empty = {};                             // An object with no properties
let point = { x:0, y:0 };                   // Two properties
let point2 = { x:point.x, y:point.y+1 };    // More complex values
let book = {
    "main title": "JavaScript",             // Property names include spaces,
    'sub-title': "The Definitive Guide",    // and hyphens, so use string literals 
    "for": "all audiences",                 // for is a reserved word, so quote
    author: {                               // The value of this property is
        firstname: "David",                 // itself an object. Note that
        surname: "Flanagan"                 // these property names are unquoted.
    }
};

// The "new" operator creates and initializes a new object.
// The "new" keyword must be followed by a function invocation.
// A function used in this way is called a constructor and serves
// to initialize a newly created object. Core JavaScript includes
// built-in constructors for native types. For example:

let o = new Object();        // Create an empty object: same as {}.
let a = new Array();         // Create an empty array: same as [].
let d = new Date();          // Create a Date object representing the current time
let r = new RegExp("js");    // Create a RegExp object for pattern matching.

// it is common to define your own constructor functions to initialize newly created objects.

// Prototypes
// ----------
// All objects created by object literals have the same prototype object,
// and we can refer to this prototype object in JavaScript code as Object.prototype.
// Objects created using the new keyword and a constructor invocation use the value
// of the prototype property of the constructor function as their prototype.
// So the object created by new Object() inherits from Object.prototype
// just as the object created by {} does. Similarly, the object created by
// new Array() uses Array.prototype as its prototype, and the object created by
// new Date() uses Date.prototype as its prototype. Object.prototype is one of 
// the rare objects that has no prototype: it does not inherit any properties.

// ECMAScript 5 defines a method, Object.create(), that creates a new object,
// using its first argument as the prototype of that object. 
// Object.create() also takes an optional second argument that describes
// the properties of the new object.

let o1 = Object.create({x:1, y:2});     // where {x:1, y:2} are prototype

// You can pass null to create a new object that does not have a prototype:

let o2 = Object.create(null);           // o2 inherits no props or methods.

// If you want to create an ordinary empty object 
// (like the object returned by {} or new Object()), pass Object.prototype:

let o3 = Object.create(Object.prototype); // o3 is like {} or new Object().

// Creation the prototype with constructor:

let Person = {
    constructor: function(name, age, gender) {
        this.name = name;
        this.age = age;
        this. gender = gender;
        return this;
    },
    greet: function() {
        console.log("hi, my name is " + this.name);
    }
};

let person, anotherPerson, thirdPerson;

// Creation the new object from Person prototype:

person = Object.create(Person).constructor("John", 35, "male");

// Creation the new prototype from from Person prototype, change conscructor()
// and addition the new method develop:

let WebDeveloper = Object.create(Person);

WebDeveloper.constructor = function(name, age, gender, skills) {
    Person.constructor.apply(this, arguments);      
    this.skills = skills || [];
    return this;
};

WebDeveloper.develop = function(){
    console.log("Working...");
};

// Creation the new object from new prototype WebDeveloper:

let developer = Object.create(WebDeveloper).constructor("Jack", 21, "male", ["html", "css"]);

// Querying and Setting Properties
// -------------------------------

let author = book.author;       // Get the "author" property of the book.
let name = author.surname       // Get the "surname" property of the author.
let title = book["main title"]  // Get the "main title" property of the book.
                                // quotes is important anyway

// To create or set a property, use a dot or square brackets as you would to query
// the property, but put them on the left-hand side of an assignment expression:

book.edition = 6;                       // Create an "edition" property of book.
book["main title"] = "ECMAScript";      // Set the "main title" property.

// (Create if property exists / Set if proprety doesn't exist)

// When you use the . operator to access a property of an object, however,
// the name of the property is expressed as an identifier. Identifiers must be
// typed literally into your JavaScript program; they are not a datatype,
// so they cannot be manipulated by the program.
// On the other hand, when you access a property of an object with
// the [] array notation, the name of the property is expressed as a string.
// Strings are JavaScript datatypes, so they can be manipulated and created
// while a program is running. So, for example, you can write the following 
// code in JavaScript:

let addr = "";
for(i = 0; i < 4; i++) {
    addr += customer["address" + i] + '\n';
}

// This code reads and concatenates the address0, address1, address2,
// and address3 properties of the customer object.

// Deleting Properties
// -------------------
// The delete operator removes a property from an object. Its single operand
// should be a property access expression. Surprisingly, delete does not operate
// on the value of the property but on the property itself:

delete book.author;             // The book object now has no author property.
delete book["main title"];      // Now it doesn't have "main title", either.

// The delete operator only deletes own properties, not inherited ones.
// (To delete an inherited property, you must delete it from the prototype object
// in which it is defined. Doing this affects every object that inherits
// from that prototype.)

// Testing Properties
// -------------------
// You can do check whether an object has a property with a given name with the
// 'in' operator, with the hasOwnProperty() and propertyIsEnumerable() methods,
// or simply by querying the property.

// The in operator expects a property name (as a string) on its left side
// and an object on its right. It returns true if the object has an own property
// or an inherited property by that name:

let o = { x: 1 }
"x" in o;           // true: o has an own property "x"
"y" in o;           // false: o doesn't have a property "y"
"toString" in o;    // true: o inherits a toString property

// Instead of using the in operator it is often sufficient to simply query
// the property and use !== to make sure it is not undefined:

let o = { x: 1 }
o.x !== undefined;          // true: o has a property x
o.y !== undefined;          // false: o doesn't have a property y 
o.toString !== undefined;   // true: o inherits a toString property

// The hasOwnProperty() method of an object tests whether that object has an
// own property with the given name. It returns false for inherited properties:

let o = { x: 1 }
o.hasOwnProperty("x");              // true: o has an own property x
o.hasOwnProperty("y");              // false: o doesn't have a property y
o.hasOwnProperty("toString");       // false: toString is an inherited property

// The propertyIsEnumerable() refines the hasOwnProperty() test.
// It returns true only if the named property is an own property
// and its enumerable attribute is true. Certain built-in properties are not
// enumerable. Properties created by normal JavaScript code are enumerable
// unless you’ve used one of the methods to make them nonenumerable.

let o = inherit({ y: 2 });
o.x = 1;
o.propertyIsEnumerable("x"); // true: o has an own enumerable property x
o.propertyIsEnumerable("y"); // false: y is inherited, not own
Object.prototype.propertyIsEnumerable("toString"); // false: not enumerable

// Enumerating Properties
// ----------------------
// ECMAScript 5 defines two functions that enumerate property names.
// - The first is Object.keys(), which returns an array of the names
//   of the enumerable own properties of an object.
// - The second ECMAScript 5 property enumeration function is
//   Object.getOwnPropertyNames(). It works like Object.keys() but returns
//   the names of all the own properties of the specified object,
//   not just the enumerable properties.

// Property Getters and Setters
// ----------------------------
// In ECMAScript the value may be replaced by one or two methods,
// known as a getter and a setter. Properties defined by getters and setters
// are sometimes known as accessor properties to distinguish them
// from data properties that have a simple value.

// When a program queries the value of an accessor property,
// JavaScript invokes the getter method (passing no arguments).
// When a program sets the value of an accessor property, JavaScript invokes
// the setter method, passing the value of the right-hand side of the assignment.

// If a property has both a getter and a setter method, it is a read/write property.
// If it has only a getter method, it is a read-only property.
// And if it has only a setter method, it is a write-only property
// (something that is not possible with data properties)
// and attempts to read it always evaluate to undefined.

let o = {
    // An ordinary data property 
    data_prop: value,
    // An accessor property defined as a pair of functions
    get accessor_prop() { /* function body here */ },
    set accessor_prop(value) { /* function body here */ }
};

// Accessor properties are defined as one or two functions whose name is the same
// as the property name, and with the function keyword replaced with get and/or set.

let p = {
    // x and y are regular read-write data properties.
    x: 1.0,
    y: 1.0,

    // r is a read-write accessor property with getter and setter.
    // Don't forget to put a comma after accessor methods.
    get r() { return Math.sqrt(this.x*this.x + this.y*this.y); },
    set r(newvalue) {
        let oldvalue = Math.sqrt(this.x*this.x + this.y*this.y);
        let ratio = newvalue/oldvalue;
        this.x *= ratio; 
        this.y *= ratio;
    },
    // theta is a read-only accessor property with getter only.
    get theta() { return Math.atan2(this.y, this.x); }
}

// Other reasons to use accessor properties include sanity checking of property
// writes and returning different values on each property read:

// This object generates strictly increasing serial numbers
let serialnum = {
    // This data property holds the next serial number. 
    // The $ in the property name hints that it is a private property. 
    $n: 0,
    // Return the current value and increment it 
    get next() { return this.$n++; },
    // Set a new value of n, but only if it is larger than current 
    set next(n) {
        if (n >= this.$n) this.$n = n; 
        else throw "serial number can only be set to a larger value";
    } 
};

// Property Attributes
// -------------------
// In addition to a name and value, properties have attributes that 
// specify whether they can be written, enumerated, and configured.
// This section explains the ECMAScript 5 API for querying and setting
// property attributes. This API is particularly important to library
// authors because:
// - It allows them to add methods to prototype objects and make them
//   nonenumerable, like built-in methods.
// - It allows them to “lock down” their objects, defining properties
//   that cannot be changed or deleted.

// The four attributes of a data property are
// - value
// - writable
// - enumerable
// - configurable
// Accessor properties don’t have a value attribute or a writable attribute:
// their writability is determined by the presence or absence of a setter.
// So the four attributes of an accessor property are
// - get
// - set
// - enumerable
// - configurable

// The ECMAScript 5 methods for querying and setting the attributes of
// a property use an object called a property descriptor to represent
// the set of four attributes. A property descriptor object has properties
// with the same names as the attributes of the property it describes.
// Thus, the property descriptor object of a data property has properties
// named value, writable, enumerable, and configurable. And the descriptor
// for an accessor property has get and set properties instead of value and
// writable. The writa ble, enumerable, and configurable properties are boolean
// values, and the get and set properties are function values, of course.

// To obtain the property descriptor for a named property of a specified object,
// call Object.getOwnPropertyDescriptor():

// Returns {value: 1, writable:true, enumerable:true, configurable:true}
Object.getOwnPropertyDescriptor({x:1}, "x");

// Now query the octet property of the random object.
// Returns { get: /*func*/, set:undefined, enumerable:true, configurable:true} 
Object.getOwnPropertyDescriptor(random, "octet");

// Returns undefined for inherited properties and properties that don't exist.
Object.getOwnPropertyDescriptor({}, "x");           // undefined, no such prop
Object.getOwnPropertyDescriptor({}, "toString");    // undefined, inherited

// Object.getOwnPropertyDescriptor() works only for own properties.

// To set the attributes of a property, or to create a new property with the
// specified attributes, call Object.defineProperty(), passing the object to be
// modified, the name of the property to be created or altered, and
// the property descriptor object:

let o = {};         // Start with no properties at all 
// Add a nonenumerable data property x with value 1. 
Object.defineProperty(o, "x", { value : 1,
                                writable: true,
                                enumerable: false,
                                configurable: true});

// Check that the property is there but is nonenumerable 
o.x;            // => 1 
Object.keys(o)  // => []

// Now modify the property x so that it is read-only 
Object.defineProperty(o, "x", { writable: false });

// Try to change the value of the property 
o.x = 2;     // Fails silently or throws TypeError in strict mode
o.x          // => 1

// The property is still configurable, so we can change its value like this:
Object.defineProperty(o, "x", { value: 2 }); 
o.x         // => 2

// Now change x from a data property to an accessor property 
Object.defineProperty(o, "x", { get: function() { return 0; } });
o.x           // => 0

// The property descriptor you pass to Object.defineProperty() does not have to 
// include all four attributes. If you’re creating a new property, 
// then omitted attributes are taken to be false or undefined. 
// If you’re modifying an existing property, then the attributes you omit are 
// simply left unchanged. Note that this method alters an existing own property 
// or creates a new own property, but it will not alter an inherited property.

// If you want to create or modify more than one property at a time, 
// use Object.define Properties(). The first argument is the object 
// that is to be modified. The second argument is an object that maps 
// the names of the properties to be created or modified to 
// the property descriptors for those properties. For example:

let p = Object.defineProperties({}, {
    x: { value: 1, writable: true, enumerable:true, configurable:true }, 
    y: { value: 1, writable: true, enumerable:true, configurable:true }, 
    r: {
        get: function() { return Math.sqrt(this.x*this.x + this.y*this.y) },
        enumerable:true, 
        configurable:true
    }
});

// first argument of method Object.create is the prototype object for 
// the newly created object. This method also accepts a second optional argument,
// which is the same as the second argument to Object.defineProperties().
// If you pass a set of property descriptors to Object.create(), then 
// they are used to add properties to the newly created object.

// Object.defineProperty() and Object.defineProperties() throw TypeError 
// if the attempt to create or modify a property is not allowed.

// Object Attributes
// ----------------
// Every object has associated attributes:
// - prototype
// - class
// - extensible

// Prototype

// An object’s prototype attribute specifies the object from which it inherits properties.
// Objects created from object literals use Object.prototype as their prototype.
// Objects created with new use the value of the prototype property
// of their constructor function as their prototype.
// And objects created with Object.create() use the first argument to 
// that function (which may be null) as their prototype.
// In ECMAScript 5, you can query the prototype of any object 
// by passing that object to Object.getPrototypeOf().
// To determine whether one object is the prototype of (or is part of
// the prototype chain of) another object, use the isPrototypeOf() method.
// To find out if p is the prototype of o write p.isPrototypeOf(o):

let p = {x:1};                                  // Define a prototype object.
let o = Object.create(p);                       // Create an object with that prototype. 
p.isPrototypeOf(o)                              // => true: o inherits from p
Object.prototype.isPrototypeOf(o)               // => true: p inherits from Object.prototype

// use __proto__ to get prototype attribute:

o.__proto__;                                    // => {x: 1}

// Class

// An object’s class attribute is a string that provides information 
// about the type of the object.
// To obtain the class of an object, you can invoke toString() method on it, 
// and extract the eighth through the second-to-last characters of the returned string.
// This example defines a function that returns the class of any object you pass it:

function classof(o) {
    if (o === null) return "Null"; 
    if (o === undefined) return "Undefined"; 
    return Object.prototype.toString.call(o).slice(8,-1);
}

// Objects created through built-in constructors such as Array and Date have 
// class attributes that match the names of their constructors.
// Objects created through object literals or by Object.create have
// a class attribute of “Object”.
// If you define your own constructor function, any objects you create with it 
// will have a class attribute of “Object”: there is no way to specify
// the class attribute for your own classes of objects:

classof(null)       // => "Null"
classof(1)          // => "Number"
classof("")         // => "String"
classof(false)      // => "Boolean"
classof({})         // => "Object"
classof([])         // => "Array"
classof(/./)        // => "Regexp"
classof(new Date()) // => "Date"
classof(window)     // => "Window" (a client-side host object)
function f() {};    // Define a custom constructor
classof(new f());   // => "Object"

// Extensible

// The extensible attribute of an object specifies whether new properties
// can be added to the object or not. In ECMAScript 5, all built-in and user-defined
// objects are extensible unless they have been converted to be nonextensible.
// To determine whether an object is extensible, pass it to Object.isExtensible().
// To make an object nonextensible, pass it to Object.preventExtensions().
// Note that there is no way to make an object extensible again once you have
// made it nonextensible. Also note that calling preventExtensions()
// only affects the extensibility of the object itself. If new properties are added
// to the prototype of a nonextensible object, the nonextensible object will
// inherit those new properties.

// Object.seal() works like Object.preventExtensions(), but in addition to making
// the object nonextensible, it also makes all of the own properties of that
// object nonconfigurable. This means that new properties cannot be added
// to the object, and existing properties cannot be deleted or configured.
// Existing properties that are writable can still be set, however.
// There is no way to unseal a sealed object.
// You can use Object.isSealed() to determine whether an object is sealed.

// Object.freeze() locks objects down even more tightly. In addition to making
// the object nonextensible and its properties nonconfigurable, it also makes
// all of the object’s own data properties read-only. (If the object has
// accessor properties with setter methods, these are not affected and
// can still be invoked by assignment to the property.)
//  Use Object.isFrozen() to determine if an object is frozen.

// It is important to understand that Object.seal() and Object.freeze() affect only
// the object they are passed: they have no effect on the prototype of that object.
// If you want to thoroughly lock down an object, you probably need to seal
// or freeze the objects in the prototype chain as well.

// Object.preventExtensions(), Object.seal(), and Object.freeze() all return
// the object that they are passed, which means that you can use them in nested
// function invocations:

// Create a sealed object with a frozen prototype and a nonenumerable property
let o = Object.seal(Object.create(Object.freeze({x:1}),
                                {y: {value: 2, writable: true}}));

