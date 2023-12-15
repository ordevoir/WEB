// ------------------
// Print the name and value of each property of o. Return undefined.
// Functions with no return value are sometimes called procedures

function printprops(o) {
    for(let p in o)
        console.log(p + ": " + o[p] + "\n");
}

// Compute the distance between Cartesian points (x1,y1) and (x2,y2).

function distance(x1, y1, x2, y2) {         // function
    let dx = x2 - x1;                       // declaration
    let dy = y2 - y1;                       // statement
    return Math.sqrt(dx*dx + dy*dy);
}

// A recursive function (one that calls itself) that computes factorials

function factorial(x) {
    if (x <= 1) return 1;
    return x * factorial(x-1);
}

// This function expression defines a function that squares its argument.
// Note that we assign it to a variable

let square = function(x) {  // function
    return x*x;             // definition
};                          // expression
    // notice ";"

// Function expressions are sometimes defined and immediately invoked
// if values for argements are in brackets like this:

let z = (function(x, y) {                // self-invoking
    return x * y;}(10, 12));             // anonymous function

// Function expressions can include names, which is useful for recursion.

let f = function fact(x) {          // function
    if (x <= 1) return 1;           // definition
    else return x*fact(x-1); };     // expression

// Function expressions can also be used as arguments to other functions:

data.sort(function(a,b) { return a-b; });

// function returning another function:

let g = function() {
    return function() {
        console.log("hi!");
    }
}

g()();  // ingvoking f which return function displaying "hi!" in console

// Nested Functions

function hypotenuse(a, b) {
    function square(x) { return x*x; }
    return Math.sqrt(square(a) + square(b));
}

// Invoking functions
// ------------------
// JavaScript functions can be invoked in four ways:

// 1. Function Invocation:

printprops({x:1});
let total = distance(0,0,2,1) + distance(2,1,3,5);
let probability = factorial(5)/factorial(13)

// 2. Method Invocation

// If you have a function f and an object o,
// you can define a method named m of o with the following line:

o.m = f;

// Having defined the method m() of the object o, invoke it like this:

o.m();

// 3. Constructor Invocation

// If a function or method invocation is preceded by the keyword new,
// then it is a constructor invocation that retutns a new object:

let o = new Object();   // Object is constructor
let o = new Object;

 
// The critical feature of constructor invocations is that the prototype property
// of the constructor is used as the prototype of the new object. This means that
// all objects created with the same constructor inherit from the same object and
// are therefore members of the same class.

// Sorax's example:

let Person, person, anotherPerson;

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

// constructor creates class: 

person instanceof Person                    // => true
Person.prototype.isPrototypeOf(person)      // => true

// use __proto__ to get prototype attribute of objects:

person.__proto__            // => {heartRate: 74, greet: ƒ}

// Using inheritance:

Developer = function(name, skills) {
    Person.apply(this, arguments);
    this.skills = skills || [];
};

Developer.prototype = Object.create(Person.prototype);
Developer.prototype.constructor = Developer;

deveoloper = new Developer("John", ["c++", "python"]);

developer instanceof Developer      // true
developer instanceof Person         // true



// Augmenting Classes
// ------------------
// JavaScript’s prototype-based inheritance mechanism is dynamic:
// an object inherits properties from its prototype, even if the
// prototype changes after the object is created. This means that we can
// augment JavaScript classes simply by adding new methods to their prototype objects:

Person.prototype.squareHR = function() {return this.heartRate * this.heartRate}

// 4. 4 Indirect Invocation call() and apply()

// JavaScript functions are objects and like all JavaScript objects, they have methods.
// call() and apply() allow you to indirectly invoke (§8.2.4) a function as if
// it were a method of some other object. The first argument to both call() and apply()
// is the object on which the function is to be invoked and which becomes the value
// of the this keyword within the body of the function. To invoke the function f() as a
// method of the object o (passing no arguments), you could use either call() or apply():

f.call(o);
f.apply(o);

// Either of the lines of code above are similar to the following
// (which assume that o does not already have a property named m):

o.m = f;        // Make f a temporary method of o.
o.m();          // Invoke it, passing no arguments.
delete o.m;     // Remove the temporary method.

// the first argument to call() or apply() becomes the value of this, even if it is
// a primitive value or null or undefined. Any arguments to call() after the first
// invocation context argument are the values that are passed to the function that
// is invoked. For example, to pass two numbers to the function f() and invoke it
// as if it were a method of the object o, you could use code like this:

f.call(o, 1, 2);

// The apply() method is like the call() method, except that the arguments
// to be passed to the function are specified as an array:

f.apply(o, [1,2]);

// Note that apply() works with array-like objects as well as true arrays.

// The bind() Method
// -----------------
// The primary purpose of bind() is to bind a function to an object. When you invoke
//  the bind() method on a function f and pass an object o, the method returns
// a new function. Invoking the new function (as a function) invokes the original
// function f as a method of o. Any arguments you pass to the new function
// are passed to the original function. For example:

function f(y) { return this.x + y; }    // This function needs to be bound 
let o = { x : 1 };                      // An object we'll bind to
let g = f.bind(o);                      // Calling g(x) invokes o.f(x)
g(2)                                    // => 3
 
