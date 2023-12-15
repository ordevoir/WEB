// The try/catch/finally statement is JavaScript’s exception handling mechanism.
// Both the catch and finally blocks are optional,
// but a try block must be accompanied by at least one of these blocks.

try {
    // Normally, this code runs from the top of the block to the bottom
    // without problems. But it can sometimes throw an exception,
    // either directly, with a throw statement, or indirectly, by calling
    // a method that throws an exception.
}
catch (e) {
    // The statements in this block are executed if, and only if, the try
    // block throws an exception. These statements can use the local variable
    // e to refer to the Error object or other value that was thrown.
    // This block may handle the exception somehow, may ignore the
    // exception by doing nothing, or may rethrow the exception with throw.
}
finally {
    // This block contains statements that are always executed, regardless of
    // what happens in the try block. They are executed whether the try
    // block terminates:
    // 1) normally, after reaching the bottom of the block
    // 2) because of a break, continue, or return statement
    // 3) with an exception that is handled by a catch clause above
    // 4) with an uncaught exception that is still propagating
}

try {
    alert("Begin...");  // (1) <--
    lalala; // error, the variable is not defined!  
    alert("End...");  // (2)

  }
catch(e) {
    alert("Error " + e.name + ":" + e.message + "\n" + e.stack); // (3) <--
  }

alert("Continue...");

// If we have the code like this:

var data = '{ "age": 30 }'; // data doesn't contain atribute "name"

try {

  var user = JSON.parse(data); // <-- execute without errors
  alert( user.name ); // undefined

} catch(e) {
  // will not execute
  alert( "Sorry, there is an error in the data" );
}

// In order to handle the exception we need use "throw":

var data = '{ "age": 30 }'; // данные неполны

try {

  var user = JSON.parse(data); // <-- execute without errors

  if (!user.name) {
    throw new SyntaxError("Data is incorrect");
  }

  alert( user.name );

} catch(e) {
  alert( "Sorry, there is an error in the data" );
}

function factorial(x) {
  if (x < 0) throw TypeError();     // raises an exception TypeError
  if ((x = 1) || (x = 0)) return 1;
  return x * factorial(x-1);
}