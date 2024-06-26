;;; // пустые инструкции (empty statements)

// простые выражения primary expression
11
X;
23;
this;
// составные выражения:
11 + 3
a && b
// запятая как бинарный оператор возвращает значение выражения,
// стоящего справа от оператора
13, 45  // вернет 45

// Переменные
// ----------
let x, y, _z, $h, g2;       // объявление переменных
let x = 10, y = "hello"     // объявление переменных с инициализацией
// также можно использовать ключевое слово var:
var x = 1.4
// область видимости переменных, объявленных с помощью ключевого слова var
// ограничивается функцией, в которой происходить объявление, в то время как
// область видимости переменных, объявленных с помощью ключевого слова let
// ограничиваются блоком. Т.е. переменная будет доступна только внутри блока,
// ограниченного фигурными скобками {}, как например в цикле for или условии if


// Константны
// ----------
const pi = 3.14     // объявление константы

// Значение констант не может быть изменено новым присваиванием, а также не 
// может быть переопределено. Константы (const) подчиняются области видимости
// уровня блока так же, как переменные, объявленные с использованием ключевого
// слова let. Однако, если определен изменяемый тип данных как const, его
// внутренние значения могут быть изменены. Объявление const ограничиывает
// именно присваивание и переопределение имени переменной.


// Простые типы данных
// -------------------
// в JavaScript определены следующие просты типы данных:

let myNumber = 234,          // числовой тип (number)
    myString = "some string",   // строковый тип (string)
    myBool = true,              // логический тип (boolean)

// BigInt - числовой тип для для работы с целыми числами произвольной величины 
    bigNumber = 1234567890123456789012345678901234567890n,

// специальные значения undefined (не опрдеделено) и null (ничего) стоят
// особняком, и являются отдельными типами данных. Если объявить переменную
// и не задать ей значение, то его значением будет undefined. Значение null
// используется при необходимости явного задания отсутствия значения.
    myUndef = undefined,        // тип undefined
    myNull = null,              // тип null

// также существует специальный тип данных symbol, который может быть
// использован как идентификатор для свойств объектов:
    mySymbol = Symbol('id_1')   // symbol

// функция typeof возвращает тип объекта (в виде строкового типа):
typeof myNumber         // вернет тип 'number'
typeof typeof myNumber  // вернет тип 'string'

// в JavaScript имеется ошибка в работе функции typeof: для типов null
// эта функция возвращает 'object' вместо ожидаемого 'null':

typeof myNull           // вернет тип 'object'

// простые типы данных являюются неизменяемыми


// Операторы сравнения
// -------------------
// в сравнениях операндами могут быть не токлько числовые и логические типы,
// но и любые простые типы данных. Для определения равенства значений 
// используются операторы == и ===, оператор == не учитывает типы данных, и 
// может дать true при сравнении разных типов данных, в то время как ===
// не может давать true для разных типов данных, независимо от их значений:

10 == 10                // true
10 === 10               // true
10 == "10"              // true
10 === "10"             // false
"10" === "10"           // true

// однако, несмотря на то, что undefined и null - разные типы данных
undefined == null;      // тем не менее возвращает true

// подобным образом ведут себя и операторы неравенства != и !==

null != undefined;      // true
null !== undefined;     // false

// для чисел возможны сравнения "больше", "меньше", "не меньше", "не больше":
10 > 9                  // true
10 > '9'                // true
10 <= '2'               // false
'3' <= '5'              // true

// здесь происходит автоматическое преобразование строкового типа в числовой.

undefined == null;   // true


// Строки (String)
// ---------------
// для задания строк можно использовать как одинарные так и двойные кавычки:
let x = "Some string",
    y = 'Another string',

// длинный текст можно задать на нескольких строках, используя знак \
    z = "Another \
    very long\
    string";

// кавычки внутри текста задаются с помощью символов \"
// знак \ внутри текста задается с помощью символов \\
// перенос строки внутри текста задается с помощью символов \n

z = "another \"very \\ long\" \nstring" 
// эта запись будет соответствовать тексту:

//      another "very \ long" 
//      string

// несмотря на то, что строки, как и дргие простые типы, фактически не являются 
// объектами, они во многом ведут себя как объекты: для них существуют методы.
// Определим некоторую переменную строкового типа и рассмотрим некоторые методы:
let  = "Sometimes the same is different";

// слева синтаксис вызова метода, справа - возвращаемое значение:
text.length;           // 30 // общее число элементов (сиволов)
text.charAt(2);        // "m"
text[2];               // "m"
text.substring(10);    // "the same is different"
text.substring(10,21); // "the same is"
text.substr(14,4);     // "same"
text.slice(-10);       // "different" 
text.split(" ");       // ["Sometimes", "the", "same", "is", "different"]
text.toUpperCase();    // "SOMETIMES THE SAME IS DIFFERENT"
text.toLowerCase();    // "sometimes the same is different"

// оператор + для строк производит конкатенацию:
'Some' + 'Text'         // SomeText
// при "сложении" строки с другими простыми типами будет производиться
// преобразование типов в строки:

'some text ' + undefined    // 'some text undefined'
'some text ' + null         // 'some text null'
'some text ' + true         // 'some text true'

'10' + 10       // вернет '1010', а не 20, как можно было бы ожидать


// Числа (Number)
// --------------
// рассмотрим несколько способов задать определить для переменной число 5:
let x = 5       // целое число
    y = 5.0     // число с плавающей точкой
    z = .5e1    // задание числа через экспоненту

let n = 42.12345678

// рассмотрим некоторые методы, преобразующие число в строковый тип:
n.toExponential(2)      // '4.212e+1'
n.toString()            // '42.12345678'
n.toFixed(3)            // '42.123'

// для числовых типов существуют специальные значения
Infinity    // плюс бесконечность
-Infinity   // минус бесконечность
NaN         // не число


// Булевы операци
// --------------
x && y      // конъюнкция   (conjunction)
x || y      // дизъюнкция   (disjunction)
!y          // отрицание    (negation)


// Преобразование типов
// --------------------
// преобразование в строку
String(false)       // 'false'
String(null)        // 'null'
String(34)          // '34'
String(Infinity)          // 'Infinity'
// преобразование в число
Number('231')       // 231
Number(false)       // 0
Number(true)        // 1
Number(null)        // 0
Number(undefined)   // NaN
Number('abc')       // NaN
// преобразование в логический тип
Boolean(undefined)  // false
Boolean(null)       // false
Boolean(0)          // false
Boolean(NaN)        // false
Boolean("")         // false
// остальные значения преобразуются в true:
Boolean(23)         // false
Boolean('text')     // false
Boolean('0')        // false

// выражения с операторами производят автоматическое проеобразование типов:
5 + "5";        // "55"
5 * "5";        // 25          // подобным образом
"5" * "5";      // 25          // преобразуются строки
"5" * "hi";     // NaN         // с операторами - и /
5 + null;       // 5
5 + undefined;  // NaN

+"454";         // 454
+true;          // 1
+false;         // 0
+null           // 0
+undefined      // NaN

3 / false       // Infinity
"4" * true      // 4

// у числовых и булевых типов данных поддерживается метод toString, 
// возвращающй значение, преобразованное в строковый тип:

let number = 22

number.toString();      // "22"
// целочисленный аргумент (от 2 до 32) позволяет число предварительно
// перевести число в соответствующую систему счисления:
number.toString(2);     // "101"        (двоичная система)
number.toString(8);     // "26"         (восьмеричная система)
false.toString();       // "false"

// Приоритет операций:
// https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Operators/Operator_Precedence