// Functions As Values
// -------------------
// In JavaScript functions are not only syntax but also values, which means they can be
// assigned to variables, stored in the properties of objects or the elements of arrays,
// passed as arguments to functions, and so on.

// To understand how functions can be JavaScript data as well as JavaScript syntax,
// consider this function definition:

function square(x) { return x*x; }

// This definition creates a new function object and assigns it to the variable square.
// The function can be assigned to another variable and still work the same way:

let s = square;     // Now s refers to the same function that square does
square(4);          // => 16
s(4);               // => 16

// Functions can also be assigned to object properties rather than variables.
// When you do this, they’re called methods:

let o = {square: function(x) { return x*x; }};  // An object literal
let y = o.square(16);                           // y equals 256

// Functions don’t even require names at all, as when they’re assigned to array elements:

let a = [function(x) { return x*x; }, 20];      // An array literal
a[0](a[1]);                                     // => 400

// The Arguments Object
// --------------------
// Suppose you define a function f that expects to be passed one argument, x.
// If you invoke this function with two arguments, the first argument
// is accessible within the function by the parameter name x or as arguments[0].
// The second argument is accessible only as arguments[1].

function f(x, y, z) {
    // First, verify that the right number of arguments was passed 
    if (arguments.length != 3) {
        throw new Error("function f called with " + arguments.length +
                        "arguments, but it expects 3 arguments.");
    }
    // Now do the actual function...
}

// JavaScript’s default behavior is fine in most cases:
// missing arguments are undefined and extra arguments are simply ignored.

// JavaScript uses lexical scoping. This means that functions are executed using
// the variable scope that was in effect when they were defined,
// not the variable scope that is in effect when they are invoked.

let scope = "global scope";             // A global variable
function checkscope() {
    let scope = "local scope"           // A local variable
    function f() { return scope; }
    return f();                         // will return result of function f()
}
checkscope();                           // => "local scope"

// Instead of invoking the nested function and returning its result,
// checkscope() now just returns the nested function object itself:

let scope = "global scope";             // A global variable
function checkscope() {
    let scope = "local scope"           // A local variable
    function f() { return scope; }
    return f;                           // will return function f()
}
checkscope()();                         // => "local scope"

let counter = (function(){      // making counter
    let count = 0;
    return function(num){
        count = num !== undefined ? num : count;
        return count++
    }
}());

counter();      // 0
counter();      // 1
counter();      // 2
counter();      // 3
counter(150);   // 150
counter();      // 151
counter();      // 152

// Another way:

let counter = function(num){
    counter.count = num !== undefined ? num : counter.count;
    return counter.count++;
};

// function are object:
counter.count = 0;  // add attribute to object

// Callback functions
// ------------------
// The function ask() should ask the question and,
// depending on the user’s answer, call yes() or no():

function ask(question, yes, no) {
    if (confirm(question)) yes()
    else no();
  }
  
function showOk() {
    alert( "You agreed." );
}
    
function showCancel() {
    alert( "You canceled the execution." );
}
  // usage: functions showOk, showCancel are passed as arguments to ask
  ask("Do you agree?", showOk, showCancel);

// The arguments showOk and showCancel of ask are called callback functions or just callbacks.
// The idea is that we pass a function and expect it to be “called back” later if necessary. 
// In our case, showOk becomes the callback for “yes” answer, and showCancel for “no” answer.

// We can use Function Expressions to write the same function much shorter:

function ask(question, yes, no) {
    if (confirm(question)) yes()
    else no();
}
  
ask(
    "Do you agree?",
    function() { alert("You agreed."); },
    function() { alert("You canceled the execution."); }
);

// Here, functions are declared right inside the ask(...) call. They have no name, 
// and so are called anonymous. Such functions are not accessible outside of ask 
// (because they are not assigned to variables), but that’s just what we want here.

// A function is a value representing an “action”

// Arrow functions

// There’s one more very simple and concise syntax for creating functions,
// that’s often better than Function Expressions. It’s called “arrow functions”:

let func = (arg1, arg2, ...argN) => expression

// This creates a function func that has arguments arg1..argN, evaluates 
// the expression on the right side with their use and returns its result.
// In other words, it’s roughly the same as:

let func = function(arg1, arg2, ...argN) {
    return expression;
};

// Let’s see an example:

let sum = (a, b) => a + b;
alert( sum(1, 2) );             // 3

// If we have only one argument, then parentheses around parameters can be omitted:

let double = n => n * 2;
alert( double(3) );             // 6

// If there are no arguments, parentheses should be empty (but they should be present):

let sayHi = () => alert("Hello!");
sayHi();

// Arrow functions can be used in the same way as Function Expressions.
// For instance, here’s the rewritten example with welcome():

let age = prompt("What is your age?", 18);

let welcome = (age < 18) ?
  () => alert('Hello') :
  () => alert("Greetings!");

welcome(); // ok now

// Multiline arrow functions:

let sum = (a, b) => {   // the curly brace opens a multiline function
    let result = a + b;
    return result;      // if we use curly braces, use return to get results
};

alert( sum(1, 2) ); // 3

// if function has only one argument no need to write parentheses:
const square = a => {
    return a * a;
}
// or
const cube = a => a * a
