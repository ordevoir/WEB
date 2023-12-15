// Условные инструкции (Conditional statements)

if (expression) statement

if (expressionA) {
    statement1;
    statement2;
} else if (expressionB) {
    statement3;
    statement4;
} else {
    statement3;
    statement4;
}

// Оператор выбора switch
// ----------------------
// оператор switch позволяет выполнить инструкцию, в зависимости от
// значение некоторой перменной (или константы). Вот ее синтаксис:

switch(переменная) {
    case значение_1: инструкция_1; break;
    case значение_2: инструкция_2; break;
    case значение_3: инструкция_3; break;
    case значение_4: инструкция_4; break;
    default: инструкция_5;
}
// в этой конструкции будет выполнена только та инструкция, для 
// которой значение соответствует переменной. Если, например, значение 
// переменной равно значению значение_3, то будет выполнена только 
// инструкция_3. В случае, если ни одно из проверяемых значений не равно 
// значению переменной, то будет выполнена инструкция, заданная в default


let value = "Fritz", homecity;

if (value === "Friedrich") {
    homecity = "Sarmack";
} else if (value === "Fritz") {
    homecity = "Argudan";
} else {
    homecity = "Kenzhe";
}


// Оператор выбора switch
// ----------------------
// оператор switch позволяет выполнить инструкцию, в зависимости от
// значение некоторой перменной (или константы). Вот ее синтаксис:
switch(переменная) {
    case значение_1: инструкция_1; break;
    case значение_2: инструкция_2; break;
    case значение_3: инструкция_3; break;
    case значение_4: инструкция_4; break;
    default: инструкция_5;

switch(value) {
    case "Friedrich": statement1; break;
    case "Fritz": homecity = "Sarmack"; break;
    default: homecity = "Kenzhe";
}

// Тернарный оператор
// ------------------
expression1 ? expression2 : expression3

let x = 15, text;
text = x > 10 ? "x more than 10" : "x not more than 10";
// тернарный оператор может быть вложен в другой тернарный оператор:
text = x > 10 ? "x more than 10" : x < 10 ? "x less than 10" : "x equals 10";


// Циклы (Loops)
// -------------
for (variable; condition; increment) body

// for (;;);   // infinity loop

for (let i = 0; i < 10; i++) {
    let square = i ** 2     // ** - оператор возведения в степень
    console.log('i в квадрате равно: ', square)
}
// здесь при объявлении переменных i и square было использовано ключевое
// слово let. В этом случае переменные i и square будут доступны только
// внутри цикла. Как только цикл завершится, эти переменные будут уничтожены
// сборщиком мусора. Если бы мы использовали ключевое слово var вместо let,
// то созданные переменные оставались бы в памяти после завершения цикла
// и были бы доступны за ее пределами.

// если нужно выполнить какое-то фиксированное количество итераций, и не
// важно, какие значение будет принимать i, то лучше записать так:
for (let i = 10; i--;) body     // если нужно выполнить 10 итераций


// Синтаксис цикла с предусловием
// ------------------------------
while (condition) {
    statement_1
    statement_2
}

let i = 0;
while (i < 10) {
    console.log(i++);
}

let i = 10;
while (i--) {
    console.log(i);
}

// Синтаксис цикла с постусловием
// ------------------------------
do {
    statement_1
    statement_2
} while (condition)

let i = 0;
do console.log(i++); while (i < 10)

// increment/decrement:

i++, ++i    /    i--, --i


// Object Types // all object type variables are mutable

    let obj = {name: "fritz"},  // object type
        array = [1,2,3]         // object type
        revexp = /w+/g,         // object type
        func = function(){};    // function type